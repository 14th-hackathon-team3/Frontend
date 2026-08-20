import { useEffect, useState } from 'react';

import BottomNavigation from '../../../components/BottomNavigation';

import menuBookIcon from '../../../assets/Family_menu_book.svg';
import analysisIcon from '../../../assets/Family_star.svg';

import FolderFlap1 from '../../../assets/Rectangle1.svg';
import FolderFlap2 from '../../../assets/Rectangle2.svg';
import FolderFlap3 from '../../../assets/Rectangle3.svg';
import FolderFlap4 from '../../../assets/Rectangle4.svg';

import hiddenInfoIcon from '../../../assets/hidden_info.png';
import backButton from '../../../assets/back_button.svg';
import { careApi } from '../../../api/care';
import { EMOTION_BY_VALUE } from '../../../constants/emotions';


const PRIVATE_CARDS_STORAGE_KEY =
  'recoveryJourneyPrivateCards';


/* =========================
   Bottom Navigation
========================= */

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '투두' },
  { key: 'mypage', label: '마이페이지' },
];


/* =========================
   기록 Folder
========================= */

const recordCards = [
  {
    id: 'activity',
    title: '활동량/메모',
    top: 'top-0',
    titleTop: 'top-[24px]',
    background: 'bg-[#809CFF]/10',
    flap: FolderFlap4,
  },

  {
    id: 'skin',
    title: '피부/모발',
    top: 'top-[50px]',
    titleTop: 'top-[74px]',
    background: 'bg-[#809CFF]/40',
    flap: FolderFlap3,
  },

  {
    id: 'pain',
    title: '통증/수유',
    top: 'top-[100px]',
    titleTop: 'top-[124px]',
    background: 'bg-[#809CFF]/60',
    flap: FolderFlap2,
  },

  {
    id: 'mood-sleep',
    title: '감정/수면',
    top: 'top-[153px]',
    titleTop: 'top-[177px]',
    background: 'bg-[#809CFF]',
    flap: FolderFlap1,
  },
];

const feedingLabels = { breast: '모유', formula: '분유', mixed: '혼합' };
const hairLabels = { same: '평소와 같음', slight: '약간 빠짐', heavy: '많이 빠짐' };
const skinLabels = { 1: '매우 좋음', 2: '좋음', 3: '약간의 트러블', 4: '트러블 심함' };

const toDateKey = (date) => date.toLocaleDateString('en-CA');
const formatDate = (dateKey) => {
  const [year, month, day] = dateKey.split('-').map(Number);
  return `${year}년 ${month}월 ${day}일`;
};
const formatHours = (hours) => {
  if (hours == null) return '기록 없음';
  const minutes = Math.round(Number(hours) * 60);
  return `${Math.floor(minutes / 60)}시간 ${minutes % 60}분`;
};
const createRecords = (log, dateKey) => {
  const exercise = (log?.exercise ?? '').split(' / ');
  return {
    'mood-sleep': { title: '감정/수면', sections: [{ label: '감정 상태', value: log?.emotion ? EMOTION_BY_VALUE[log.emotion]?.label ?? log.emotion : '기록 없음' }, { label: '수면 시간', value: formatHours(log?.sleep_hours) }] },
    pain: { title: '통증/수유', sections: [{ label: '통증 부위', value: log?.pain_area || '기록 없음' }, { label: '통증 정도', value: log?.pain_score == null ? '기록 없음' : `${log.pain_score}/5` }, { label: '수유 방식', value: log?.breastfeeding ? feedingLabels[log.breastfeeding] ?? log.breastfeeding : '기록 없음' }] },
    skin: { title: '피부/모발', sections: [{ label: '피부 상태', value: skinLabels[log?.skin_self_score] ?? '기록 없음' }, { label: '피부 증상', value: log?.skin_symptom_tags?.join(', ') || '기록 없음' }, { label: '모발 상태', value: hairLabels[log?.hair_loss_status] ?? '기록 없음' }] },
    activity: { title: '활동량/메모', sections: [{ label: '활동 종류', value: exercise[0] || '기록 없음' }, { label: '활동량', value: exercise[1] || '기록 없음' }, { label: '자유 메모', value: log?.memo || '기록 없음' }] },
    date: formatDate(dateKey),
  };
};

