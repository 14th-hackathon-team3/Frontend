import { useEffect, useState } from 'react';
import { careApi } from '../../../api/care';
import BottomNavigation from '../../../components/BottomNavigation';
import backButton from '../../../assets/back_button.svg';
import menuBookIcon from '../../../assets/recoveryjourney_menu_book.svg';
import analysisIcon from '../../../assets/Todo_star.svg';
import folderFlap from '../../../assets/Record_folder_flap.svg';
import activityFolderFlap from '../../../assets/Record_folder_activity_flap.svg';
import hiddenInfoIcon from '../../../assets/hidden_info.png';

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'record', label: '기록' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '할 일' },
  { key: 'mypage', label: '마이페이지' },
];

const recordCards = [
  {
    id: 'activity',
    title: '활동량/메모',
    top: 'top-0',
    titleTop: 'top-6',
    background: 'bg-primary/10',
    flap: activityFolderFlap,
    tabOpacity: 'opacity-100',
  },
  {
    id: 'skin',
    title: '피부/모발',
    top: 'top-[50px]',
    titleTop: 'top-[74px]',
    background: 'bg-primary/40',
    tabOpacity: 'opacity-40',
  },
  {
    id: 'pain',
    title: '통증/수유',
    top: 'top-[100px]',
    titleTop: 'top-[124px]',
    background: 'bg-primary/60',
    tabOpacity: 'opacity-60',
  },
  {
    id: 'mood-sleep',
    title: '감정/수면',
    top: 'top-[153px]',
    titleTop: 'top-[177px]',
    background: 'bg-primary',
    tabOpacity: 'opacity-100',
  },
];

const emotionLabels = {
  happy: '행복한',
  angry: '화남',
  low_energy: '에너지부족',
  sad: '슬픈',
  depressed: '우울한',
  confused: '혼란스러운',
  calm: '차분한',
  moody: '변덕스러운',
  irritated: '짜증나는',
  worried: '걱정스러운',
  active: '활동적인',
};

const emotionEmoji = {
  happy: '🙂',
  angry: '😠',
  low_energy: '😮‍💨',
  sad: '😢',
  depressed: '😞',
  confused: '😕',
  calm: '🙂',
  moody: '😐',
  irritated: '😣',
  worried: '😟',
  active: '😄',
};

const feedingLabels = {
  breast: '모유',
  formula: '분유',
  mixed: '혼합',
};

const hairLabels = {
  same: '평소와 같음',
  slight: '약간 빠짐',
  heavy: '많이 빠짐',
};

const skinLabels = {
  1: '매우 좋음',
  2: '좋음',
  3: '약간의 트러블',
  4: '트러블 심함',
};

const toDateKey = (date) =>
  date.toLocaleDateString('en-CA');

const formatRecordDate = (dateKey) => {
  const [year, month, day] = dateKey
    .split('-')
    .map(Number);

  return `${year}년 ${month}월 ${day}일`;
};

const formatHours = (hours) => {
  if (hours == null || hours === '') {
    return '기록 없음';
  }

  const numberHours = Number(hours);

  if (Number.isNaN(numberHours)) {
    return String(hours);
  }

  const totalMinutes = Math.round(numberHours * 60);

  return `${Math.floor(totalMinutes / 60)}시간 ${
    totalMinutes % 60
  }분`;
};

const splitExercise = (exercise) => {
  const value =
    typeof exercise === 'string'
      ? exercise.trim()
      : '';

  const [type = '', duration = ''] =
    value.split(' / ');

  if (duration) {
    return {
      type,
      duration,
    };
  }

  if (/^\d+시간 \d+분$/.test(type)) {
    return {
      type: '',
      duration: type,
    };
  }

  return {
    type,
    duration: '',
  };
};

const normalizeArray = (value) => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

/*
 * ==========================================
 * 오늘의 AI 분석
 * ==========================================
 *
 * GET /api/care/journey/today-analysis/
 *
 * {
 *   has_plan: true,
 *   ai_summary: "...",
 *   bottleneck: "...",
 *   reasoning: "...",
 *   tomorrow_goal: "..."
 * }
 */

const getTodayAnalysisText = (data) => {
  if (!data || typeof data !== 'object') {
    return '';
  }

  if (data.has_plan === false) {
    return '';
  }

  return typeof data.ai_summary === 'string'
    ? data.ai_summary.trim()
    : '';
};

/*
 * ==========================================
 * Week Trend 유틸
 * ==========================================
 */

