import backButton from '../../../assets/back_button.svg';
import recordingVisual from '../../../assets/Record_recording.png';
import refreshIcon from '../../../assets/Record_refresh.svg';
import pauseIcon from '../../../assets/Record_pause.svg';
import completeIcon from '../../../assets/tick-circle.svg';

const RecordingPage = ({ onBack, onComplete }) => (
  <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light">
    <header className="flex h-[74px] items-center justify-center border-b border-gray-200 bg-gray-50">
      <button type="button" onClick={onBack} aria-label="뒤로 가기" className="absolute left-5 flex h-8 w-8 items-center justify-center">
        <img src={backButton} alt="" className="h-[21px] w-[13px]" />
      </button>
      <h1 className="text-[20px] font-medium text-text-black">오늘의 기록</h1>
    </header>

    <p className="mt-[43px] text-center text-[24px] font-medium leading-9 tracking-[-0.48px] text-black">Recording...</p>
    <div className="relative mx-auto mt-[54px] h-[407px] w-full">
      <img src={recordingVisual} alt="녹음 파형" className="h-full w-full object-contain" />
      <div className="absolute left-1/2 top-1/2 flex h-[143px] w-[143px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#eed8ff] shadow-[0_2px_9px_rgba(160,153,255,0.2)]">
        <span className="text-[24px] font-medium leading-9 tracking-[-0.48px] text-white">00:40</span>
      </div>
    </div>

    <div className="absolute bottom-[61px] left-1/2 flex h-[95px] w-[327px] -translate-x-1/2 items-center justify-between rounded-[55px] border border-[#606060] bg-[#262626] px-[35px]">
      <button type="button" aria-label="다시 녹음" className="flex h-[54px] w-[54px] items-center justify-center rounded-full border-4 border-primary bg-[#31302e]"><img src={refreshIcon} alt="" className="h-5 w-5" /></button>
      <button type="button" aria-label="녹음 일시정지" className="flex h-[70px] w-[70px] items-center justify-center rounded-full border-[5px] border-primary bg-[#31302e]"><img src={pauseIcon} alt="" className="h-[28px] w-[28px]" /></button>
      <button type="button" onClick={onComplete} aria-label="녹음 완료" className="flex h-[54px] w-[54px] items-center justify-center rounded-full border-4 border-primary bg-[#31302e]"><img src={completeIcon} alt="" className="h-[28px] w-[28px]" /></button>
    </div>
  </main>
);

export default RecordingPage;