const toChartPoints = (values, { min = null, max = null } = {}) => {
  if (!Array.isArray(values) || values.length === 0) return [];

  const numericValues = values
    .filter((value) => value != null && Number.isFinite(Number(value)))
    .map(Number);

  if (numericValues.length === 0) return values.map(() => null);

  let resolvedMin = min ?? Math.min(...numericValues);
  let resolvedMax = max ?? Math.max(...numericValues);

  if (resolvedMin === resolvedMax) {
    resolvedMin -= 1;
    resolvedMax += 1;
  }

  const range = resolvedMax - resolvedMin;

  return values.map((value) => {
    if (value == null || !Number.isFinite(Number(value))) return null;
    return 56 - ((Number(value) - resolvedMin) / range) * 44;
  });
};

const formatWeekday = (dateKey) => {
  const date = new Date(`${dateKey}T00:00:00`);
  return Number.isNaN(date.getTime()) ? '' : ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
};

const getRecentWeekDates = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const mondayOffset = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return toDateKey(date);
  });
};

const alignWeekValuesToDates = (apiDates, values, slotDates) => {
  const valuesByDate = new Map();

  apiDates.forEach((date, index) => {
    if (typeof date === 'string') {
      valuesByDate.set(date.slice(0, 10), values[index] ?? null);
    }
  });

  return slotDates.map((date) => valuesByDate.get(date) ?? null);
};

