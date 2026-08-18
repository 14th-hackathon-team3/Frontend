import { useState } from 'react';
import backButton from '../../../assets/back_button.svg';
import backMountain from '../../../assets/recoveryguide_back1.svg';
import frontMountain from '../../../assets/recoveryguide_back2.svg';
import familyImage from '../../../assets/recoveryguide_family.png';
import pinIcon from '../../../assets/recoveryguide_pin.svg';
import recoveryRoad from '../../../assets/recoveryguide_road.svg';
import RecoveryGuideEarlyPage from './RecoveryGuideEarlyPage';
import RecoveryGuideLatePage from './RecoveryGuideLatePage';
import RecoveryGuideMiddlePage from './RecoveryGuideMiddlePage';

const stageLabels = [
  { label: '출산 후 6주~3개월', className: 'left-[77px] top-[480px]' },
  { label: '출산 후 3~6주', className: 'left-[200px] top-[595px]' },
  { label: '출산 후 1~2주', className: 'left-[53px] top-[720px]' },
];

const RecoveryGuidePage = ({ onNavigate = () => {} }) => {
  const [selectedStage, setSelectedStage] = useState(null);

  if (selectedStage === 'early') {
    return <RecoveryGuideEarlyPage onBack={() => setSelectedStage(null)} />;
  }

  if (selectedStage === 'middle') {
    return <RecoveryGuideMiddlePage onBack={() => setSelectedStage(null)} />;
  }

  if (selectedStage === 'late') {
    return <RecoveryGuideLatePage onBack={() => setSelectedStage(null)} />;
  }

  return (
    <main className="relative mx-auto min-h-[874px] w-full max-w-[402px] overflow-hidden bg-primary-light text-[#121212]">
    <header className="relative z-30 flex h-[112px] items-end border-b border-[#dcdcdc] bg-[#fcfcfc] px-5 pb-3 pt-[68px]">
      <button type="button" aria-label="홈으로 돌아가기" onClick={() => onNavigate('home')} className="flex size-8 items-center justify-center">
        <img src={backButton} alt="" className="h-[21px] w-[13px]" />
      </button>
      <h1 className="flex-1 text-center text-[20px] font-medium leading-none text-black">Recovery Guide</h1>
      <div className="size-8" aria-hidden="true" />
    </header>

    <section className="relative z-20 px-[21px] pt-[19px]">
      <span className="inline-flex h-[21px] items-center rounded-[20px] bg-primary px-[10px] text-[11px] font-semibold tracking-[0.33px] text-white">산후 5주차</span>
      <h2 className="mt-[5px] text-[24px] font-medium leading-none">오늘도 한 걸음,</h2>
      <p className="mt-[7px] text-[20px] leading-[1.5] tracking-[-0.6px] text-[#666]">나의 회복을 향해 가고 있어요</p>
    </section>

    <div className="pointer-events-none absolute inset-x-0 top-[112px] h-[762px] overflow-hidden" aria-hidden="true">
      <img src={familyImage} alt="" className="absolute left-[101px] top-[65px] z-20 size-[200px] object-contain" />
      <img src={backMountain} alt="" className="absolute left-[77px] top-[135px] z-0 h-[555px] w-[525px] max-w-none" />
      <img src={frontMountain} alt="" className="absolute -left-[127px] top-[178px] z-[1] h-[627px] w-[653px] max-w-none" />
      <img src={recoveryRoad} alt="" className="absolute left-[44px] top-[210px] z-10 h-[542px] w-[337px] max-w-none" />
      <img src={pinIcon} alt="" className="absolute left-[235px] top-[413px] z-20 size-[50px]" />
    </div>

    <div className="absolute inset-0 z-20">
      {stageLabels.map((stage) => (
        stage.label === '출산 후 1~2주' || stage.label === '출산 후 3~6주' || stage.label === '출산 후 6주~3개월' ? (
          <button
            key={stage.label}
            type="button"
            onClick={() => {
              if (stage.label === '출산 후 1~2주') setSelectedStage('early');
              else if (stage.label === '출산 후 3~6주') setSelectedStage('middle');
              else setSelectedStage('late');
            }}
            className={`absolute flex h-[35px] w-[120px] items-center justify-center rounded-[9px] bg-primary-background px-3 text-[12px] font-medium tracking-[-0.36px] text-[#666] shadow-[0_2px_3.5px_rgba(0,0,0,0.15)] ${stage.className}`}
          >
            {stage.label}
          </button>
        ) : (
          <div
            key={stage.label}
            className={`absolute flex h-[35px] w-[120px] items-center justify-center rounded-[9px] bg-primary-background px-3 text-[12px] font-medium tracking-[-0.36px] text-[#666] shadow-[0_2px_3.5px_rgba(0,0,0,0.15)] ${stage.className}`}
          >
            {stage.label}
          </div>
        )
      ))}
    </div>
    </main>
  );
};

export default RecoveryGuidePage;
