import backButton from '../../../assets/back_button.svg';
import restIcon from '../../../assets/recoveryguide_airline_seat_flat.svg';
import hygieneIcon from '../../../assets/recoveryguide_clean_hands.svg';
import activityIcon from '../../../assets/recoveryguide_directions_bike.svg';
import healingIcon from '../../../assets/recoveryguide_healing.svg';

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

const RecoveryGuideEarlyPage = ({ onBack = () => {} }) => (
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
        산후 1~2주 <span aria-hidden="true">|</span> 일상으로 돌아가는 회복기
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

export default RecoveryGuideEarlyPage;
