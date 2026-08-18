import { useEffect, useRef, useState } from 'react';
import BottomNavigation from '../../../components/BottomNavigation';
import notificationIcon from '../../../assets/Home_notification.svg';
import heroBackground from '../../../assets/Family_home_ellipse.svg';
import dayArc from '../../../assets/Vector 226.svg';
import milkImage from '../../../assets/milk.png';
import babyImage from '../../../assets/Home_baby.png';
import drinkImage from '../../../assets/Home_drink.png';
import yogaImage from '../../../assets/Home_yoga.svg.svg';
import recoveryTooltipTail from '../../../assets/Family_recovery_tooltip_tail.svg';
import progressLine from '../../../assets/Family_progress_line.svg';
import progressDashed from '../../../assets/Family_progress_dashed.svg';
import progressDot from '../../../assets/Family_progress_dot.svg';
import progressFutureDot from '../../../assets/Family_progress_future_dot.svg';
import progressCurrent from '../../../assets/Family_progress_current.svg';
import progressCurrentBg from '../../../assets/Family_progress_current_bg.svg';
import selectedDayBackground from '../../../assets/Family_home_selected_day.svg';
import { contentApi } from '../../../api/content';

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '할 일' },
  { key: 'mypage', label: '마이페이지' },
];

const articles = [
  {
    category: 'Swellnessy Drink',
    title: '리프팅 스무디를 통해\n피부 노화를 예방하세요!',
    image: drinkImage,
    imageClass: 'object-contain p-1',
    imageBackground: 'bg-[#e5e5e5]',
    page: 'recoveryContent',
  },
  {
    category: 'Medication',
    title: '고관절 운동 루틴을 통해\n골반저 건강을 챙기세요!',
    image: yogaImage,
    imageClass: 'object-cover',
    imageBackground: 'bg-[#e5e5e5]',
  },
  {
    category: 'Recovery',
    title: '산후 회복을 위한 생활 가이드',
    image: milkImage,
    imageClass: 'object-cover',
    imageBackground: 'bg-gray-50',
  },
];

const dialSlots = [
  { left: 5, top: 125 },
  { left: 44, top: 87 },
  { left: 88, top: 59 },
  { left: 137, top: 40 },
  { left: 188, top: 27 },
  { left: 239, top: 40 },
  { left: 288, top: 59 },
  { left: 329, top: 89 },
  { left: 364, top: 128 },
];

