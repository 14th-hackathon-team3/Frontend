import { useEffect, useRef, useState } from 'react';
import playIcon from '../../../assets/Record_record.svg';

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';

  const wholeSeconds = Math.floor(seconds);
  const minutes = Math.floor(wholeSeconds / 60);
  const remainingSeconds = wholeSeconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VoiceMemoPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
    audio.load();

    return () => audio.pause();
  }, [src]);

  const syncDuration = () => {
    const nextDuration = audioRef.current?.duration;
    setDuration(Number.isFinite(nextDuration) ? nextDuration : 0);
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const seek = (event) => {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);
    if (!audio || !Number.isFinite(nextTime)) return;

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <div className="flex w-[327px] flex-col items-center gap-[6px]">
      <audio
        ref={audioRef}
        src={src || undefined}
        preload="metadata"
        onLoadedMetadata={syncDuration}
        onDurationChange={syncDuration}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setCurrentTime(0);
          setIsPlaying(false);
        }}
      />

      <div className="relative h-2 w-full">
        <div className="absolute inset-0 rounded-full bg-[#333]" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
        <input
          type="range"
          aria-label="음성 메모 재생 위치"
          min="0"
          max={duration || 0}
          step="0.01"
          value={Math.min(currentTime, duration || 0)}
          disabled={!src || duration === 0}
          onChange={seek}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-default"
        />
      </div>

      <div className="flex w-full justify-between text-[13px] font-medium leading-[18px] tracking-[-0.4px] text-black">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <button
        type="button"
        aria-label={isPlaying ? '음성 메모 일시 정지' : '음성 메모 재생'}
        aria-pressed={isPlaying}
        disabled={!src}
        onClick={togglePlayback}
        className="relative size-[60px] rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPlaying ? (
          <span className="absolute inset-0 flex items-center justify-center gap-[6px] rounded-full border-[4px] border-primary bg-[#2f2f2f]">
            <span className="h-[22px] w-[6px] rounded-sm bg-primary" />
            <span className="h-[22px] w-[6px] rounded-sm bg-primary" />
          </span>
        ) : (
          <img src={playIcon} alt="" className="size-full" />
        )}
      </button>
    </div>
  );
};

export default VoiceMemoPlayer;
