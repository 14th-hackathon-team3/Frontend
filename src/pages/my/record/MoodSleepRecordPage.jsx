import { useEffect, useRef, useState } from 'react';
import backButton from '../../../assets/back_button.svg';
import infoIcon from '../../../assets/Record_info.png';

const moodRows = [
  ['행복한', '화남', '에너지부족'],
  ['슬픈', '우울한', '혼란스러운'],
  ['차분한', '변덕스러운', '짜증나는'],
  ['걱정스러운', '활동적인'],
];

const SleepWheel = ({ value, limit, onChange, ariaLabel }) => {
  const wheelRef = useRef(null);

  useEffect(() => {
    wheelRef.current?.scrollTo({ top: (value - 1) * 36, behavior: 'smooth' });
  }, [value]);

  const selectClosestValue = () => {
    const nextValue = Math.round((wheelRef.current?.scrollTop ?? 0) / 36) + 1;
    onChange(Math.min(limit, Math.max(1, nextValue)));
  };

  return (
    <div
      ref={wheelRef}
      onScroll={selectClosestValue}
      className="z-10 h-[108px] w-full snap-y snap-mandatory overflow-y-auto py-9 text-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label={ariaLabel}
    >
      {Array.from({ length: limit }, (_, index) => index + 1).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={`block h-9 w-full snap-center text-[16px] ${item === value ? 'text-white' : 'text-black/60'}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

const MoodSleepRecordPage = ({ onBack, onNext }) => {
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [sleepTime, setSleepTime] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [draftHour, setDraftHour] = useState(8);
  const [draftMinute, setDraftMinute] = useState(5);

  const selectSleepTime = (hour, minute) => {
    setDraftHour(hour);
    setDraftMinute(minute);
    setSleepTime({ hour, minute });
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[108px]">
      <header className="flex h-[74px] items-center justify-center border-b border-gray-200 bg-gray-50">
        <button type="button" onClick={onBack} aria-label="뒤로 가기" className="absolute left-5 flex h-8 w-8 items-center justify-center"><img src={backButton} alt="" className="h-[21px] w-[13px]" /></button>
        <h1 className="text-[20px] font-medium text-text-black">오늘의 기록</h1>
      </header>

      <section className="px-[38px] pt-3">
        <h2 className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">감정 상태</h2>
        <div className="-mx-[15px] mt-[21px] space-y-5">
          {moodRows.map((row) => (
            <div key={row[0]} className="flex gap-[15px]">
              {row.map((mood) => (
                <button key={mood} type="button" onClick={() => setSelectedMoods((current) => current.includes(mood) ? current.filter((item) => item !== mood) : [...current, mood])} className={`shrink-0 whitespace-nowrap rounded-[10px] py-[clamp(6px,2.24vw,9px)] px-[clamp(14px,6.22vw,25px)] text-[clamp(12px,4.48vw,18px)] font-medium leading-[1.5] tracking-[-0.02em] ${selectedMoods.includes(mood) ? 'bg-primary text-white' : 'bg-gray-50 text-black'}`}>{mood}</button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <div className="mx-[27px] mt-[38px] border-t border-gray-200" />
      <section className="px-[38px] pt-[20px]">
        <h2 className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">수면 시간</h2>
        <button type="button" onClick={() => setIsPickerOpen(true)} className="mt-[19px] flex h-[51px] w-full items-center justify-between rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-left">
          <span className={sleepTime ? 'text-[16px] text-black' : 'text-[16px] text-[#999]'}>{sleepTime ? `${sleepTime.hour}시간 ${sleepTime.minute}분` : '시간을 선택해주세요'}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#999] text-[12px] text-[#999]">◷</span>
        </button>
      </section>

      <div className="mx-auto mt-[109px] flex h-20 w-[360px] items-center gap-4 rounded-[20px] bg-primary-background px-[31px]">
        <img src={infoIcon} alt="안내" className="h-8 w-8 shrink-0" />
        <p className="text-[12px] font-medium leading-4 tracking-[-0.48px] text-primary">입력을 완료하였거나 건너뛰고 싶을 경우,<br />다음 버튼을 눌러 페이지를 이동해주세요.</p>
      </div>

      <div className="absolute bottom-[47px] left-[23px] flex gap-[19px]">
        <button type="button" onClick={onBack} className="h-[51px] w-[165px] rounded-[10px] bg-gray-50 text-[16px] text-[#31302e]">이전</button>
        <button type="button" onClick={onNext} className="h-[51px] w-[165px] rounded-[10px] bg-[#31302e] text-[16px] text-white">다음</button>
      </div>

      {isPickerOpen && (
        <div className="absolute inset-0 z-20 flex items-end bg-black/10">
          <section className="h-[361px] w-full rounded-t-[20px] bg-[#f9f9f9] px-[35px] pt-[25px]" aria-label="수면 시간 선택">
            <div className="flex items-center justify-between"><h2 className="text-[16px] font-medium">수면 시간</h2><button type="button" onClick={() => setIsPickerOpen(false)} aria-label="닫기" className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[20px] leading-none">×</button></div>
            <div className="mx-auto mt-[46px] grid w-[160px] grid-cols-2 text-center text-[16px]"><span>시간</span><span>분</span></div>
            <div className="relative mx-auto mt-[30px] grid h-[108px] w-[245px] grid-cols-2 place-items-center text-center text-[16px]">
              <div className="absolute left-0 right-0 top-[36px] h-[36px] rounded-[5px] bg-primary" aria-hidden="true" />
              <SleepWheel value={draftHour} limit={24} ariaLabel="수면 시간" onChange={(hour) => selectSleepTime(hour, draftMinute)} />
              <SleepWheel value={draftMinute} limit={60} ariaLabel="수면 분" onChange={(minute) => selectSleepTime(draftHour, minute)} />
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default MoodSleepRecordPage;