const formatWeekday = (dateKey) => {
  if (!dateKey) {
    return '';
  }

  const date = new Date(`${dateKey}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const weekdays = [
    '일',
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
  ];

  return weekdays[date.getDay()];
};

const getLatestNumber = (values) => {
  if (!Array.isArray(values)) {
    return null;
  }

  for (
    let index = values.length - 1;
    index >= 0;
    index -= 1
  ) {
    const value = values[index];

    if (
      value != null &&
      Number.isFinite(Number(value))
    ) {
      return Number(value);
    }
  }

  return null;
};

/*
 * 실제 숫자를 그래프의 y 좌표로 변환
 *
 * 그래프 높이: 약 64px
 * 실제 점은 10 ~ 56px 범위 사용
 */
const toChartPoints = (
  values,
  {
    min = null,
    max = null,
  } = {},
) => {
  if (
    !Array.isArray(values) ||
    values.length === 0
  ) {
    return [];
  }

  const numericValues = values
    .filter(
      (value) =>
        value != null &&
        Number.isFinite(Number(value)),
    )
    .map(Number);

  if (numericValues.length === 0) {
    return values.map(() => null);
  }

  let resolvedMin =
    min ?? Math.min(...numericValues);

  let resolvedMax =
    max ?? Math.max(...numericValues);

  /*
   * 모든 값이 같은 경우 그래프가 한쪽에 붙지 않도록 보정
   */
  if (resolvedMin === resolvedMax) {
    resolvedMin -= 1;
    resolvedMax += 1;
  }

  const range =
    resolvedMax - resolvedMin;

  return values.map((value) => {
    if (
      value == null ||
      !Number.isFinite(Number(value))
    ) {
      return null;
    }

    const normalized =
      (Number(value) - resolvedMin) /
      range;

    /*
     * 값이 클수록 위쪽
     */
    return 56 - normalized * 44;
  });
};

const getBannerTone = (banner) => {
  if (!banner) {
    return 'neutral';
  }

  const recent =
    Number(banner.recent_avg);

  const previous =
    Number(banner.prev_avg);

  if (
    !Number.isFinite(recent) ||
    !Number.isFinite(previous)
  ) {
    return 'neutral';
  }

  /*
   * 수면 감소 → warning
   * 수면 증가 → positive
   */
  if (banner.type === 'sleep') {
    return recent < previous
      ? 'danger'
      : 'success';
  }

  /*
   * 통증 증가 → warning
   * 통증 감소 → positive
   */
  if (banner.type === 'pain') {
    return recent > previous
      ? 'danger'
      : 'success';
  }

  return 'neutral';
};

const getBannerClasses = (tone) => {
  if (tone === 'danger') {
    return {
      badge:
        'bg-[#fff1f1] text-[#ff5f5f]',
      value:
        'text-[#ff5f5f]',
      card:
        'bg-[#fff5ff]',
      title:
        'text-[#ff5f5f]',
    };
  }

  if (tone === 'success') {
    return {
      badge:
        'bg-[#effbf4] text-[#53c690]',
      value:
        'text-[#53c690]',
      card:
        'bg-[#effbf4]',
      title:
        'text-[#53c690]',
    };
  }

  return {
    badge:
      'bg-gray-100 text-gray-500',
    value:
      'text-gray-500',
    card:
      'bg-gray-50',
    title:
      'text-gray-700',
  };
};

/*
 * ==========================================
 * Day 기록 데이터 변환
 * ==========================================
 */

const createRecords = (log, dateKey) => {
  const date =
    formatRecordDate(dateKey);

  if (!log) {
    return {
      'mood-sleep': {
        title: '감정/수면',
        date,
        sections: [
          {
            label: '감정 상태',
            values: [],
          },
          {
            label: '수면 시간',
            text: '기록 없음',
          },
        ],
      },

      pain: {
        title: '통증/수유',
        date,
        sections: [
          {
            label: '골반저 증상',
            values: [],
          },
          {
            label: '증상 심화 정도',
            text: '기록 없음',
          },
          {
            label: '수유 방식',
            values: [],
          },
        ],
      },

      skin: {
        title: '피부/모발',
        date,
        sections: [
          {
            label: '피부 상태',
            text: '기록 없음',
          },
          {
            label: '피부 증상',
            values: [],
          },
          {
            label: '모발 상태',
            text: '기록 없음',
          },
        ],
      },

      activity: {
        title: '활동량/메모',
        date,
        sections: [
          {
            label: '활동량',
            text: '기록 없음',
          },
          {
            label: '활동 종류',
            text: '기록 없음',
          },
          {
            label: '자유 메모',
            text: '기록 없음',
          },
        ],
      },
    };
  }

  const exercise =
    splitExercise(log.exercise);

  return {
    'mood-sleep': {
      title: '감정/수면',
      date,
      sections: [
        {
          label: '감정 상태',
          values: log.emotion
            ? [
                emotionLabels[
                  log.emotion
                ] ?? log.emotion,
              ]
            : [],
        },
        {
          label: '수면 시간',
          text: formatHours(
            log.sleep_hours,
          ),
        },
      ],
    },

    pain: {
      title: '통증/수유',
      date,
      sections: [
        {
          label: '골반저 증상',
          values:
            normalizeArray(
              log.pelvic_floor_symptoms,
            ).length > 0
              ? normalizeArray(
                  log.pelvic_floor_symptoms,
                )
              : normalizeArray(
                  log.pain_area,
                ),
        },

        {
          label: '증상 심화 정도',
          text:
            log.pain_score == null
              ? '기록 없음'
              : `${log.pain_score}/5`,
        },

        {
          label: '수유 방식',
          values: log.breastfeeding
            ? [
                feedingLabels[
                  log.breastfeeding
                ] ??
                  log.breastfeeding,
              ]
            : [],
        },
      ],
    },

    skin: {
      title: '피부/모발',
      date,
      sections: [
        {
          label: '피부 상태',
          text:
            skinLabels[
              log.skin_self_score
            ] ??
            '기록 없음',
        },

        {
          label: '피부 증상',
          values:
            normalizeArray(
              log.skin_symptom_tags,
            ),
        },

        {
          label: '모발 상태',
          text:
            hairLabels[
              log.hair_loss_status
            ] ??
            '기록 없음',
        },
      ],
    },

    activity: {
      title: '활동량/메모',
      date,
      sections: [
        {
          label: '활동량',
          text:
            exercise.duration ||
            '기록 없음',
        },

        {
          label: '활동 종류',
          text:
            exercise.type ||
            '기록 없음',
        },

        {
          label: '자유 메모',
          text:
            log.memo ||
            '기록 없음',
        },
      ],
    },
  };
};

/*
 * ==========================================
 * 기록 상세
 * ==========================================
 */

const RecordHistoryPage = ({
  record,
  onBack,
}) => (
  <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light px-[31px] pt-[74px]">
    <header className="absolute inset-x-0 top-0 flex h-[74px] items-center justify-center border-b border-gray-200 bg-gray-50">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로 가기"
        className="absolute left-5 flex h-8 w-8 items-center justify-center"
      >
        <img
          src={backButton}
          alt=""
          className="h-[21px] w-[13px]"
        />
      </button>

      <h1 className="text-[20px] font-medium text-text-black">
        {record.title} 기록
      </h1>
    </header>

    <p className="pt-6 text-[16px] font-medium text-black/70">
      {record.date}
    </p>

    <section className="mt-6 rounded-[20px] bg-gray-50 p-6">
      {record.sections.map(
        (section, index) => (
          <div key={section.label}>
            {index > 0 && (
              <div className="my-7 border-t border-gray-200" />
            )}

            <h2 className="text-[20px] font-medium">
              {section.label}
            </h2>

            {section.values ? (
              section.values.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-[10px]">
                  {section.values.map(
                    (value) => (
                      <span
                        key={value}
                        className="rounded-[10px] bg-primary px-5 py-[10px] text-[16px] font-medium text-white"
                      >
                        {value}
                      </span>
                    ),
                  )}
                </div>
              ) : (
                <p className="mt-4 text-[18px] font-medium leading-7 text-primary">
                  기록 없음
                </p>
              )
            ) : (
              <p className="mt-4 text-[18px] font-medium leading-7 text-primary">
                {section.text}
              </p>
            )}
          </div>
        ),
      )}
    </section>
  </main>
);

const ActivityMemoHistoryPage = ({
  record,
  onBack,
}) => (
  <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light px-[27px] pb-10 pt-[102px]">
    <header className="absolute inset-x-0 top-0 flex h-[74px] items-center justify-center border-b border-[#dcdcdc] bg-gray-50">
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로 가기"
        className="absolute left-5 flex h-8 w-8 items-center justify-center"
      >
        <img
          src={backButton}
          alt=""
          className="h-[21px] w-[13px]"
        />
      </button>

      <h1 className="text-[20px] font-medium text-text-black">
        활동량/메모
      </h1>
    </header>

    <p className="mb-6 text-[16px] font-medium text-black/70">
      {record.date}
    </p>

    <section className="space-y-[30px]">
      {record.sections.map(
        (section, index) => (
          <div key={section.label}>
            {index > 0 && (
              <div className="mb-[30px] border-t border-gray-200" />
            )}

            <div className="space-y-[15px]">
              <h2 className="text-[20px] font-medium tracking-[-0.4px] text-text-black">
                {section.label}
              </h2>

              <div
                className={`${
                  section.label ===
                  '자유 메모'
                    ? 'min-h-[150px] py-[25px]'
                    : 'flex h-[51px] items-center'
                } rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] text-[#121212]`}
              >
                {section.text}
              </div>
            </div>
          </div>
        ),
      )}
    </section>
  </main>
);

