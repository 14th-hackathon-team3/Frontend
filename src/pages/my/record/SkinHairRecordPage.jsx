import { useState } from 'react';
import backButton from '../../../assets/back_button.svg';
import infoIcon from '../../../assets/Record_info.png';

const skinLevels = ['매우 좋음', '좋음', '약간의 트러블', '트러블 심함'];
const skinSymptoms = ['건조', '붉음', '색소침착', '여드름', '해당 없음'];
const hairStates = ['평소와 같음', '약간 빠짐', '많이 빠짐'];

const SkinHairRecordPage = ({ onBack, onNext }) => {
  const [skinLevel, setSkinLevel] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [hairState, setHairState] = useState(null);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((current) => current.includes(symptom)
      ? current.filter((item) => item !== symptom)
      : [...current, symptom]);
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[108px]">
      <header className="flex h-[74px] items-center justify-center border-b border-gray-200 bg-gray-50">
        <button type="button" onClick={onBack} aria-label="뒤로 가기" className="absolute left-5 flex h-8 w-8 items-center justify-center">
          <img src={backButton} alt="" className="h-[21px] w-[13px]" />
        </button>
        <h1 className="text-[20px] font-medium text-text-black">오늘의 기록</h1>
      </header>

      <section className="px-[38px] pt-[10px]">
        <h2 className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">피부 상태</h2>
        <div className="relative mt-[27px] h-[57px] w-full">
          <div className="absolute left-[17px] right-[25px] top-[16px] h-[2px] bg-[#e0e0e0]" />
          <div className="relative flex justify-between">
            {skinLevels.map((level, index) => {
              const value = index + 1;
              const isSelected = skinLevel === value;
              return (
                <button key={level} type="button" onClick={() => setSkinLevel(value)} className="relative z-10 flex w-[44px] flex-col items-center gap-[7px]">
                  <span className={`flex size-[32px] items-center justify-center rounded-full border-2 text-[18px] font-semibold leading-none tracking-[-0.54px] ${isSelected ? 'border-primary bg-primary text-gray-50' : 'border-[#cfcfcf] bg-gray-50 text-[#cfcfcf]'}`}>{value}</span>
                  <span className={`absolute top-[39px] whitespace-nowrap text-[12px] font-medium tracking-[-0.24px] ${isSelected ? 'text-primary' : 'text-[#9d9d9d]'}`}>{level}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-[29px] mt-[26px] border-t border-gray-200" />
      <section className="px-[38px] pt-[20px]">
        <h2 className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">피부 증상</h2>
        <div className="mt-[21px] flex flex-wrap gap-[10px]">
          {skinSymptoms.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom);
            return <button key={symptom} type="button" onClick={() => toggleSymptom(symptom)} className={`h-10 rounded-[10px] px-[30px] text-[16px] font-medium tracking-[-0.32px] ${isSelected ? 'bg-primary text-white' : 'bg-gray-50 text-black'}`}>{symptom}</button>;
          })}
        </div>
      </section>

      <div className="mx-[29px] mt-[40px] border-t border-gray-200" />
      <section className="px-[38px] pt-[20px]">
        <h2 className="text-[20px] font-medium leading-[30px] tracking-[-0.4px]">모발 상태</h2>
        <div className="mt-[28px] grid grid-cols-3 gap-[10px]">
          {hairStates.map((state) => <button key={state} type="button" onClick={() => setHairState(state)} className={`h-[61px] rounded-[10px] text-[16px] font-medium tracking-[-0.32px] ${hairState === state ? 'bg-primary text-white' : 'bg-gray-50 text-black'}`}>{state}</button>)}
        </div>
      </section>

      <div className="absolute bottom-[118px] left-1/2 flex h-20 w-[360px] -translate-x-1/2 items-center gap-4 rounded-[20px] bg-primary-background px-[31px]">
        <img src={infoIcon} alt="안내" className="h-8 w-8 shrink-0" />
        <p className="text-[12px] font-medium leading-4 tracking-[-0.48px] text-primary">입력을 완료하였거나 건너뛰고 싶을 경우,<br />다음 버튼을 눌러 페이지를 이동해주세요.</p>
      </div>
      <div className="absolute bottom-[47px] left-[23px] flex gap-[19px]">
        <button type="button" onClick={onBack} className="h-[51px] w-[165px] rounded-[10px] bg-gray-50 text-[16px] text-[#31302e]">이전</button>
        <button type="button" onClick={onNext} className="h-[51px] w-[165px] rounded-[10px] bg-[#31302e] text-[16px] text-white">다음</button>
      </div>
    </main>
  );
};

export default SkinHairRecordPage;
