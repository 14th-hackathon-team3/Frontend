import { useCallback, useEffect, useRef, useState } from 'react';
import { careApi } from '../../../api/care';
import backButton from '../../../assets/back_button.svg';
import recordingVisual from '../../../assets/Record_recording.png';
import refreshIcon from '../../../assets/Record_refresh.svg';
import pauseIcon from '../../../assets/Record_pause.svg';
import playIcon from '../../../assets/Record_record.svg';
import processingAudioIcon from '../../../assets/Record_processing_audio.svg';
import completeIcon from '../../../assets/tick-circle.svg';

const ProcessingAudioModal = ({ onCancel }) => (
  <div className="fixed inset-0 z-30 mx-auto flex w-full max-w-[402px] items-center justify-center">
    <section role="dialog" aria-modal="true" aria-labelledby="processing-audio-title" className="w-[327px] overflow-hidden rounded-lg bg-[#262626] pt-3 text-center shadow-xl">
      <div className="px-4 pb-4">
        <div className="flex h-[51px] items-start justify-center pt-1">
          <img src={processingAudioIcon} alt="" className="h-[39px] w-[44px]" />
        </div>
        <h2 id="processing-audio-title" className="text-[17px] font-medium leading-[22px] tracking-[-0.4px] text-white">Processing Audio...</h2>
        <p className="mt-1 text-[13px] leading-[18px] tracking-[-0.4px] text-[#b0b0b0]">음성 기록이 저장될 때까지 조금만 기다려주세요.<br />데이터로 저장되는 데 조금 시간이 걸려요.</p>
      </div>
      <button type="button" onClick={onCancel} className="h-11 w-full border-t border-[#4f4f4f] text-[17px] tracking-[-0.43px] text-white">취소</button>
    </section>
  </div>
);

const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

