import restIcon from '../../../assets/family-recovery/airline-seat-flat.svg';
import hygieneIcon from '../../../assets/family-recovery/clean-hands.svg';
import activityIcon from '../../../assets/family-recovery/directions-bike.svg';
import healingIcon from '../../../assets/family-recovery/healing.svg';
import FamilyRecoveryDetailLayout from './FamilyRecoveryDetailLayout';

const guideItems = [
  {
    title: '회복 기다리기',
    icon: healingIcon,
    points: [
      '샤워는 가능하지만 상처 부위에 자극이 가지 않도록 주의하기',
      '질 내 삽입이나 성관계는 회복 상태와 불편감 등을 고려해 무리하지 않기',
    ],
  },
  {
    title: '가벼운 활동',
    icon: activityIcon,
    points: [
      '심호흡·복식호흡부터 시작해 몸을 천천히 깨우기',
      '몸 상태에 따라 골반저근(케겔) 운동을 가볍게 시작하기',
    ],
  },
  {
    title: '위생 관리',
    icon: hygieneIcon,
    points: [
      '오로에 맞춰 위생 패드를 자주 교체하고 청결하게 관리하기',
      '회음부는 따뜻한 물을 이용해 관리하고, 꿰맨 부위는 자극하지 않기',
    ],
  },
  {
    title: '수면 휴식',
    icon: restIcon,
    points: [
      '피로를 느끼면 바로 휴식하고, 집안일은 가족의 도움을 받아요.',
      '무리해서 일상으로 돌아가기보다 몸의 회복을 우선해요.',
    ],
  },
];

const FamilyRecoveryGuideEarlyPage = ({ onBack = () => {} }) => (
  <FamilyRecoveryDetailLayout
    title="산후 1~2주 | 일상으로 돌아가는 회복기"
    description={'몸이 회복되는 과정을 살피면서\n일상으로 천천히 돌아가는 시기예요.'}
    items={guideItems}
    onBack={onBack}
  />
);

export default FamilyRecoveryGuideEarlyPage;
