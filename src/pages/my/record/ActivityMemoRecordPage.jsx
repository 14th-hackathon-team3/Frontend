import { useEffect, useRef, useState } from 'react';
import backButton from '../../../assets/back_button.svg';
import activityIcon from '../../../assets/Record_activity.svg';

const TimeWheel = ({ value, limit, onChange, ariaLabel }) => {
  const wheelRef = useRef(null);

  useEffect(() => {
    wheelRef.current?.scrollTo({ top: (value - 1) * 36, behavior: 'smooth' });
  }, [value]);

  const selectClosestValue = () => {
    const nextValue = Math.round((wheelRef.current?.scrollTop ?? 0) / 36) + 1;
    onChange(Math.min(limit, Math.max(1, nextValue)));
  };

  return (
    <div ref={wheelRef} onScroll={selectClosestValue} className="z-10 h-[108px] w-full snap-y snap-mandatory overflow-y-auto py-9 text-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label={ariaLabel}>
      {Array.from({ length: limit }, (_, index) => index + 1).map((item) => <button key={item} type="button" onClick={() => onChange(item)} className={`block h-9 w-full snap-center text-[16px] ${item === value ? 'text-white' : 'text-black/60'}`}>{item}</button>)}
    </div>
  );
};

const ActivityMemoRecordPage = ({ onBack, onSave }) => {
  const [activityTime, setActivityTime] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [draftHour, setDraftHour] = useState(8);
  const [draftMinute, setDraftMinute] = useState(5);
  const [activityType, setActivityType] = useState('');
  const [memo, setMemo] = useState('');
  const [isMemoFocused, setIsMemoFocused] = useState(false);
  const memoRef = useRef(null);

  useEffect(() => {
    if (isMemoFocused) memoRef.current?.focus();
  }, [isMemoFocused]);

  const saveRecord = () => onSave({ activityTime, activityType, memo });

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[108px]">
      <header className="flex h-[74px] items-center justify-center border-b border-gray-200 bg-gray-50">
        <button type="button" onClick={onBack} aria-label="뒤로 가기" className="absolute left-5 flex h-8 w-8 items-center justify-center">
          <img src={backButton} alt="" className="h-[21px] w-[13px]" />
        </button>
        <h1 className="text-[20px] font-medium text-text-black">오늘의 기록</h1>
      </header>

      {isMemoFocused ? (
        <>
          <section className="px-[35px] pt-[10px]">
            <h2 className="ml-[6px] text-[20px] font-medium leading-[30px] tracking-[-0.4px]">자유 메모</h2>
            <textarea ref={memoRef} value={memo} onChange={(event) => setMemo(event.target.value)} onBlur={() => setIsMemoFocused(false)} placeholder="통증, 감정, 증상 등을 자유롭게 작성해주세요." className="mt-[22px] h-[150px] w-full resize-none rounded-[18px] border border-[#cfcfcf] bg-transparent px-[21px] py-[25px] text-[12px] leading-5 outline-none placeholder:text-[#999]" />
          </section>
          <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={saveRecord} className="absolute bottom-[54px] left-[32px] h-[50px] w-[341px] rounded-[10px] bg-[#31302e] text-[16px] font-semibold text-white">저장</button>
        </>
      ) : <>

      <section className="px-[34px] pt-[10px]">
        <h2 className="ml-[5px] text-[20px] font-medium leading-[30px] tracking-[-0.4px]">활동량</h2>
        <button type="button" onClick={() => setIsPickerOpen(true)} className="relative mt-[22px] block h-[51px] w-full rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] text-left">
          <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-[16px] ${activityTime ? 'text-black' : 'text-[#999]'}`}>{activityTime ? `${activityTime.hour}시간 ${activityTime.minute}분` : '시간을 선택해주세요'}</span>
          <img src={activityIcon} alt="" className="pointer-events-none absolute right-[18px] top-1/2 h-5 w-5 -translate-y-1/2" />
        </button>
      </section>

      <div className="mx-[29px] mt-[31px] border-t border-gray-200" />
      <section className="px-[34px] pt-[20px]">
        <h2 className="ml-[5px] text-[20px] font-medium leading-[30px] tracking-[-0.4px]">활동 종류</h2>
        <input type="text" value={activityType} onChange={(event) => setActivityType(event.target.value)} placeholder="활동 종류를 입력해주세요." className="mt-[25px] h-[51px] w-full rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] outline-none placeholder:text-[#999]" />
      </section>

      <div className="mx-[29px] mt-[42px] border-t border-gray-200" />
      <section className="px-[33px] pt-[20px]">
        <h2 className="ml-[6px] text-[20px] font-medium leading-[30px] tracking-[-0.4px]">자유 메모</h2>
        <textarea value={memo} onChange={(event) => setMemo(event.target.value)} onFocus={() => setIsMemoFocused(true)} placeholder="통증, 감정, 증상 등을 자유롭게 작성해주세요." className="mt-[22px] h-[150px] w-full resize-none rounded-[18px] border border-[#cfcfcf] bg-transparent px-[21px] py-[25px] text-[12px] leading-5 outline-none placeholder:text-[#999]" />
      </section>

      <button type="button" onClick={saveRecord} className="absolute bottom-[54px] left-[32px] h-[50px] w-[341px] rounded-[10px] bg-[#31302e] text-[16px] font-semibold text-white">저장</button>

      {isPickerOpen && (
        <div className="absolute inset-0 z-20 flex items-end bg-black/10">
          <section className="h-[361px] w-full rounded-t-[20px] bg-[#f9f9f9] px-[35px] pt-[25px]" aria-label="활동 시간 선택">
            <div className="flex items-center justify-between"><h2 className="text-[16px] font-medium">활동 시간</h2><button type="button" onClick={() => setIsPickerOpen(false)} aria-label="닫기" className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-[20px] leading-none">×</button></div>
            <div className="mx-auto mt-[46px] grid w-[160px] grid-cols-2 text-center text-[16px]"><span>시간</span><span>분</span></div>
            <div className="relative mx-auto mt-[30px] grid h-[108px] w-[245px] grid-cols-2 place-items-center text-center text-[16px]">
              <div className="absolute left-0 right-0 top-[36px] h-[36px] rounded-[5px] bg-primary" aria-hidden="true" />
              <TimeWheel value={draftHour} limit={24} ariaLabel="활동 시간" onChange={(hour) => { setDraftHour(hour); setActivityTime({ hour, minute: draftMinute }); }} />
              <TimeWheel value={draftMinute} limit={60} ariaLabel="활동 분" onChange={(minute) => { setDraftMinute(minute); setActivityTime({ hour: draftHour, minute }); }} />
            </div>
          </section>
        </div>
      )}
      </>}
    </main>
  );
};

export default ActivityMemoRecordPage;