const RecordingPage = ({ onBack, onComplete }) => {
  const [isRecorded, setIsRecorded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const recordedAudioRef = useRef(null);
  const uploadCancelledRef = useRef(false);

  const stopTimer = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const stopStream = useCallback(() => {
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    stopTimer();
  }, [stopTimer]);

  const startRecording = useCallback(async () => {
    setError('');
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('이 브라우저에서는 음성 녹음을 지원하지 않습니다.');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      recorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      });
      recorder.start();
      timerRef.current = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
    } catch {
      setError('마이크 권한을 허용해야 음성 기록을 시작할 수 있습니다.');
    }
  }, []);

  useEffect(() => {
    const startTimer = window.setTimeout(() => startRecording(), 0);
    return () => {
      window.clearTimeout(startTimer);
      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== 'inactive') recorder.stop();
      stopStream();
      if (recordedAudioRef.current) URL.revokeObjectURL(recordedAudioRef.current.src);
    };
  }, [startRecording, stopStream]);

  const finishRecording = async () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state === 'inactive') return;
    setIsRecorded(true);
    setIsProcessing(true);
    setIsPaused(false);
    setError('');
    uploadCancelledRef.current = false;

    const audioBlob = await new Promise((resolve) => {
      recorder.addEventListener('stop', () => resolve(new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })), { once: true });
      recorder.stop();
    });
    stopStream();

    const audioUrl = URL.createObjectURL(audioBlob);
    recordedAudioRef.current = new Audio(audioUrl);
    const extension = audioBlob.type.includes('ogg') ? 'ogg' : audioBlob.type.includes('mp4') ? 'm4a' : 'webm';
    const formData = new FormData();
    formData.append('audio_file', audioBlob, `voice-memo.${extension}`);
    formData.append('duration_seconds', String(elapsedSeconds));

    try {
      await careApi.createVoiceMemo(formData);
      if (!uploadCancelledRef.current) onComplete();
    } catch (requestError) {
      if (!uploadCancelledRef.current) {
        setError(requestError.message || '음성 기록을 저장하지 못했습니다.');
        setIsProcessing(false);
      }
    }
  };

  const restartRecording = async () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') recorder.stop();
    stopStream();
    if (recordedAudioRef.current) {
      recordedAudioRef.current.pause();
      URL.revokeObjectURL(recordedAudioRef.current.src);
      recordedAudioRef.current = null;
    }
    chunksRef.current = [];
    setElapsedSeconds(0);
    setIsRecorded(false);
    setIsProcessing(false);
    setIsPaused(false);
    uploadCancelledRef.current = true;
    await startRecording();
  };

  const togglePause = () => {
    const recorder = mediaRecorderRef.current;
    if (isRecorded) {
      recordedAudioRef.current?.play().catch(() => setError('녹음 파일을 재생하지 못했습니다.'));
      return;
    }
    if (!recorder) return;
    if (recorder.state === 'recording') {
      recorder.pause();
      stopTimer();
      setIsPaused(true);
    } else if (recorder.state === 'paused') {
      recorder.resume();
      timerRef.current = window.setInterval(() => setElapsedSeconds((seconds) => seconds + 1), 1000);
      setIsPaused(false);
    }
  };

  const cancelProcessing = () => {
    uploadCancelledRef.current = true;
    setIsProcessing(false);
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light">
      <header className="relative flex h-[112px] items-end justify-center border-b border-[#dcdcdc] bg-gray-50 pb-3">
        <button type="button" onClick={onBack} aria-label="뒤로 가기" className="absolute bottom-3 left-5 flex size-8 items-center justify-center">
          <img src={backButton} alt="" className="h-[21px] w-[13px]" />
        </button>
        <h1 className="text-[20px] font-medium text-text-black">오늘의 기록</h1>
      </header>

      <p className="mt-[43px] text-center text-[24px] font-medium leading-9 tracking-[-0.48px] text-black">{isRecorded ? 'Recorded...' : 'Recording...'}</p>
      <div className="relative mx-auto mt-[54px] h-[407px] w-full">
        <img src={recordingVisual} alt="녹음 파형" className="h-full w-full object-contain" />
        <div className="absolute left-1/2 top-1/2 flex h-[143px] w-[143px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#eed8ff] shadow-[0_2px_9px_rgba(160,153,255,0.2)]">
          <span className="text-[24px] font-medium leading-9 tracking-[-0.48px] text-white">{formatTime(elapsedSeconds)}</span>
        </div>
      </div>

      <div className="absolute bottom-[61px] left-1/2 flex h-[95px] w-[327px] -translate-x-1/2 items-center justify-between rounded-[55px] border border-[#606060] bg-[#262626] px-[35px]">
        <button type="button" onClick={restartRecording} aria-label="다시 녹음" className="flex h-[54px] w-[54px] items-center justify-center rounded-full border-4 border-primary bg-[#31302e]"><img src={refreshIcon} alt="" className="h-5 w-5" /></button>
        <button type="button" onClick={togglePause} aria-label={isRecorded ? '녹음 재생' : isPaused ? '녹음 계속하기' : '녹음 일시정지'} className={`flex size-[70px] items-center justify-center rounded-full ${isRecorded ? '' : 'border-[5px] border-primary bg-[#31302e]'}`}><img src={isRecorded ? playIcon : pauseIcon} alt="" className={isRecorded ? 'size-[70px]' : 'size-[28px]'} /></button>
        <button type="button" onClick={finishRecording} disabled={isRecorded || Boolean(error)} aria-label="녹음 완료" className="flex h-[54px] w-[54px] items-center justify-center rounded-full border-4 border-primary bg-[#31302e] disabled:opacity-50"><img src={completeIcon} alt="" className="h-[28px] w-[28px]" /></button>
      </div>

      {error && <p className="absolute bottom-[28px] left-1/2 w-[340px] -translate-x-1/2 text-center text-[12px] text-error">{error}</p>}
      {isProcessing && <ProcessingAudioModal onCancel={cancelProcessing} />}
    </main>
  );
};

export default RecordingPage;
