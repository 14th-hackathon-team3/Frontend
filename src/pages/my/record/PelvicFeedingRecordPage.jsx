import { useState } from 'react';
import backButton from '../../../assets/back_button.svg';
import infoIcon from '../../../assets/Record_info.png';

const pelvicSymptoms = ['요실금', '복부 처짐', '복부 갈라짐', '없음'];
const feedingMethods = ['모유', '분유', '혼합'];
const milkAmounts = ['적음', '보통', '많음'];

const ChoiceButton = ({ isSelected, children, onClick, className = '' }) => (
  <button type="button" onClick={onClick} className={`flex h-[67px] items-center justify-center rounded-[10px] px-2 text-[clamp(14px,4.98vw,20px)] font-medium tracking-[-0.02em] ${isSelected ? 'bg-primary text-white' : 'bg-gray-50 text-black'} ${className}`}>
    {children}
  </button>
);

const SeveritySlider = ({ label, value, onChange }) => (
  <section>
    <div className="flex items-center justify-between">
      <h2 className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">{label}</h2>
      <span className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">{value}/5</span>
    </div>
    <div className="relative mt-[21px] h-4 w-[262px] max-w-full">
      <div className="absolute left-0 right-0 top-1/2 h-[7px] -translate-y-1/2 rounded-full bg-[#e0e0e0]" />
      <div className="absolute left-0 top-1/2 h-[7px] -translate-y-1/2 rounded-full bg-primary" style={{ width: `${((value - 1) / 4) * 100}%` }} />
      <div className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" style={{ left: `${((value - 1) / 4) * 100}%` }} aria-hidden="true" />
      <input type="range" min="1" max="5" value={value} onChange={(event) => onChange(Number(event.target.value))} aria-label={label} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
    </div>
  </section>
);

const PelvicFeedingRecordPage = ({ onBack, onNext }) => {
  const [pelvicSymptom, setPelvicSymptom] = useState('복부 처짐');
  const [severity, setSeverity] = useState(2);
  const [feedingMethod, setFeedingMethod] = useState('분유');
  const [milkAmount, setMilkAmount] = useState('보통');
  const [milkPain, setMilkPain] = useState(3);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[402px] bg-primary-light pb-10">
      <header className="relative flex h-[74px] items-center justify-center border-b border-gray-200 bg-gray-50">
        <button type="button" onClick={onBack} aria-label="뒤로 가기" className="absolute left-5 flex h-8 w-8 items-center justify-center"><img src={backButton} alt="" className="h-[21px] w-[13px]" /></button>
        <h1 className="text-[20px] font-medium text-text-black">오늘의 기록</h1>
      </header>

      <div className="px-[clamp(24px,9vw,36px)] pt-[10px]">
        <section>
          <h2 className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">골반저 증상</h2>
          <div className="-mx-[10px] mt-[15px] grid grid-cols-4 gap-[6px]">
            {pelvicSymptoms.map((symptom) => <ChoiceButton key={symptom} isSelected={pelvicSymptom === symptom} onClick={() => setPelvicSymptom(symptom)} className={`rounded-[15px] ${symptom === '복부 갈라짐' ? 'whitespace-nowrap px-0 text-[6px]' : symptom === '복부 처짐' ? 'whitespace-nowrap px-0 text-[10px]' : 'text-[clamp(12px,3.98vw,16px)]'}`}>{symptom}</ChoiceButton>)}
          </div>
        </section>

        <div className="my-[27px] border-t border-gray-200" />
        <SeveritySlider label="증상 심화 정도" value={severity} onChange={setSeverity} />

        <div className="my-[39px] border-t border-gray-200" />
        <section>
          <h2 className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">수유 방식</h2>
          <div className="mt-[29px] grid grid-cols-3 gap-[10px]">
            {feedingMethods.map((method) => <ChoiceButton key={method} isSelected={feedingMethod === method} onClick={() => setFeedingMethod(method)}>{method}</ChoiceButton>)}
          </div>
        </section>

        {feedingMethod === '모유' && <>
          <div className="my-[49px] border-t border-gray-200" />
          <section>
            <h2 className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">모유량</h2>
            <div className="mt-[29px] grid grid-cols-3 gap-[10px]">
              {milkAmounts.map((amount) => <ChoiceButton key={amount} isSelected={milkAmount === amount} onClick={() => setMilkAmount(amount)}>{amount}</ChoiceButton>)}
            </div>
          </section>
          <div className="my-[49px] border-t border-gray-200" />
          <SeveritySlider label="모유 시 통증" value={milkPain} onChange={setMilkPain} />
        </>}

        <div className="mt-[133px] flex min-h-20 items-center gap-4 rounded-[20px] bg-primary-background px-[31px] py-3">
          <img src={infoIcon} alt="안내" className="h-8 w-8 shrink-0" />
          <p className="text-[12px] font-medium leading-4 tracking-[-0.48px] text-primary">입력을 완료하였거나 건너뛰고 싶을 경우,<br />다음 버튼을 눌러 페이지를 이동해주세요.</p>
        </div>

        <div className="-mx-[13px] mt-4 flex gap-[19px]">
          <button type="button" onClick={onBack} className="h-[51px] flex-1 rounded-[10px] bg-gray-50 text-[16px] text-[#31302e]">이전</button>
          <button type="button" onClick={onNext} className="h-[51px] flex-1 rounded-[10px] bg-[#31302e] text-[16px] text-white">다음</button>
        </div>
      </div>
    </main>
  );
};

export default PelvicFeedingRecordPage;
