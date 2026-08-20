import restIcon from '../../../assets/family-recovery/airline-seat-flat.svg';
import activityIcon from '../../../assets/family-recovery/directions-bike.svg';
import healingIcon from '../../../assets/family-recovery/healing.svg';
import heartIcon from '../../../assets/family-recovery/heart-smile.svg';
import FamilyRecoveryDetailLayout from './FamilyRecoveryDetailLayout';

const guideItems = [
  {
    title: '몸의 회복',
    icon: healingIcon,
    points: [
      '허리·골반 등 통증의 변화를 살펴보기',
      '출산 후 6주(때로 2주)에 보건의료 전문가와 후속 방문하여 자궁 회복, 상처 치유, 우울증·요실금 등을 평가하기',
    ],
  },
  {
    title: '활동 늘리기',
    icon: activityIcon,
    points: [
      '가벼운 집안일 (식사 준비, 빨래), 아기와의 산책을 시작하되 피로하면 즉시 휴식하기',
      '피로하지 않은 범위에서 운동 횟수를 늘려가되, 힘든 활동은 6주 이후로 미루기',
    ],
  },
  {
    title: '마음 돌보기',
    icon: heartIcon,
    points: [
      '우울감·불안·무기력 등의 변화를 확인하기',
      '감정 변화가 지속되거나 일상에 영향을 준다면 상담받기',
    ],
  },
  {
    title: '수면 휴식',
    icon: restIcon,
    points: [
      '가족과 아기 돌봄을 나누기',
      '산모가 충분히 쉴 수 있는 시간 확보하기',
      '수면 부족과 피로가 지속되는지 확인하기',
    ],
  },
];

const FamilyRecoveryGuideMiddlePage = ({ onBack = () => {} }) => (
  <FamilyRecoveryDetailLayout
    title="산후 3~6주 | 일상으로 돌아가는 회복기"
    description={'몸이 회복되는 과정을 살피면서\n일상으로 천천히 돌아가는 시기예요.'}
    items={guideItems}
    onBack={onBack}
  />
);

export default FamilyRecoveryGuideMiddlePage;