/*
 * ==========================================
 * 비공개 설정
 * ==========================================
 */

const PrivacySelectionSheet = ({
  onClose,
}) => {
  const [
    selectedItems,
    setSelectedItems,
  ] = useState([]);

  const privateRecordItems = [
    '감정상태',
    '수면시간',
    '통증부위',
    '통증정도',
    '수유방식',
    '모유량',
    '모유시 통증',
    '피부상태',
    '피부증상',
    '모발상태',
    '활동량',
    '활동종류',
    '자유메모',
    '음성메모',
  ];

  const toggleItem = (item) => {
    setSelectedItems((items) =>
      items.includes(item)
        ? items.filter(
            (selected) =>
              selected !== item,
          )
        : [...items, item],
    );
  };

  return (
    <div className="fixed inset-0 z-30 mx-auto w-full max-w-[402px] bg-black/15">
      <button
        type="button"
        aria-label="비공개 항목 선택 닫기"
        onClick={onClose}
        className="absolute inset-0"
      />

      <section
        className="absolute inset-x-0 bottom-0 rounded-t-[22px] bg-gray-50 px-[35px] pb-[44px] pt-[46px]"
        aria-label="가족에게 비공개할 항목 선택"
      >
        <div className="mx-auto mb-[38px] h-[3px] w-[50px] rounded-full bg-gray-200" />

        <h2 className="text-center text-[20px] font-medium tracking-[-0.4px] text-text-black">
          가족에게 비공개할 항목 선택
        </h2>

        <div className="mt-[38px] grid grid-cols-3 gap-x-[9px] gap-y-[9px]">
          {privateRecordItems.map(
            (item) => {
              const selected =
                selectedItems.includes(
                  item,
                );

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    toggleItem(item)
                  }
                  className={`h-[36px] rounded-[10px] text-[15px] font-medium tracking-[-0.3px] ${
                    selected
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-text-black'
                  }`}
                >
                  {item}
                </button>
              );
            },
          )}
        </div>
      </section>
    </div>
  );
};

/*
 * ==========================================
 * Week 차트
 * ==========================================
 */

const TrendChart = ({
  color,
  points,
  labels,
  area = false,
}) => {
  const safePoints =
    Array.isArray(points)
      ? points
      : [];

  const safeLabels =
    Array.isArray(labels)
      ? labels
      : [];

  const chartWidth = 228;

  const gap =
    safePoints.length > 1
      ? chartWidth /
        (safePoints.length - 1)
      : 0;

  return (
    <div className="mt-3">
      <div className="relative h-[64px] w-[228px]">
        {safePoints
          .slice(0, -1)
          .map(
            (
              point,
              index,
            ) => {
              const nextPoint =
                safePoints[
                  index + 1
                ];

              /*
               * null 구간은 연결하지 않음
               */
              if (
                point == null ||
                nextPoint == null
              ) {
                return null;
              }

              const horizontal =
                gap;

              const vertical =
                nextPoint -
                point;

              const length =
                Math.sqrt(
                  horizontal ** 2 +
                    vertical ** 2,
                );

              const angle =
                Math.atan2(
                  vertical,
                  horizontal,
                ) *
                (180 / Math.PI);

              return (
                <span
                  key={`line-${index}`}
                  className="absolute h-[2px] origin-left"
                  style={{
                    left: `${
                      index *
                      gap
                    }px`,
                    top: `${point}px`,
                    width: `${length}px`,
                    backgroundColor:
                      color,
                    transform:
                      `rotate(${angle}deg)`,
                  }}
                />
              );
            },
          )}

        {area && (
          <span className="absolute inset-x-0 bottom-0 h-[36px] bg-gradient-to-t from-[#e6f7ee] to-transparent" />
        )}

        {safePoints.map(
          (
            point,
            index,
          ) => {
            if (
              point == null
            ) {
              return null;
            }

            return (
              <span
                key={`point-${index}`}
                className="absolute z-10 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-gray-50"
                style={{
                  left: `${
                    index *
                    gap
                  }px`,
                  top: `${point}px`,
                  borderColor:
                    color,
                }}
              />
            );
          },
        )}
      </div>

      <div className="flex w-[228px] justify-between text-[11px] text-gray-500">
        {safeLabels.map(
          (
            label,
            index,
          ) => (
            <span
              key={`${label}-${index}`}
            >
              {label || '-'}
            </span>
          ),
        )}
      </div>
    </div>
  );
};

