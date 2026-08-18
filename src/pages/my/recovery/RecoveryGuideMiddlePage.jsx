import backButton from '../../../assets/back_button.svg';
import restIcon from '../../../assets/recoveryguide_airline_seat_flat.svg';
import activityIcon from '../../../assets/recoveryguide_directions_bike.svg';
import healingIcon from '../../../assets/recoveryguide_healing.svg';
import heartIcon from '../../../assets/recoveryguide_heart_smile.svg';

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

const RecoveryGuideMiddlePage = ({ onBack = () => {} }) => (
  <main className="mx-auto min-h-[874px] w-full max-w-[402px] bg-primary-light text-gray-900">
    <header className="flex h-[112px] items-end border-b border-[#dcdcdc] bg-gray-50 px-5 pb-3 pt-[68px]">
      <div className="flex h-8 w-16 items-center">
        <button
          type="button"
          aria-label="이전 화면으로 돌아가기"
          onClick={onBack}
          className="flex size-8 items-center justify-center"
        >
          <img src={backButton} alt="" className="h-[21px] w-[13px]" />
        </button>
      </div>
      <h1 className="flex-1 self-center whitespace-nowrap text-center text-[20px] font-medium leading-none text-black">
        Recovery Guide
      </h1>
      <div className="h-8 w-16" aria-hidden="true" />
    </header>

    <section className="px-[21px] pt-[46px]">
      <h2 className="text-[20px] font-medium leading-normal text-primary">
        산후 3~6주 <span aria-hidden="true">|</span> 일상으로 돌아가는 회복기
      </h2>
      <p className="mt-px whitespace-pre-line text-[16px] leading-[1.5] tracking-[-0.48px] text-gray-700">
        {'몸이 회복되는 과정을 살피면서\n일상으로 천천히 돌아가는 시기예요.'}
      </p>

      <div className="mt-[64px] flex flex-col gap-5">
        {guideItems.map((item) => (
          <article key={item.title} className="flex h-[100px] gap-2">
            <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-[13px] rounded-[10px] bg-gray-50">
              <img src={item.icon} alt="" className="size-[30px]" />
              <h3 className="text-center text-[16px] font-medium leading-[1.5] tracking-[-0.48px] text-primary">
                {item.title}
              </h3>
            </div>

            <div className="flex min-w-0 flex-1 items-center rounded-[10px] bg-gray-50 px-5">
              <ul className="w-full list-disc pl-[18px] text-[12px] leading-[1.5] tracking-[-0.36px] text-gray-700">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
);

export default RecoveryGuideMiddlePage;