const RecoveryInfoModal = ({ onClose, stageName }) => (
  <div className="fixed inset-0 z-[60] mx-auto w-full max-w-[402px] bg-[#3b3b3b]/20">
    <div
      className="
        absolute left-1/2 top-[202px]
        w-[327px] -translate-x-1/2
        drop-shadow-[0_4px_7.5px_rgba(49,48,46,0.2)]
      "
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="recovery-info-title"
        className="relative h-[218px] w-[327px] rounded-[8px] bg-white"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="
            absolute right-[8px] top-[15px]
            flex h-[22px] w-[21px] items-center justify-center
            text-center
            text-[28px] font-normal leading-[22px]
            tracking-[-0.43px] text-black
            [font-feature-settings:'liga'_off,'clig'_off]
          "
        >
          ×
        </button>
        <div className="px-4 pb-4 pl-[30px] pt-0">
          <h2
            id="recovery-info-title"
            className="
              absolute left-[16px] right-[16px] top-[38px]
              text-center font-sans
              text-[17px] font-[510] leading-[22px]
              tracking-[-0.4px] text-black
            "
          >
            산후 {stageName}
          </h2>
          <ul
            className="
              absolute left-[16px] top-[64px]
              h-[108px] w-[295px]
              list-inside list-disc
              text-center font-sans
              text-[13px] font-normal leading-[18px]
              tracking-[-0.4px] text-[#878787]
              [&>li::marker]:text-[8px]
              [font-feature-settings:'liga'_off,'clig'_off]
            "
          >
            <li>가벼운 집안일, 아기와의 산책</li>
            <li>집에서 정상적인 목욕</li>
            <li>
              피로하지 않은 범위에서 횟수를 늘려가며 운동
              <br />
              (무거운 물건 들기나 힘든 활동은 6주 이후)
            </li>
            <li>
              출산 후 6주에 보건의료 전문가와 후속 방문하여
              <br />
              자궁 회복, 상처 치유, 우울증·요실금 등을 평가
            </li>
          </ul>
        </div>
      </section>
      <img
        src={recoveryTooltipTail}
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-[30px] left-1/2
          h-[30px] w-[56px]
          -translate-x-1/2
        "
      />
    </div>
  </div>
);

const Homepage = ({ onNavigate = () => {} }) => {
  const [isRecoveryInfoOpen, setIsRecoveryInfoOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(36);
  const [recoveryStage, setRecoveryStage] = useState({
    stage_name: '3~6주차',
    goal: '일상 기능 회복하기',
  });
  const dialStartX = useRef(null);
  const didDial = useRef(false);

  useEffect(() => {
    contentApi
      .getCurrentStage(5)
      .then(setRecoveryStage)
      .catch(() => {});
  }, []);

  const moveDial = (direction) => {
    setSelectedDay((day) => Math.min(60, Math.max(1, day + direction)));
  };

  const handleDialStart = (event) => {
    dialStartX.current = event.clientX;
    didDial.current = false;
  };

  const handleDialEnd = (event) => {
    if (dialStartX.current === null) return;
    const distance = event.clientX - dialStartX.current;
    dialStartX.current = null;

    if (Math.abs(distance) < 20) return;
    didDial.current = true;
    moveDial(distance < 0 ? 1 : -1);
    window.setTimeout(() => {
      didDial.current = false;
    }, 0);
  };
  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[118px] pt-[55px]">
      <button
        type="button"
        aria-label="알림"
        className="absolute right-[21px] top-[55px] z-10 flex size-[43px] items-center justify-center rounded-full bg-[#809CFF]"
      >
        <img src={notificationIcon} alt="" className="size-[22px] brightness-0 invert" />
      </button>
      <header className="px-[22px] pt-[43px]">
        <span className="inline-flex rounded-full bg-[#809CFF] px-[10px] py-[2px] text-[11px] font-semibold tracking-[0.33px] text-white">
          산후 5주차
        </span>
        <h1 className="mt-1 text-[24px] font-semibold tracking-[-0.48px] text-[#121212]">
          오늘의 회복 여정, 함께 살펴볼까요?
        </h1>
        <p className="mt-[6px] text-[12px] tracking-[-0.36px] text-[#666]">
          출산 5주차 · 회복 여정 {selectedDay}일째
        </p>
      </header>

      <section className="relative mt-0 h-[282px] overflow-visible" aria-label="회복 여정 Day 36">
        <img
          src={heroBackground}
          alt=""
          className="absolute left-0 top-[26px] h-[310px] w-[402px]"
        />
        <img
          src={babyImage}
          alt="아기"
          className="absolute left-[92px] top-[81px] h-[146px] w-[219px] object-cover opacity-80"
        />
        <p className="absolute left-1/2 top-[187px] -translate-x-1/2 text-[52px] font-bold tracking-[-1px] text-white">
          Day {selectedDay}
        </p>
        <img
          src={dayArc}
          alt=""
          className="pointer-events-none absolute left-0 top-[26px] z-30 h-[178px] w-[402px]"
        />
        <div
          className="absolute inset-0 z-40 touch-pan-y select-none text-[8px] text-[#809CFF]"
          onPointerDown={handleDialStart}
          onPointerUp={handleDialEnd}
        >
          {dialSlots.map(({ left, top }, index) => {
            const day = selectedDay + index - 4;
            const isCurrent = index === 4;
            return (
              <button
                key={day}
                type="button"
                onClick={() => {
                  if (didDial.current) return;
                  if (isCurrent) onNavigate('journey');
                  else setSelectedDay(day);
                }}
                className={`
                  absolute flex h-[30px] w-[31px] items-center justify-center
                  transition-all duration-300
                  ${
                    isCurrent
                      ? 'text-[12px] font-semibold text-[#809CFF]'
                      : 'rounded-full bg-white/70 text-[8px] text-[#809CFF]'
                  }
                `}
                style={{ left, top }}
              >
                {isCurrent && (
                  <img
                    src={selectedDayBackground}
                    alt=""
                    className="
                      pointer-events-none absolute left-1/2 top-1/2
                      h-[50px] w-[51px] max-w-none
                      -translate-x-1/2 -translate-y-1/2
                    "
                  />
                )}

                <span className="relative z-10">{day}</span>
              </button>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        onClick={() => setIsRecoveryInfoOpen(true)}
        className="
          relative z-50 mx-auto -mt-[19px]
          block h-[120px] w-[358px]
          rounded-[24px] bg-white
          text-left shadow-sm
        "
        aria-label="산후 회복 진행 정보 보기"
      >
        {/* 전체 점선 */}
        <img
          src={progressDashed}
          alt=""
          className="pointer-events-none absolute left-[45px] top-[39px] h-[32px] w-[267px]"
        />

        {/* 완료 구간 실선 */}
        <img
          src={progressLine}
          alt=""
          className="pointer-events-none absolute left-[45px] top-[45px] h-[26px] w-[154px]"
        />

        {/* 2주 */}
        <img
          src={progressDot}
          alt=""
          className="absolute left-[40px] top-[62px] h-[12px] w-[12px]"
        />

        {/* 4주 */}
        <img
          src={progressDot}
          alt=""
          className="absolute left-[116px] top-[52px] h-[12px] w-[12px]"
        />
        {/* 현재 5주 배경 */}
        <img
          src={progressCurrentBg}
          alt=""
          className="absolute left-[184px] top-[36px] h-[34px] w-[34px]"
        />

        {/* 현재 5주 점 */}
        <img
          src={progressCurrent}
          alt=""
          className="absolute left-[192.5px] top-[44.5px] h-[17px] w-[17px]"
        />

        {/* 6주 */}
        <img
          src={progressFutureDot}
          alt=""
          className="absolute left-[267px] top-[50px] h-[12px] w-[12px]"
        />

        {/* 8주 */}
        <img
          src={progressFutureDot}
          alt=""
          className="absolute left-[307px] top-[56px] h-[12px] w-[12px]"
        />

        {/* 주차 텍스트 */}
        <span className="absolute left-[38px] top-[80px] text-[11px] text-gray-500">2주</span>

        <span className="absolute left-[114px] top-[73px] text-[11px] text-gray-500">4주</span>

        <span className="absolute left-[190px] top-[67px] text-[11px] font-medium text-[#809CFF]">
          5주
        </span>

        <span className="absolute left-[265px] top-[72px] text-[11px] text-gray-300">6주</span>

        <span className="absolute left-[305px] top-[78px] text-[11px] text-gray-300">8주</span>
      </button>

      <section className="mt-6">
        <h2 className="ml-[22px] text-[16px] font-medium tracking-[-0.32px] text-[#809CFF]">
          AAC가 회복을 책임져드릴게요
        </h2>
        <div className="mt-[9px] flex gap-[13px] overflow-x-auto px-[22px] pb-2 [scrollbar-width:none]">
          {articles.map((article) => (
            <button
              key={article.title}
              type="button"
              onClick={() => article.page && onNavigate(article.page)}
              className="w-[160px] shrink-0 overflow-hidden rounded-[13px] bg-gray-50 text-left shadow-sm"
            >
              <div className={`h-[79px] ${article.imageBackground}`}>
                <img src={article.image} alt="" className={`size-full ${article.imageClass}`} />
              </div>
              <div className="h-[81px] p-[13px]">
                <p className="text-[8px] text-[#666]">{article.category}</p>
                <p className="mt-1 whitespace-pre-line text-[11px] font-semibold leading-4 text-[#2b2b2b]">
                  {article.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>
      <div className="fixed bottom-[22px] left-1/2 z-20 -translate-x-1/2">
        <BottomNavigation
          activeKey="home"
          items={navigationItems}
          onChange={onNavigate}
          activeBgClass="bg-[#809CFF]"
          activeIconClass="text-white"
        />
      </div>
      {isRecoveryInfoOpen && (
        <RecoveryInfoModal
          stageName={recoveryStage.stage_name}
          onClose={() => setIsRecoveryInfoOpen(false)}
        />
      )}
    </main>
  );
};

export default Homepage;