const TrackingPrivacySheet = ({
  title,
  isPrivate,
  onClose,
  onConfirm,
}) => (
  <div className="fixed inset-0 z-30 mx-auto w-full max-w-[402px] bg-black/15">
    <button
      type="button"
      aria-label="트래킹 메뉴 닫기"
      onClick={onClose}
      className="absolute inset-0"
    />

    <section
      className="absolute inset-x-0 bottom-0 min-h-[237px] rounded-t-[22px] bg-gray-50 px-5 pt-[7px]"
      aria-label={`${title} 메뉴`}
    >
      <div className="mx-auto h-[3px] w-[40px] rounded-full bg-gray-200" />

      <h2 className="mt-[31px] text-center text-[20px] font-medium tracking-[-0.4px] text-text-black">
        {title} 트래킹
      </h2>

      <button
        type="button"
        onClick={() =>
          onConfirm(title)
        }
        className="mt-[56px] flex items-center gap-3 text-[16px] font-medium text-text-black"
      >
        <img
          src={hiddenInfoIcon}
          alt=""
          className="size-[24px]"
        />

        보호자에게 비공개{' '}
        {isPrivate
          ? '해제하기'
          : '하기'}
      </button>
    </section>
  </div>
);

/*
 * ==========================================
 * WEEK PAGE
 * ==========================================
 */

