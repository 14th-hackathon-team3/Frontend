import backButton from '../../../assets/back_button.svg';
import activityIcon from '../../../assets/recoveryguide_directions_bike.svg';
import returnIcon from '../../../assets/recoveryguide_event_repeat.svg';
import healingIcon from '../../../assets/recoveryguide_healing.svg';
import heartIcon from '../../../assets/recoveryguide_heart_smile.svg';

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

const RecoveryGuideLatePage = ({ onBack = () => {} }) => (
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
        산후 6주~3개월 <span aria-hidden="true">|</span> 일상으로 돌아가는 회복기
      </h2>
      <p className="mt-px whitespace-pre-line text-[16px] leading-[1.5] tracking-[-0.48px] text-gray-700">
        {'몸과 마음의 변화를 다시 살펴보고,\n나에게 맞는 속도로 일상과 활동을 회복해가는 시기예요.'}
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

export default RecoveryGuideLatePage;