const MotherRecordPage = ({ record, date, onBack }) => (
  <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-[#F1EFF4] px-[30px] pt-[140px]">
    <header className="absolute inset-x-0 top-0 flex h-[112px] items-end justify-center border-b border-[#DCDCDC] bg-[#FCFCFC] pb-3">
      <button type="button" onClick={onBack} aria-label="뒤로 가기" className="absolute left-5 flex size-8 items-center justify-center"><img src={backButton} alt="" className="h-[21px] w-[13px]" /></button>
      <h1 className="text-[20px] font-medium text-[#121212]">{record.title}</h1>
    </header>
    <p className="mb-[15px] text-[14px] text-[#6E6E6E]">산모 기록 · {date}</p>
    <section className="space-y-[30px]">
      {record.sections.map((section, index) => <div key={section.label} className={index > 0 ? 'border-t border-[#DCDCDC] pt-[30px]' : ''}><h2 className="px-[10px] text-[20px] font-medium tracking-[-0.4px] text-[#121212]">{section.label}</h2>{record.title === '감정/수면' && section.label === '감정 상태' ? <div className="mt-[15px] flex flex-wrap gap-[11px]">{Object.values(EMOTION_BY_VALUE).map(({ label }) => <span key={label} className={`rounded-[10px] px-[25px] py-[8px] text-[18px] font-medium tracking-[-0.36px] ${section.value === label ? 'bg-[#809CFF] text-[#FCFCFC]' : 'bg-[#FCFCFC] text-[#121212]'}`}>{label}</span>)}</div> : <p className="mt-[15px] rounded-[10px] border border-[#CBCBCB] bg-[#F6F6F6] px-4 py-[13px] text-[16px] text-[#121212]">{section.value}</p>}</div>)}
    </section>
  </main>
);


/* =========================
   비공개 데이터 불러오기
========================= */

const readPrivateCards = () => {
  try {
    const savedCards =
      window.localStorage.getItem(
        PRIVATE_CARDS_STORAGE_KEY
      );

    const parsedCards = savedCards
      ? JSON.parse(savedCards)
      : [];

    return Array.isArray(parsedCards)
      ? parsedCards
      : [];
  } catch {
    return [];
  }
};


/* =========================
   Week 그래프
========================= */

const TrendChart = ({
  color,
  points,
  labels,
  area = false,
}) => {
  const safePoints = Array.isArray(points) ? points : [];
  const safeLabels = Array.isArray(labels) ? labels : [];
  const chartWidth = 289;
  const pointGap = safePoints.length > 1 ? chartWidth / (safePoints.length - 1) : 0;

  return (
    <div className="mt-3">

      <div className="relative mx-auto h-[58px] w-[289px]">

        {safePoints
          .slice(0, -1)
          .map((point, index) => {

            const nextPoint =
              safePoints[index + 1];

            if (point == null || nextPoint == null) {
              return null;
            }

            const horizontal = pointGap;

            const vertical =
              nextPoint - point;

            const length = Math.sqrt(
              horizontal ** 2 +
                vertical ** 2
            );

            const angle =
              Math.atan2(
                vertical,
                horizontal
              ) *
              (180 / Math.PI);


            return (
              <span
                key={`${point}-${index}`}
                className="
                  absolute
                  h-[2px]
                  origin-left
                "
                style={{
                  left: `${index * pointGap}px`,
                  top: `${point}px`,
                  width: `${length}px`,
                  backgroundColor: color,
                  transform: `rotate(${angle}deg)`,
                }}
              />
            );
          })}


        {area && (
          <span
            className="
              absolute
              inset-x-0
              bottom-0
              h-[36px]
              bg-gradient-to-t
              from-[#E6F7EE]
              to-transparent
            "
          />
        )}


        {safePoints.map((point, index) => {
          if (point == null) {
            return null;
          }

          return (
            <span
              key={`${point}-point`}
              className="
                absolute
                z-10
                size-[6px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border-2
                bg-white
              "
              style={{
                left: `${index * pointGap}px`,
                top: `${point}px`,
                borderColor: color,
              }}
            />
          );
        })}

      </div>


      <div
        className="
          flex
          mx-auto
          w-[289px]
          justify-between
          text-[10px]
          text-[#9D9D9D]
        "
      >
        {safeLabels.map((label, index) => (
          <span key={`${label}-${index}`}>{label || '-'}</span>
        ))}
      </div>

    </div>
  );
};


/* =========================
   비공개 카드
========================= */

const PrivacyCard = ({ title }) => {
  return (
    <article
      className="
        relative
        flex
        h-[138px]
        items-center
        justify-center
        overflow-hidden
        rounded-[16px]
        bg-white
        px-4
        shadow-[0_2px_6px_rgba(0,0,0,0.04)]
      "
    >

      <div
        className="
          absolute
          inset-0
          bg-gray-100/70
          backdrop-blur-[8px]
        "
      />


      <div
        className="
          relative
          flex
          flex-col
          items-center
          gap-2
          text-center
        "
      >

        <img
          src={hiddenInfoIcon}
          alt="비공개"
          className="size-[30px]"
        />

        <p
          className="
            text-[14px]
            font-medium
            tracking-[-0.28px]
            text-[#121212]
          "
        >
          보호자에게 비공개된 {title} 데이터입니다
        </p>

      </div>

    </article>
  );
};


/* =========================
   주간 데이터 카드
========================= */

const TrackingCard = ({
  title,
  badge,
  value,
  color,
  points,
  labels,
  area,
}) => {
  const hasData = points.some(Number.isFinite);

  return (
    <article
      className="
        h-[138px]
        rounded-[20px]
        bg-white
        px-4
        py-[16px]
        shadow-[0_2px_6px_rgba(0,0,0,0.04)]
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <h2
          className="
            text-[18px]
            font-medium
            text-[#121212]
          "
        >
          {title}
        </h2>


        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          {badge && (
            <span
              className={`
                rounded-[13px]
                px-2
                py-1
                text-[12px]
                font-normal

                ${
                  title === '수면'
                    ? 'bg-[#FDF0EC] text-[#EB2B2B]'
                    : 'bg-[#EDFAF4] text-[#3A9E72]'
                }
              `}
            >
              {badge}
            </span>
          )}


          <span
            className="
              text-[16px]
              font-normal
              leading-[24px]
            "
            style={{
              color,
            }}
          >
            {value}
          </span>

        </div>

      </div>


      {hasData ? (
        <TrendChart
          color={color}
          points={points}
          labels={labels}
          area={area}
        />
      ) : (
        <p className="mt-8 text-center text-[12px] text-[#9D9D9D]">
          기록 없음
        </p>
      )}

    </article>
  );
};


/* =========================
   Week View
========================= */

const FamilyWeeklyJourneyPage = ({
  onDay,
  onNavigate,
  privateCards,
  weekTrend,
  isTrendLoading,
}) => {
  const sleepBanner = weekTrend?.banners?.find((banner) => banner.type === 'sleep');
  const painBanner = weekTrend?.banners?.find((banner) => banner.type === 'pain');
  const emotionBanner = weekTrend?.banners?.find((banner) => banner.type === 'emotion');
  const banners = Array.isArray(weekTrend?.banners) ? weekTrend.banners : [];
  const apiDates = Array.isArray(weekTrend?.dates) ? weekTrend.dates : [];
  const dates = getRecentWeekDates();
  const labels = dates.map(formatWeekday);
  const sleep = alignWeekValuesToDates(apiDates, Array.isArray(weekTrend?.sleep) ? weekTrend.sleep : [], dates);
  const pain = alignWeekValuesToDates(apiDates, Array.isArray(weekTrend?.pain) ? weekTrend.pain : [], dates);
  const weeklyEmotions = alignWeekValuesToDates(apiDates, Array.isArray(weekTrend?.emotion) ? weekTrend.emotion : [], dates);
  const latestSleep = [...sleep].reverse().find((value) => value != null);
  const latestPain = [...pain].reverse().find((value) => value != null);
  const sleepPoints = toChartPoints(sleep);
  const painPoints = toChartPoints(pain, { min: 0, max: 5 });

  return (
    <main
      className="
        relative
        mx-auto
        min-h-screen
        w-full
        max-w-[402px]
        bg-[#F1EFF4]
        pb-[122px]
        pt-[37px]
      "
    >

      {/* HEADER */}
      <header
        className="
          flex
          items-end
          justify-between
          px-[21px]
        "
      >

        <h1
          className="
            text-[24px]
            font-medium
            tracking-[-0.48px]
            text-black
          "
        >
          Recovery Journey
        </h1>


        <button
          type="button"
          onClick={() =>
            onNavigate('recoveryGuide')
          }
          aria-label="리커버리 가이드 보기"
          className="
            flex
            h-[30px]
            w-[37px]
            flex-col
            items-center
          "
        >
          <img
            src={menuBookIcon}
            alt=""
            className="size-[30px]"
          />
          <span className="mt-[1px] whitespace-nowrap text-[8px] text-[#848991]">가이드 보기</span>
        </button>

      </header>


      {/* DAY / WEEK */}
      <div
        className="
          mx-auto
          mt-[29px]
          flex
          h-[30px]
          w-[360px]
          rounded-[20px]
          bg-[#F6F8FF]
        "
      >

        <button
          type="button"
          onClick={onDay}
          className="
            w-1/2
            rounded-[20px]
            text-[16px]
            font-medium
            text-[#809CFF]
          "
        >
          Day
        </button>


        <button
          type="button"
          className="
            w-1/2
            rounded-[20px]
            bg-[#809CFF]
            text-[16px]
            font-medium
            text-white
          "
        >
          Week
        </button>

      </div>


      {/* 분석 */}
      <section
        className="
          mx-auto
          mt-[27px]
          flex
          min-h-20
          w-[360px]
          items-center
          gap-2
          rounded-[20px]
          bg-[#F6F8FF]
          px-[15px]
          py-[15px]
        "
      >

        <img
          src={analysisIcon}
          alt=""
          className="size-[35px]"
        />


        <p
          className="
            text-[12px]
            font-medium
            tracking-[-0.4px]
            text-[#809CFF]
          "
        >
          <span>최근 7일 종합 분석</span>
          {banners[0]?.message && (
            <span className="mt-1 block">{banners[0].message}</span>
          )}
        </p>

      </section>


      {/* 주간 카드 */}
      <section
        className="
          mx-auto
          mt-[29px]
          w-[360px]
          space-y-[13px]
        "
      >

        {privateCards.includes('수면') ? (
          <PrivacyCard title="수면" />
        ) : (
          <TrackingCard
            title="수면"
            badge={sleepBanner?.message ?? '최근 3일 감소'}
            value={latestSleep == null ? '기록 없음' : `${latestSleep}h`}
            color="#E66161"
            points={sleepPoints}
            labels={labels}
          />
        )}


        {privateCards.includes('통증') ? (
          <PrivacyCard title="통증" />
        ) : (
          <TrackingCard
            title="통증"
            badge={painBanner?.message ?? '전반적으로 감소'}
            value={latestPain == null ? '기록 없음' : String(latestPain)}
            color="#6BBF99"
            points={painPoints}
            labels={labels}
            area
          />
        )}


        {privateCards.includes('감정') ? (
          <PrivacyCard title="감정" />
        ) : (
          <article
            className="
              rounded-[20px]
              bg-white
              px-4
              py-[16px]
              shadow-[0_2px_6px_rgba(0,0,0,0.04)]
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <h2
                className="
                  text-[18px]
                  font-medium
                  text-[#121212]
                "
              >
                감정
              </h2>

              {emotionBanner && (
                <span
                  className="
                    rounded-[13px]
                    bg-[#EDFAF4]
                    px-2
                    py-1
                    text-[12px]
                    font-normal
                    text-[#3A9E72]
                  "
                >
                  {emotionBanner.message}
                </span>
              )}

            </div>


            <div
              className="
                mx-auto
                mt-[16px]
                grid
                w-[289px]
                grid-cols-7
                text-[22px]
                text-center
              "
            >
              {weeklyEmotions.map((emotion, index) => (
                <span key={`emotion-${index}`} title={emotion ? EMOTION_BY_VALUE[emotion]?.label : '기록 없음'}>
                  {emotion ? EMOTION_BY_VALUE[emotion]?.emoji ?? null : null}
                </span>
              ))}
            </div>


            <div
              className="
                mx-auto
                mt-1
                grid
                w-[289px]
                grid-cols-7
                text-[10px]
                text-center
                text-[#9D9D9D]
              "
            >
              {labels.map((label, index) => <span key={`${label}-${index}`}>{label || '-'}</span>)}
            </div>

          </article>
        )}

      </section>

      {!isTrendLoading && banners.length > 0 && (
        <section className="mx-auto mt-3 w-[360px] space-y-3">
          {banners.map((banner, index) => (
            <article key={`${banner.type ?? 'trend'}-${index}`} className="rounded-[16px] bg-[#F6F8FF] px-4 py-4 shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
              <p className="text-[14px] font-medium text-[#809CFF]">{banner.message}</p>
            </article>
          ))}
        </section>
      )}


      {/* Bottom Navigation */}
      <div
        className="
          fixed
          bottom-[22px]
          left-1/2
          z-50
          -translate-x-1/2
        "
      >
        <BottomNavigation
          activeKey="journey"
          items={navigationItems}
          onChange={onNavigate}
          activeBgClass="bg-[#809CFF]"
          activeIconClass="text-[#F6F8FF]"
        />
      </div>

    </main>
  );
};


/* =========================
   DAY VIEW
========================= */

const JourneyPage = ({
  onNavigate = () => {},
}) => {
  const today =
    new Date();


  today.setHours(
    0,
    0,
    0,
    0
  );


  const todayWeekday =
    (today.getDay() + 6) % 7;


  const [
    weekOffset,
    setWeekOffset,
  ] = useState(0);


  const [
    selectedDayIndex,
    setSelectedDayIndex,
  ] = useState(todayWeekday);


  const [
    isWeekView,
    setIsWeekView,
  ] = useState(false);

  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const [weekTrend, setWeekTrend] = useState(null);
  const [isTrendLoading, setIsTrendLoading] = useState(true);


  const [privateCards] =
    useState(readPrivateCards);


  const weekdays = [
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일',
  ];


  /* =========================
     이번 주 시작 날짜
  ========================= */

  const weekStart =
    new Date(today);


  weekStart.setDate(
    today.getDate() -
      todayWeekday +
      weekOffset * 7
  );


  /* =========================
     월 ~ 일 날짜 생성
  ========================= */

  const weekDates =
    Array.from(
      {
        length: 7,
      },
      (_, index) => {

        const date =
          new Date(weekStart);

        date.setDate(
          weekStart.getDate() +
            index
        );

        return date;
      }
    );


  const selectedDate =
    weekDates[
      selectedDayIndex
    ];

  const selectedDateKey = toDateKey(selectedDate);

  useEffect(() => {
    let active = true;

    careApi.getDailyLogs().then((logs) => {
      if (!active) return;
      setSelectedLog(
        (Array.isArray(logs) ? logs : []).find(
          (log) => log.log_date === selectedDateKey
        ) ?? null
      );
    }).catch(() => {
      if (active) setSelectedLog(null);
    });

    return () => { active = false; };
  }, [selectedDateKey]);

  useEffect(() => {
    let active = true;

    careApi.getWeekTrend().then((trend) => {
      if (active) setWeekTrend(trend);
    }).catch(() => {
      if (active) setWeekTrend(null);
    }).finally(() => {
      if (active) setIsTrendLoading(false);
    });

    return () => { active = false; };
  }, []);


  const dateLabel =
    selectedDate.getTime() ===
    today.getTime()
      ? '오늘'
      : `${
          selectedDate.getMonth() +
          1
        }월 ${selectedDate.getDate()}일`;

  const records = createRecords(selectedLog, selectedDateKey);

  if (selectedRecordId) {
    return (
      <MotherRecordPage
        record={records[selectedRecordId]}
        date={records.date}
        onBack={() => setSelectedRecordId(null)}
      />
    );
  }


  /* =========================
     WEEK VIEW
  ========================= */

  if (isWeekView) {
    return (
      <FamilyWeeklyJourneyPage
        onDay={() =>
          setIsWeekView(false)
        }
        onNavigate={onNavigate}
        privateCards={
          privateCards
        }
        weekTrend={weekTrend}
        isTrendLoading={isTrendLoading}
      />
    );
  }


  return (
    <main
      className="
        relative
        mx-auto
        min-h-screen
        w-full
        max-w-[402px]
        overflow-hidden
        bg-[#F1EFF4]
        pb-[120px]
        pt-[76px]
      "
    >

      {/* =========================
          HEADER
      ========================= */}
      <header
        className="
          flex
          h-[37px]
          items-end
          justify-between
          px-[21px]
        "
      >

        <h1
          className="
            text-[24px]
            font-medium
            tracking-[-0.48px]
            text-black
          "
        >
          Recovery Journey
        </h1>


        <button
          type="button"
          onClick={() =>
            onNavigate(
              'recoveryGuide'
            )
          }
          aria-label="리커버리 가이드 보기"
          className="
            relative
            flex
            h-[30px]
            w-[37px]
            flex-col
            items-center
            justify-start
          "
        >

          <img
            src={menuBookIcon}
            alt=""
            className="size-[30px]"
          />

          <span className="mt-[1px] whitespace-nowrap text-[8px] text-[#848991]">
            가이드 보기
          </span>

        </button>

      </header>


      {/* =========================
          DAY / WEEK
      ========================= */}
      <div
        className="
          mx-auto
          mt-[22px]
          flex
          h-[30px]
          w-[360px]
          rounded-[20px]
          bg-[#F6F8FF]
        "
      >

        <button
          type="button"
          className="
            w-1/2
            rounded-[20px]
            bg-[#809CFF]
            text-[16px]
            font-medium
            text-white
          "
        >
          Day
        </button>


        <button
          type="button"
          onClick={() =>
            setIsWeekView(true)
          }
          className="
            w-1/2
            rounded-[20px]
            text-[16px]
            font-medium
            text-[#809CFF]
          "
        >
          Week
        </button>

      </div>


      {/* =========================
          CALENDAR
      ========================= */}
      <section
        className="
          relative
          mx-auto
          mt-[22px]
          h-[120px]
          w-[360px]
          rounded-[20px]
          bg-white
          px-[28px]
          pt-[17px]
        "
      >

        <p
          className="
            text-[12px]
            font-medium
            tracking-[-0.4px]
            text-[#121212]
          "
        >
          {weekDates[0].getMonth() + 1}월
        </p>


        {/* 이전 주 */}
        <button
          type="button"
          aria-label="이전 주"
          onClick={() =>
            setWeekOffset(
              (offset) =>
                offset - 1
            )
          }
          className="
            absolute
            left-[8px]
            top-[53px]
            flex
            size-[15px]
            items-center
            justify-center
            text-[17px]
            text-[#121212]
          "
        >
          ‹
        </button>


        {/* 다음 주 */}
        <button
          type="button"
          aria-label="다음 주"
          onClick={() =>
            setWeekOffset(
              (offset) =>
                offset + 1
            )
          }
          className="
            absolute
            right-[8px]
            top-[53px]
            flex
            size-[15px]
            items-center
            justify-center
            text-[17px]
            text-[#121212]
          "
        >
          ›
        </button>


        <div
          className="
            mt-[10px]
            flex
            gap-[10px]
          "
        >

          {weekDates.map(
            (date, index) => {

              const selected =
                index ===
                selectedDayIndex;


              const isToday =
                date.getTime() ===
                today.getTime();


              return (
                <button
                  key={
                    date.toISOString()
                  }
                  type="button"
                  onClick={() =>
                    setSelectedDayIndex(
                      index
                    )
                  }
                  className="
                    flex
                    w-[35px]
                    flex-col
                    items-center
                    gap-[12px]
                  "
                >

                  <span
                    className={`
                      flex
                      size-[35px]
                      items-center
                      justify-center
                      rounded-full
                      text-[20px]
                      font-medium

                      ${
                        selected
                          ? 'bg-[#809CFF] text-white'
                          : 'text-[#121212]'
                      }
                    `}
                  >
                    {date.getDate()}
                  </span>


                  <span
                    className={`
                      text-[12px]
                      font-medium

                      ${
                        selected
                          ? 'text-[#809CFF]'
                          : 'text-[#121212]'
                      }
                    `}
                  >
                    {isToday
                      ? '오늘'
                      : weekdays[index]}
                  </span>

                </button>
              );
            }
          )}

        </div>

      </section>


      {/* =========================
          기록 다시 보기
      ========================= */}
      <div
        className="
          mx-[21px]
          mt-[20px]
        "
      >

        <h2
          className="
            text-[20px]
            font-medium
            tracking-[-0.4px]
            text-black
          "
        >
          기록 다시 보기
        </h2>

      </div>


      {/* =========================
          분석 카드
      ========================= */}
      <section
        className="
          mx-auto
          mt-[20px]
          flex
          h-[80px]
          w-[360px]
          items-center
          gap-[12px]
          rounded-[20px]
          bg-[#F6F8FF]
          px-[15px]
        "
      >

        <img
          src={analysisIcon}
          alt=""
          className="size-[35px]"
        />


        <p
          className="
            text-[12px]
            font-medium
            tracking-[-0.4px]
            text-[#809CFF]
          "
        >
          {dateLabel}의 분석
        </p>

      </section>


      {/* =========================
          Folder Stack
      ========================= */}
      <section
        className="
          relative
          mx-auto
          mt-[38px]
          h-[430px]
          w-[323px]
        "
        aria-label="산모 기록 다시 보기"
      >

        {/* 폴더 배경 + 오른쪽 탭 */}
        {recordCards.map(
          (card) => (
            <div
              key={card.title}
              className={`
                pointer-events-none
                absolute
                left-0
                h-[328px]
                w-full
                rounded-[20px]
                shadow-[0_4px_4px_rgba(0,0,0,0.25)]

                ${card.top}
                ${card.background}
              `}
            >

              {/* 각각의 새 SVG 적용 */}
              <img
                src={card.flap}
                alt=""
                className="
                  absolute
                  -top-[18px]
                  right-[22px]
                  h-[18px]
                  w-[70px]
                "
              />

            </div>
          )
        )}

        {recordCards.map((card) => (
          <button
            key={`${card.id}-action`}
            type="button"
            onClick={() => setSelectedRecordId(card.id)}
            aria-label={`산모의 ${card.title} 기록 보기`}
            className={`
              absolute
              left-0
              z-20
              w-full
              ${card.id === 'pain' ? 'h-[60px]' : card.id === 'mood-sleep' ? 'top-[160px] h-[321px]' : 'h-[53px]'}
              ${card.id === 'mood-sleep' ? '' : card.top}
            `}
          />
        ))}


        {/* 폴더 제목 */}
        {recordCards.map(
          (card) => (
            <span
              key={`${card.title}-label`}
              className={`
                pointer-events-none
                absolute
                left-[29px]
                z-10
                text-[20px]
                font-medium
                leading-[30px]
                tracking-[-0.4px]
                text-white

                ${card.titleTop}
              `}
            >
              {card.title}
            </span>
          )
        )}

      </section>


      {/* =========================
          Bottom Navigation
      ========================= */}
      <div
        className="
          fixed
          bottom-[22px]
          left-1/2
          z-50
          -translate-x-1/2
        "
      >

        <BottomNavigation
          activeKey="journey"
          items={navigationItems}
          onChange={onNavigate}
          activeBgClass="bg-[#809CFF]"
          activeIconClass="text-[#F6F8FF]"
          activeBgClass="bg-[#809CFF]"
          activeIconClass="text-[#F6F8FF]"
        />

      </div>

    </main>
  );
};


export default JourneyPage;