const WeeklyJourneyPage = ({
  onDay,
  onNavigate,
  privateCard,
  privateCards,
  onPrivateCard,
  onClosePrivate,
  onConfirmPrivate,

  weekTrend,
  isWeekTrendLoading,
  weekTrendError,
}) => {
  const dates =
    Array.isArray(
      weekTrend?.dates,
    )
      ? weekTrend.dates
      : [];

  const sleep =
    Array.isArray(
      weekTrend?.sleep,
    )
      ? weekTrend.sleep
      : [];

  const pain =
    Array.isArray(
      weekTrend?.pain,
    )
      ? weekTrend.pain
      : [];

  const emotion =
    Array.isArray(
      weekTrend?.emotion,
    )
      ? weekTrend.emotion
      : [];

  const banners =
    Array.isArray(
      weekTrend?.banners,
    )
      ? weekTrend.banners
      : [];

  /*
   * 실제 dates 값에서 요일 생성
   */
  const labels =
    dates.map(
      formatWeekday,
    );

  /*
   * sleep은 자체 최소/최대값으로 스케일링
   */
  const sleepPoints =
    toChartPoints(
      sleep,
    );

  /*
   * pain은 0~5 고정 스케일
   */
  const painPoints =
    toChartPoints(
      pain,
      {
        min: 0,
        max: 5,
      },
    );

  const hasSleepData =
    sleep.some(
      (value) =>
        value != null &&
        Number.isFinite(
          Number(value),
        ),
    );

  const hasPainData =
    pain.some(
      (value) =>
        value != null &&
        Number.isFinite(
          Number(value),
        ),
    );

  const latestSleep =
    getLatestNumber(
      sleep,
    );

  const latestPain =
    getLatestNumber(
      pain,
    );

  const sleepBanner =
    banners.find(
      (banner) =>
        banner.type ===
        'sleep',
    );

  const painBanner =
    banners.find(
      (banner) =>
        banner.type ===
        'pain',
    );

  const sleepTone =
    getBannerTone(
      sleepBanner,
    );

  const painTone =
    getBannerTone(
      painBanner,
    );

  const sleepClasses =
    getBannerClasses(
      sleepTone,
    );

  const painClasses =
    getBannerClasses(
      painTone,
    );

  /*
   * week-trend 응답에는
   * 별도의 AI summary가 없으므로
   * banner가 있으면 첫 배너 메시지를 보여줌
   */
  const weekSummary =
    isWeekTrendLoading
      ? '최근 7일 기록을 분석하는 중이에요.'
      : weekTrendError
        ? weekTrendError
        : banners.length > 0
          ? banners[0]
              .message
          : dates.length > 0
            ? '최근 7일 기록을 확인해보세요.'
            : '최근 7일 기록이 아직 없어요.';

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light pb-[122px] pt-[37px]">
      {/* Header */}

      <header className="flex items-end justify-between px-[21px]">
        <h1 className="text-[24px] font-medium tracking-[-0.48px] text-black">
          Recovery Journey
        </h1>

        <button
          type="button"
          onClick={() =>
            onNavigate(
              'recoveryGuide',
            )
          }
          aria-label="리커버리 가이드 보기"
        >
          <img
            src={menuBookIcon}
            alt=""
            className="h-[30px] w-[30px]"
          />
        </button>
      </header>

      {/* Day / Week */}

      <div className="mx-auto mt-[29px] flex h-[30px] w-[360px] rounded-[20px] bg-primary-background">
        <button
          type="button"
          onClick={onDay}
          className="w-1/2 rounded-[20px] text-[16px] font-medium tracking-[-0.8px] text-primary"
        >
          Day
        </button>

        <button
          type="button"
          className="w-1/2 rounded-[20px] bg-primary text-[16px] font-medium tracking-[-0.8px] text-white"
        >
          Week
        </button>
      </div>

      {/* Week 상단 분석 */}

      <section className="mx-auto mt-[27px] flex min-h-20 w-[360px] items-center gap-2 rounded-[20px] bg-primary-background px-[15px] py-[15px]">
        <img
          src={analysisIcon}
          alt=""
          className="h-[35px] w-[35px] shrink-0"
        />

        <p className="px-[15px] text-[12px] font-medium leading-5 text-primary">
          {weekSummary}
        </p>
      </section>

      <section className="mx-auto mt-[29px] w-[360px] space-y-[13px]">
        {/* ============================
            수면
            ============================ */}

        <article
          onClick={() =>
            onPrivateCard(
              '수면',
            )
          }
          className="cursor-pointer rounded-[20px] bg-gray-50 px-4 py-[16px]"
        >
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[18px] font-medium">
              {privateCards.includes(
                '수면',
              ) && (
                <img
                  src={
                    hiddenInfoIcon
                  }
                  alt="비공개"
                  className="size-[20px]"
                />
              )}

              수면
            </h2>

            <div className="flex items-center gap-2">
              {sleepBanner && (
                <span
                  className={`rounded-[13px] px-2 py-1 text-[12px] ${sleepClasses.badge}`}
                >
                  {
                    sleepBanner.message
                  }
                </span>
              )}

              <span
                className={`text-[16px] ${
                  sleepBanner
                    ? sleepClasses.value
                    : 'text-gray-600'
                }`}
              >
                {latestSleep ==
                null
                  ? '-'
                  : `${latestSleep}h`}
              </span>
            </div>
          </div>

          {isWeekTrendLoading ? (
            <p className="mt-5 text-[12px] text-gray-500">
              수면 기록을 불러오는
              중이에요.
            </p>
          ) : hasSleepData ? (
            <TrendChart
              color="#ff5f5f"
              points={
                sleepPoints
              }
              labels={labels}
            />
          ) : (
            <p className="mt-5 text-[12px] text-gray-500">
              표시할 수면 기록이
              없어요.
            </p>
          )}
        </article>

        {/* ============================
            통증
            ============================ */}

        <article
          onClick={() =>
            onPrivateCard(
              '통증',
            )
          }
          className="cursor-pointer rounded-[20px] bg-gray-50 px-4 py-[16px]"
        >
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[18px] font-medium">
              {privateCards.includes(
                '통증',
              ) && (
                <img
                  src={
                    hiddenInfoIcon
                  }
                  alt="비공개"
                  className="size-[20px]"
                />
              )}

              통증
            </h2>

            <div className="flex items-center gap-2">
              {painBanner && (
                <span
                  className={`rounded-[13px] px-2 py-1 text-[12px] ${painClasses.badge}`}
                >
                  {
                    painBanner.message
                  }
                </span>
              )}

              <span
                className={`text-[16px] ${
                  painBanner
                    ? painClasses.value
                    : 'text-gray-600'
                }`}
              >
                {latestPain ==
                null
                  ? '-'
                  : latestPain}
              </span>
            </div>
          </div>

          {isWeekTrendLoading ? (
            <p className="mt-5 text-[12px] text-gray-500">
              통증 기록을 불러오는
              중이에요.
            </p>
          ) : hasPainData ? (
            <TrendChart
              color="#53c690"
              area
              points={
                painPoints
              }
              labels={labels}
            />
          ) : (
            <p className="mt-5 text-[12px] text-gray-500">
              표시할 통증 기록이
              없어요.
            </p>
          )}
        </article>

        {/* ============================
            감정
            ============================ */}

        <article
          onClick={() =>
            onPrivateCard(
              '감정',
            )
          }
          className="cursor-pointer rounded-[20px] bg-gray-50 px-4 py-[16px]"
        >
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-[18px] font-medium">
              {privateCards.includes(
                '감정',
              ) && (
                <img
                  src={
                    hiddenInfoIcon
                  }
                  alt="비공개"
                  className="size-[20px]"
                />
              )}

              감정
            </h2>
          </div>

          {isWeekTrendLoading ? (
            <p className="mt-5 text-[12px] text-gray-500">
              감정 기록을 불러오는
              중이에요.
            </p>
          ) : emotion.length >
            0 ? (
            <>
              <div className="mt-[16px] flex justify-between px-[10px] text-[22px]">
                {emotion.map(
                  (
                    value,
                    index,
                  ) => (
                    <span
                      key={`emotion-${index}`}
                      title={
                        value
                          ? emotionLabels[
                              value
                            ] ??
                            value
                          : '기록 없음'
                      }
                    >
                      {value
                        ? emotionEmoji[
                            value
                          ] ??
                          '😐'
                        : '−'}
                    </span>
                  ),
                )}
              </div>

              <div className="mt-1 flex justify-between px-[9px] text-[11px] text-gray-500">
                {labels.map(
                  (
                    label,
                    index,
                  ) => (
                    <span
                      key={`emotion-label-${index}`}
                    >
                      {label ||
                        '-'}
                    </span>
                  ),
                )}
              </div>
            </>
          ) : (
            <p className="mt-5 text-[12px] text-gray-500">
              표시할 감정 기록이
              없어요.
            </p>
          )}
        </article>

        {/* ============================
            변화 / 위험 배너
            ============================ */}

        {!isWeekTrendLoading &&
          banners.map(
            (
              banner,
              index,
            ) => {
              const tone =
                getBannerTone(
                  banner,
                );

              const classes =
                getBannerClasses(
                  tone,
                );

              return (
                <article
                  key={`${banner.type}-${index}`}
                  className={`rounded-[20px] px-4 py-[16px] ${classes.card}`}
                >
                  <p
                    className={`text-[16px] font-medium ${classes.title}`}
                  >
                    {tone ===
                    'danger'
                      ? '⚠ '
                      : ''}
                    {
                      banner.message
                    }
                  </p>

                  {banner.recent_avg !=
                    null &&
                    banner.prev_avg !=
                      null && (
                      <p className="mt-3 text-[12px] text-gray-700">
                        최근 3일 평균{' '}
                        {
                          banner.recent_avg
                        }
                        {' · '}
                        직전 3일 평균{' '}
                        {
                          banner.prev_avg
                        }
                      </p>
                    )}
                </article>
              );
            },
          )}

        {!isWeekTrendLoading &&
          !weekTrendError &&
          dates.length > 0 &&
          banners.length ===
            0 && (
            <article className="rounded-[20px] bg-gray-50 px-4 py-[16px]">
              <p className="text-[14px] font-medium text-gray-600">
                최근 기록에서 뚜렷한
                수면·통증 변화가
                감지되지 않았어요.
              </p>
            </article>
          )}
      </section>

      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2">
        <BottomNavigation
          activeKey="journey"
          items={
            navigationItems
          }
          onChange={
            onNavigate
          }
        />
      </div>

      {privateCard && (
        <TrackingPrivacySheet
          title={
            privateCard
          }
          isPrivate={privateCards.includes(
            privateCard,
          )}
          onClose={
            onClosePrivate
          }
          onConfirm={
            onConfirmPrivate
          }
        />
      )}
    </main>
  );
};

