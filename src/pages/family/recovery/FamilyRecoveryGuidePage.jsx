import { useState } from 'react';
import backButton from '../../../assets/back_button.svg';
import backMountain from '../../../assets/family-recovery/back-mountain.svg';
import familyImage from '../../../assets/family-recovery/family.png';
import frontMountain from '../../../assets/family-recovery/front-mountain.svg';
import pinIcon from '../../../assets/family-recovery/pin.svg';
import recoveryRoad from '../../../assets/family-recovery/road.svg';
import FamilyRecoveryGuideEarlyPage from './FamilyRecoveryGuideEarlyPage';
import FamilyRecoveryGuideLatePage from './FamilyRecoveryGuideLatePage';
import FamilyRecoveryGuideMiddlePage from './FamilyRecoveryGuideMiddlePage';

const stageLabels = [
  { id: 'late', label: '출산 후 6주~3개월', className: 'left-[77px] top-[480px]' },
  { id: 'middle', label: '출산 후 3~6주', className: 'left-[200px] top-[595px]' },
  { id: 'early', label: '출산 후 1~2주', className: 'left-[53px] top-[720px]' },
];

const detailPages = {
  early: FamilyRecoveryGuideEarlyPage,
  middle: FamilyRecoveryGuideMiddlePage,
  late: FamilyRecoveryGuideLatePage,
};

const FamilyRecoveryGuidePage = ({ onNavigate = () => {} }) => {
  const [selectedStage, setSelectedStage] = useState(null);
  const SelectedDetailPage = detailPages[selectedStage];

  if (SelectedDetailPage) {
    return <SelectedDetailPage onBack={() => setSelectedStage(null)} />;
  }

  return (
    <main className="relative mx-auto min-h-[874px] w-full max-w-[402px] overflow-hidden bg-primary-light text-[#121212]">
      <header className="relative z-30 flex h-[112px] items-end border-b border-[#dcdcdc] bg-gray-50 px-5 pb-3 pt-[68px]">
        <button
          type="button"
          aria-label="홈으로 돌아가기"
          onClick={() => onNavigate('home')}
          className="flex size-8 items-center justify-center"
        >
          <img src={backButton} alt="" className="h-[21px] w-[13px]" />
        </button>
        <h1 className="flex-1 text-center text-[20px] font-medium leading-none text-black">Recovery Guide</h1>
        <div className="size-8" aria-hidden="true" />
      </header>

      <section className="relative z-20 px-[21px] pt-[19px]">
        <span className="inline-flex h-[21px] items-center rounded-[20px] bg-[#809cff] px-[10px] text-[11px] font-semibold tracking-[0.33px] text-white">
          산후 5주차
        </span>
        <h2 className="mt-[5px] text-[24px] font-medium leading-none">오늘도 한 걸음,</h2>
        <p className="mt-[7px] text-[20px] leading-[1.5] tracking-[-0.6px] text-gray-700">
          나의 회복을 향해 가고 있어요
        </p>
      </section>

      <div className="pointer-events-none absolute inset-x-0 top-[112px] h-[762px] overflow-hidden" aria-hidden="true">
        <img src={familyImage} alt="" className="absolute left-[102px] top-[65px] z-20 size-[200px] object-cover" />
        <img src={backMountain} alt="" className="absolute -left-[30px] top-[81px] z-0 h-[483px] w-[474px] max-w-none" />
        <img src={frontMountain} alt="" className="absolute -left-[111px] top-[197px] z-[1] h-[613px] w-[627px] max-w-none" />
        <img src={recoveryRoad} alt="" className="absolute left-[39px] top-[218px] z-10 h-[573px] w-[402px] max-w-none" />
        <img src={pinIcon} alt="" className="absolute left-[232px] top-[410px] z-20 h-[54px] w-[45px] max-w-none" />
      </div>

      <div className="absolute inset-0 z-20">
        {stageLabels.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onClick={() => setSelectedStage(stage.id)}
            className={`absolute flex h-[35px] w-[120px] items-center justify-center rounded-[9px] bg-primary-background px-3 text-[12px] font-medium tracking-[-0.36px] text-gray-700 shadow-[0_2px_3.5px_rgba(0,0,0,0.15)] ${stage.className}`}
          >
            {stage.label}
          </button>
        ))}
      </div>
    </main>
  );
};

export default FamilyRecoveryGuidePage;
