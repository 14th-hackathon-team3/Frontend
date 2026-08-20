import activityIcon from '../../../assets/family-recovery/directions-bike.svg';
import returnIcon from '../../../assets/family-recovery/event-repeat.svg';
import healingIcon from '../../../assets/family-recovery/healing.svg';
import heartIcon from '../../../assets/family-recovery/heart-smile.svg';
import FamilyRecoveryDetailLayout from './FamilyRecoveryDetailLayout';

const guideItems = [
  {
    title: '회복 점검',
    icon: healingIcon,
    points: [
      '산후 12주 이내 종합적인 산후 진료를 통해 지금까지의 회복 과정을 돌아보고, 남아 있는 불편이나 도움이 필요한 부분을 확인하기',
    ],
  },
  {
    title: '활동 늘리기',
    icon: activityIcon,
    points: [
      '6주 이후 의사의 허락을 받으면 요가·필라테스 등 유연성 운동부터 시작하고, 격렬한 운동은 3개월 이후에 시작하는 것이 안전',
    ],
  },
  {
    title: '마음 돌보기',
    icon: heartIcon,
    points: [
      '산후 스트레스는 출산 직후에만 나타나는 것이 아니며, 시기에 따라 주요 스트레스 요인이 달라질 수 있어 지속적으로 살펴보고 가족의 지원을 받기',
    ],
  },
  {
    title: '일상 복귀',
    icon: returnIcon,
    points: [
      '육아와 집안 일을 혼자서도 할 수 있으며, 가까운 외출, 가벼운 스포츠, 짧은 여행, 운전·자전거 타기가 가능합니다.',
    ],
  },
];

const FamilyRecoveryGuideLatePage = ({ onBack = () => {} }) => (
  <FamilyRecoveryDetailLayout
    title="산후 6주~3개월 | 일상으로 돌아가는 회복기"
    description={'몸과 마음의 변화를 다시 살펴보고,\n나에게 맞는 속도로 일상과 활동을 회복해가는 시기예요.'}
    items={guideItems}
    onBack={onBack}
  />
);

export default FamilyRecoveryGuideLatePage;