/*
 * ==========================================
 * MAIN
 * ==========================================
 */

const JourneyPage = ({
  onNavigate = () => {},
}) => {
  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0,
  );

  const todayWeekday =
    (today.getDay() + 6) %
    7;

  const [
    selectedDayIndex,
    setSelectedDayIndex,
  ] = useState(
    todayWeekday,
  );

  const [
    weekOffset,
    setWeekOffset,
  ] = useState(0);

  const [
    view,
    setView,
  ] = useState(
    'journey',
  );

  const [
    isWeekView,
    setIsWeekView,
  ] = useState(false);

  const [
    privateCard,
    setPrivateCard,
  ] = useState(null);

  const [
    privateCards,
    setPrivateCards,
  ] = useState([]);

  /*
   * Day Log
   */

  const [
    selectedLog,
    setSelectedLog,
  ] = useState(null);

  const [
    isLogLoading,
    setIsLogLoading,
  ] = useState(true);

  const [
    logError,
    setLogError,
  ] = useState('');

  /*
   * 오늘 AI 분석
   */

  const [
    todayAnalysis,
    setTodayAnalysis,
  ] = useState('');

  const [
    isAnalysisLoading,
    setIsAnalysisLoading,
  ] = useState(true);

  const [
    analysisError,
    setAnalysisError,
  ] = useState('');

  /*
   * Week Trend
   */

  const [
    weekTrend,
    setWeekTrend,
  ] = useState(null);

  const [
    isWeekTrendLoading,
    setIsWeekTrendLoading,
  ] = useState(false);

  const [
    weekTrendError,
    setWeekTrendError,
  ] = useState('');

  const days = [
    '월',
    '화',
    '수',
    '목',
    '금',
    '토',
    '일',
  ];

  /*
   * ======================================
   * Day 날짜 계산
   * ======================================
   */

  const weekStart =
    new Date(today);

  weekStart.setDate(
    today.getDate() -
      todayWeekday +
      weekOffset * 7,
  );

  const weekDates =
    Array.from(
      {
        length: 7,
      },
      (_, index) => {
        const date =
          new Date(
            weekStart,
          );

        date.setDate(
          weekStart.getDate() +
            index,
        );

        return date;
      },
    );

  const selectedDate =
    weekDates[
      selectedDayIndex
    ];

  const selectedDateKey =
    toDateKey(
      selectedDate,
    );

  const isSelectedToday =
    selectedDate.getTime() ===
    today.getTime();

  const selectedDateLabel =
    isSelectedToday
      ? '오늘'
      : `${
          selectedDate.getMonth() +
          1
        }월 ${selectedDate.getDate()}일`;

  const selectedDay =
    selectedDayIndex + 1;

  const setSelectedDay = (
    day,
  ) => {
    setSelectedDayIndex(
      day - 1,
    );
  };

  const records =
    createRecords(
      selectedLog,
      selectedDateKey,
    );

  /*
   * ======================================
   * Daily Log
   * ======================================
   */

  useEffect(() => {
    let isActive = true;

    const fetchDailyLog =
      async () => {
        setIsLogLoading(
          true,
        );

        setLogError('');

        try {
          let log = null;

          if (
            isSelectedToday
          ) {
            const todayLog =
              await careApi.getTodayDailyLog();

            if (!isActive) {
              return;
            }

            log =
              todayLog ??
              null;
          } else {
            const response =
              await careApi.getDailyLogs();

            if (!isActive) {
              return;
            }

            const logs =
              Array.isArray(
                response,
              )
                ? response
                : Array.isArray(
                      response?.results,
                    )
                  ? response.results
                  : [];

            log =
              logs.find(
                (item) =>
                  item.log_date ===
                  selectedDateKey,
              ) ??
              null;
          }

          if (!isActive) {
            return;
          }

          setSelectedLog(
            log,
          );
        } catch (error) {
          if (!isActive) {
            return;
          }

          console.error(
            'Daily Log 조회 실패:',
            error,
          );

          const status =
            error
              ?.response
              ?.status ??
            error?.status;

          if (
            status ===
            404
          ) {
            setSelectedLog(
              null,
            );

            setLogError('');

            return;
          }

          setSelectedLog(
            null,
          );

          setLogError(
            error
              ?.response
              ?.data
              ?.detail ||
              error?.message ||
              '기록을 불러오지 못했습니다.',
          );
        } finally {
          if (isActive) {
            setIsLogLoading(
              false,
            );
          }
        }
      };

    fetchDailyLog();

    return () => {
      isActive = false;
    };
  }, [
    selectedDateKey,
    isSelectedToday,
  ]);

  /*
   * ======================================
   * 오늘의 AI 분석
   * ======================================
   */

  useEffect(() => {
    let isActive = true;

    const fetchTodayAnalysis =
      async () => {
        setIsAnalysisLoading(
          true,
        );

        setAnalysisError('');

        try {
          const data =
            await careApi.getTodayAnalysis();

          if (!isActive) {
            return;
          }

          setTodayAnalysis(
            getTodayAnalysisText(
              data,
            ),
          );
        } catch (error) {
          if (!isActive) {
            return;
          }

          console.error(
            '오늘의 AI 분석 조회 실패:',
            error,
          );

          const status =
            error
              ?.response
              ?.status ??
            error?.status;

          if (
            status ===
            404
          ) {
            setTodayAnalysis(
              '',
            );

            setAnalysisError(
              '',
            );

            return;
          }

          setTodayAnalysis(
            '',
          );

          setAnalysisError(
            error
              ?.response
              ?.data
              ?.detail ||
              error?.message ||
              '오늘의 분석을 불러오지 못했습니다.',
          );
        } finally {
          if (isActive) {
            setIsAnalysisLoading(
              false,
            );
          }
        }
      };

    fetchTodayAnalysis();

    return () => {
      isActive = false;
    };
  }, []);

  /*
   * ======================================
   * WEEK TREND
   *
   * GET /api/care/journey/week-trend/
   * ======================================
   */

  useEffect(() => {
    if (!isWeekView) {
      return undefined;
    }

    let isActive = true;

    const fetchWeekTrend =
      async () => {
        setIsWeekTrendLoading(
          true,
        );

        setWeekTrendError(
          '',
        );

        try {
          const data =
            await careApi.getWeekTrend();

          if (!isActive) {
            return;
          }

          setWeekTrend(
            data ?? null,
          );
        } catch (error) {
          if (!isActive) {
            return;
          }

          console.error(
            'Week Trend 조회 실패:',
            error,
          );

          setWeekTrend(
            null,
          );

          setWeekTrendError(
            error
              ?.response
              ?.data
              ?.detail ||
              error?.message ||
              '최근 7일 기록을 불러오지 못했습니다.',
          );
        } finally {
          if (isActive) {
            setIsWeekTrendLoading(
              false,
            );
          }
        }
      };

    fetchWeekTrend();

    return () => {
      isActive = false;
    };
  }, [
    isWeekView,
  ]);

  /*
   * ======================================
   * 상세 화면
   * ======================================
   */

  if (
    view ===
    'activity'
  ) {
    return (
      <ActivityMemoHistoryPage
        record={
          records.activity
        }
        onBack={() =>
          setView(
            'journey',
          )
        }
      />
    );
  }

  if (
    view !==
      'journey' &&
    view !==
      'privacy'
  ) {
    return (
      <RecordHistoryPage
        record={
          records[view]
        }
        onBack={() =>
          setView(
            'journey',
          )
        }
      />
    );
  }

  /*
   * ======================================
   * WEEK
   * ======================================
   */

  if (isWeekView) {
    return (
      <WeeklyJourneyPage
        onDay={() =>
          setIsWeekView(
            false,
          )
        }
        onNavigate={
          onNavigate
        }
        privateCard={
          privateCard
        }
        privateCards={
          privateCards
        }
        onPrivateCard={
          setPrivateCard
        }
        onClosePrivate={() =>
          setPrivateCard(
            null,
          )
        }
        weekTrend={
          weekTrend
        }
        isWeekTrendLoading={
          isWeekTrendLoading
        }
        weekTrendError={
          weekTrendError
        }
        onConfirmPrivate={(
          card,
        ) => {
          setPrivateCards(
            (cards) =>
              cards.includes(
                card,
              )
                ? cards.filter(
                    (
                      privateItem,
                    ) =>
                      privateItem !==
                      card,
                  )
                : [
                    ...cards,
                    card,
                  ],
          );

          setPrivateCard(
            null,
          );
        }}
      />
    );
  }

  /*
   * ======================================
   * DAY
   * ======================================
   */

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[120px]">
      {/* Header */}

      <header className="flex items-end justify-between px-[21px] pt-[37px]">
        <h1 className="text-[24px] font-medium tracking-[-0.48px] text-black">
          Recovery Journey
        </h1>

        <button
          type="button"
          onClick={() =>
            onNavigate(
              'recoveryGuide',
            )
          }
          aria-label="리커버리 가이드 보기"
        >
          <img
            src={menuBookIcon}
            alt=""
            className="h-[30px] w-[30px]"
          />
        </button>
      </header>

      {/* Day / Week */}

      <div className="mx-auto mt-[29px] flex h-[30px] w-[360px] rounded-[20px] bg-primary-background p-0">
        <button
          type="button"
          className="w-1/2 rounded-[20px] bg-primary text-[16px] font-medium tracking-[-0.8px] text-white"
        >
          Day
        </button>

        <button
          type="button"
          onClick={() =>
            setIsWeekView(
              true,
            )
          }
          className="w-1/2 text-[16px] font-medium tracking-[-0.8px] text-primary"
        >
          Week
        </button>
      </div>

      {/* 기존 레이아웃 위치 유지용 */}

      <section className="invisible relative mx-auto mt-[22px] h-[120px] w-[360px] rounded-[20px] bg-gray-50 px-[28px] pt-[17px]">
        <p className="text-[12px] font-medium tracking-[-0.6px]">
          6월
        </p>

        <button
          type="button"
          aria-label="이전 주"
          className="absolute left-2 top-[54px] text-[22px] text-[#121212]"
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="다음 주"
          className="absolute right-2 top-[54px] text-[22px] text-[#121212]"
        >
          ›
        </button>

        <div className="mt-[10px] flex justify-between">
          {days.map(
            (
              day,
              index,
            ) => {
              const number =
                index + 1;

              const selected =
                number ===
                selectedDay;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    setSelectedDay(
                      number,
                    )
                  }
                  className="flex w-[35px] flex-col items-center gap-3"
                >
                  <span
                    className={`flex size-[35px] items-center justify-center rounded-full text-[20px] font-medium tracking-[-1px] ${
                      selected
                        ? 'bg-primary text-white'
                        : 'text-[#121212]'
                    }`}
                  >
                    {number}
                  </span>

                  <span
                    className={`text-[12px] font-medium tracking-[-0.6px] ${
                      selected
                        ? 'text-primary'
                        : 'text-[#121212]'
                    }`}
                  >
                    {day}
                  </span>
                </button>
              );
            },
          )}
        </div>
      </section>

      {/* 실제 날짜 선택 */}

      <section className="relative z-10 mx-auto -mt-[120px] h-[120px] w-[360px] rounded-[20px] bg-gray-50 px-[28px] pt-[17px]">
        <p className="text-[12px] font-medium tracking-[-0.6px]">
          {weekDates[
            0
          ].getMonth() + 1}
          월
        </p>

        <button
          type="button"
          aria-label="이전 주"
          onClick={() =>
            setWeekOffset(
              (offset) =>
                offset - 1,
            )
          }
          className="absolute left-2 top-[54px] text-[22px] text-[#121212]"
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="다음 주"
          onClick={() =>
            setWeekOffset(
              (offset) =>
                offset + 1,
            )
          }
          className="absolute right-2 top-[54px] text-[22px] text-[#121212]"
        >
          ›
        </button>

        <div className="mt-[10px] flex justify-between">
          {weekDates.map(
            (
              date,
              index,
            ) => {
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
                      index,
                    )
                  }
                  className="flex w-[35px] flex-col items-center gap-3"
                >
                  <span
                    className={`flex size-[35px] items-center justify-center rounded-full text-[20px] font-medium tracking-[-1px] ${
                      selected
                        ? 'bg-primary text-white'
                        : 'text-[#121212]'
                    }`}
                  >
                    {date.getDate()}
                  </span>

                  <span
                    className={`text-[12px] font-medium tracking-[-0.6px] ${
                      selected
                        ? 'text-primary'
                        : 'text-[#121212]'
                    }`}
                  >
                    {isToday
                      ? '오늘'
                      : days[
                          index
                        ]}
                  </span>
                </button>
              );
            },
          )}
        </div>
      </section>

      {/* ======================================
          오늘의 AI 분석
          ====================================== */}

      <section className="mx-auto mt-[69px] flex min-h-20 w-[360px] items-center gap-2 rounded-[20px] bg-primary-background px-[15px] py-[15px]">
        <img
          src={analysisIcon}
          alt=""
          className="h-[35px] w-[35px] shrink-0"
        />

        <p className="px-[15px] text-[12px] font-medium leading-5 tracking-[-0.6px] text-primary">
          {isSelectedToday
            ? isAnalysisLoading
              ? '오늘의 분석을 불러오는 중이에요.'
              : analysisError
                ? analysisError
                : todayAnalysis ||
                  (isLogLoading
                    ? '오늘의 기록을 불러오는 중이에요.'
                    : logError
                      ? logError
                      : selectedLog
                        ? '오늘의 기록을 확인해보세요.'
                        : '오늘은 아직 기록이 없어요.')
            : isLogLoading
              ? '기록을 불러오는 중이에요.'
              : logError
                ? logError
                : selectedLog
                  ? `${selectedDateLabel}의 기록을 확인해보세요.`
                  : `${selectedDateLabel}에는 아직 기록이 없어요.`}
        </p>
      </section>

      {/* 기록 다시 보기 */}

      <div className="mx-[21px] mt-[19px] flex items-center justify-between">
        <h2 className="text-[20px] font-medium tracking-[-0.4px]">
          기록 다시 보기
        </h2>

        <button
          type="button"
          aria-label="비공개 항목 선택"
          onClick={() =>
            setView(
              'privacy',
            )
          }
          className="flex size-[30px] items-center justify-center"
        >
          <img
            src={hiddenInfoIcon}
            alt=""
            className="size-[30px]"
          />
        </button>
      </div>

      {/* 기록 카드 */}

      <section
        className="relative mx-[40px] mt-[47px] h-[481px]"
        aria-label="기록 다시 보기"
      >
        {recordCards.map(
          (card) => (
            <div
              key={card.id}
              className={`pointer-events-none absolute left-0 h-[328px] w-full rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${card.top} ${card.background}`}
            >
              <img
                src={
                  card.flap ??
                  folderFlap
                }
                alt=""
                className={`absolute -top-[18px] right-[22px] h-[18px] w-[70px] ${card.tabOpacity}`}
              />
            </div>
          ),
        )}

        {recordCards.map(
          (card) => (
            <button
              key={`${card.id}-action`}
              type="button"
              onClick={() =>
                setView(
                  card.id,
                )
              }
              aria-label={`${card.title} 기록 보기`}
              className={`absolute left-0 z-20 w-full ${
                card.id ===
                'pain'
                  ? 'h-[60px]'
                  : card.id ===
                      'mood-sleep'
                    ? 'top-[160px] h-[321px]'
                    : 'h-[53px]'
              } ${
                card.id ===
                'mood-sleep'
                  ? ''
                  : card.top
              }`}
            />
          ),
        )}

        {recordCards.map(
          (card) => (
            <span
              key={`${card.id}-label`}
              className={`pointer-events-none absolute left-[29px] z-10 ${card.titleTop} text-[20px] font-medium leading-[30px] tracking-[-0.4px] text-white`}
            >
              {card.title}
            </span>
          ),
        )}
      </section>

      {/* Bottom Navigation */}

      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2">
        <BottomNavigation
          activeKey="journey"
          items={
            navigationItems
          }
          onChange={
            onNavigate
          }
        />
      </div>

      {view ===
        'privacy' && (
        <PrivacySelectionSheet
          onClose={() =>
            setView(
              'journey',
            )
          }
        />
      )}
    </main>
  );
};

export default JourneyPage;