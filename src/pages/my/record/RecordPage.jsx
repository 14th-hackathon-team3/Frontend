import { useEffect, useState } from 'react';
import { careApi } from '../../../api/care';
import BottomNavigation from '../../../components/BottomNavigation';

import infoIcon from '../../../assets/Record_info.png';
import micIcon from '../../../assets/Record_mic.svg';
import folderFlap from '../../../assets/Record_folder_flap.svg';
import activityFolderFlap from '../../../assets/Record_folder_activity_flap.svg';

import RecordingPage from './RecordingPage';
import MoodSleepRecordPage from './MoodSleepRecordPage';
import PelvicFeedingRecordPage from './PelvicFeedingRecordPage';
import SkinHairRecordPage from './SkinHairRecordPage';
import ActivityMemoRecordPage from './ActivityMemoRecordPage';

const navigationItems = [
  {
    key: 'journey',
    label: '회복 여정',
  },
  {
    key: 'record',
    label: '기록',
  },
  {
    key: 'home',
    label: '홈',
  },
  {
    key: 'todo',
    label: '할 일',
  },
  {
    key: 'mypage',
    label: '마이페이지',
  },
];

const recordCards = [
  {
    id: 'activity-memo',
    title: '활동량/메모',
    top: 'top-0',
    titleTop: 'top-6',
    background: 'bg-primary/10',
    flap: activityFolderFlap,
    tabOpacity: 'opacity-100',
  },
  {
    id: 'skin-hair',
    title: '피부/모발',
    top: 'top-[50px]',
    titleTop: 'top-[74px]',
    background: 'bg-primary/40',
    tabOpacity: 'opacity-40',
  },
  {
    id: 'pain-feeding',
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

const emotionValues = {
  행복한: 'happy',
  화남: 'angry',
  에너지부족: 'low_energy',
  슬픈: 'sad',
  우울한: 'depressed',
  혼란스러운: 'confused',
  차분한: 'calm',
  변덕스러운: 'moody',
  짜증나는: 'irritated',
  걱정스러운: 'worried',
  활동적인: 'active',
};

const feedingValues = {
  모유: 'breast',
  분유: 'formula',
  혼합: 'mixed',
};

const hairValues = {
  '평소와 같음': 'same',
  '약간 빠짐': 'slight',
  '많이 빠짐': 'heavy',
};

/**
 * API에 전달할 YYYY-MM-DD
 */
const toDateInput = (date) => {
  return date.toLocaleDateString('en-CA');
};

/**
 * 화면 표시용 날짜
 * ex) 8월 21일
 */
const formatDisplayDate = (date) => {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

/**
 * 오늘 날짜 생성
 * 시간은 00:00:00으로 맞춤
 */
const createToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  return date;
};

const RecordPage = ({
  onNavigate = () => {},
}) => {
  const [screen, setScreen] =
    useState('main');

  /**
   * 현재 오늘
   */
  const [today, setToday] =
    useState(createToday);

  /**
   * 오늘 DailyLog ID
   */
  const [dailyLogId, setDailyLogId] =
    useState(null);

  /**
   * 기록 작성 중 임시 데이터
   */
  const [draft, setDraft] =
    useState({});

  /**
   * 오늘 기록 조회
   */
  const loadTodayDailyLog = async () => {
    try {
      const log =
        await careApi.getTodayDailyLog();

      setDailyLogId(
        log?.id ?? null,
      );

      return log;
    } catch (error) {
      /**
       * 오늘 기록이 아직 없으면 null
       */
      setDailyLogId(null);

      return null;
    }
  };

  /**
   * 최초 진입 + 자정 날짜 변경 감지
   */
  useEffect(() => {
    let isActive = true;

    const loadToday = async () => {
      try {
        const log =
          await careApi.getTodayDailyLog();

        if (!isActive) return;

        setDailyLogId(
          log?.id ?? null,
        );
      } catch {
        if (!isActive) return;

        setDailyLogId(null);
      }
    };

    /**
     * 최초 페이지 진입
     */
    loadToday();

    /**
     * 현재 날짜 기억
     */
    let currentDate =
      new Date().toDateString();

    /**
     * 1분마다 날짜 변경 확인
     */
    const interval =
      setInterval(() => {
        const now =
          new Date();

        const newDate =
          now.toDateString();

        if (
          newDate !==
          currentDate
        ) {
          currentDate =
            newDate;

          const newToday =
            new Date(now);

          newToday.setHours(
            0,
            0,
            0,
            0,
          );

          /**
           * 오늘 날짜 갱신
           */
          setToday(
            newToday,
          );

          /**
           * 어제 DailyLog ID 제거
           *
           * DB 삭제가 아니라
           * 프론트 state만 초기화
           */
          setDailyLogId(
            null,
          );

          /**
           * 작성 중이던 어제 draft 제거
           */
          setDraft({});

          /**
           * 작성 화면이 열려 있으면
           * 메인으로 이동
           */
          setScreen(
            'main',
          );

          /**
           * 새 날짜 DailyLog 조회
           */
          loadToday();
        }
      }, 60 * 1000);

    return () => {
      isActive = false;

      clearInterval(
        interval,
      );
    };
  }, []);

  /**
   * 각 기록 화면에서 입력한 값을
   * 임시로 합친다.
   */
  const updateDraft = (
    values,
    nextScreen,
  ) => {
    setDraft(
      (current) => ({
        ...current,
        ...values,
      }),
    );

    setScreen(
      nextScreen,
    );
  };

  /**
   * DailyLog 저장
   */
  const saveDailyLog =
    async (
      activityValues,
    ) => {
      const values = {
        ...draft,
        ...activityValues,
      };

      /**
       * 중요:
       *
       * PATCH에는 log_date를 넣지 않는다.
       * POST할 때만 log_date를 추가한다.
       */
      const payload = {};

      /**
       * 감정
       */
      if (
        values.emotion &&
        emotionValues[
          values.emotion
        ]
      ) {
        payload.emotion =
          emotionValues[
            values.emotion
          ];
      }

      /**
       * 수면
       *
       * toFixed는 문자열을 반환하므로
       * Number로 숫자 변환
       */
      if (
        values.sleepTime
      ) {
        payload.sleep_hours =
          Number(
            (
              values.sleepTime.hour +
              values.sleepTime.minute /
                60
            ).toFixed(1),
          );
      }

      /**
       * 통증 / 골반저 증상
       */
      if (
        values.pelvicSymptom &&
        values.pelvicSymptom !==
          '없음'
      ) {
        payload.pain_area =
          values.pelvicSymptom;

        payload.pelvic_floor_symptoms =
          [
            values.pelvicSymptom,
          ];
      } else if (
        values.pelvicSymptom ===
        '없음'
      ) {
        payload.pelvic_floor_symptoms =
          [];
      }

      /**
       * 통증 강도
       *
       * 0도 정상 값으로 처리 가능하게
       * truthy 체크 사용하지 않음
       */
      if (
        values.severity !==
          undefined &&
        values.severity !==
          null &&
        values.severity !==
          ''
      ) {
        payload.pain_score =
          Number(
            values.severity,
          );
      }

      /**
       * 수유
       */
      if (
        values.feedingMethod &&
        feedingValues[
          values.feedingMethod
        ]
      ) {
        payload.breastfeeding =
          feedingValues[
            values.feedingMethod
          ];
      }

      /**
       * 피부 점수
       */
      if (
        values.skinLevel !==
          undefined &&
        values.skinLevel !==
          null &&
        values.skinLevel !==
          ''
      ) {
        payload.skin_self_score =
          Number(
            values.skinLevel,
          );
      }

      /**
       * 피부 증상
       */
      if (
        values.selectedSymptoms
      ) {
        payload.skin_symptom_tags =
          values.selectedSymptoms.includes(
            '해당 없음',
          )
            ? []
            : values.selectedSymptoms;
      }

      /**
       * 모발
       */
      if (
        values.hairState &&
        hairValues[
          values.hairState
        ]
      ) {
        payload.hair_loss_status =
          hairValues[
            values.hairState
          ];
      }

      /**
       * 활동 시간
       */
      const duration =
        values.activityTime
          ? `${values.activityTime.hour}시간 ${values.activityTime.minute}분`
          : '';

      payload.exercise = [
        values.activityType,
        duration,
      ]
        .filter(Boolean)
        .join(' / ');

      /**
       * 자유 메모
       */
      payload.memo =
        values.memo ?? '';

      try {
        /**
         * ======================================
         * 저장 직전에 서버에서
         * "진짜 오늘 DailyLog"를 다시 확인
         * ======================================
         *
         * 이전 날짜의 dailyLogId가
         * state에 남아 있더라도
         * 그 ID를 그대로 PATCH하지 않는다.
         */

        let todayLogId = null;

        try {
          const todayLog =
            await careApi
              .getTodayDailyLog();

          todayLogId =
            todayLog?.id ??
            null;
        } catch (error) {
          /**
           * 오늘 DailyLog가 없어서
           * 404라면 정상적인 신규 작성 상태
           */
          if (
            error?.status !==
            404
          ) {
            throw error;
          }

          todayLogId =
            null;
        }

        let savedLog;

        /**
         * 오늘 기록이 이미 있으면
         * 그 오늘 기록 ID만 PATCH
         */
        if (
          todayLogId
        ) {
          savedLog =
            await careApi
              .updateDailyLog(
                todayLogId,
                payload,
              );
        } else {
          /**
           * 오늘 기록이 없으면
           * 오늘 날짜로 POST
           */
          savedLog =
            await careApi
              .createDailyLog({
                ...payload,

                log_date:
                  toDateInput(
                    new Date(),
                  ),
              });
        }

        /**
         * 저장된 오늘 DailyLog ID 동기화
         */
        setDailyLogId(
          savedLog?.id ??
            todayLogId ??
            null,
        );

        /**
         * Todo 플랜 생성
         *
         * 기존 API 연동 유지
         */
        try {
          const plan =
            await careApi
              .generatePlan();

          if (
            plan?.plan_id !=
            null
          ) {
            await careApi
              .confirmPlan(
                plan.plan_id,
              );
          }
        } catch (error) {
          /**
           * 플랜 생성 조건 미충족,
           * 이미 플랜 존재 등의 오류가 나더라도
           * 기록 저장 성공에는 영향 주지 않는다.
           */
          console.warn(
            '플랜 생성/확정 실패:',
            error,
          );
        }

        /**
         * 저장 완료
         */
        setDraft({});

        setScreen(
          'main',
        );

        /**
         * 저장 후 오늘 DailyLog 재동기화
         */
        await loadTodayDailyLog();
      } catch (error) {
        /**
         * 저장 실패 시
         * 현재 입력 화면 유지
         *
         * 서버 오류 확인용 로그
         */
        console.error(
          'DailyLog 저장 실패:',
          error,
        );

        console.error(
          'DailyLog 저장 실패 status:',
          error?.status,
        );

        console.error(
          'DailyLog 저장 실패 data:',
          error?.data,
        );
      }
    };

  /**
   * 기록 카드 클릭
   */
  const openCard = (
    cardId,
  ) => {
    if (
      cardId ===
      'mood-sleep'
    ) {
      setScreen(
        'mood-sleep',
      );
    }

    if (
      cardId ===
      'pain-feeding'
    ) {
      setScreen(
        'pelvic-feeding',
      );
    }

    if (
      cardId ===
      'skin-hair'
    ) {
      setScreen(
        'skin-hair',
      );
    }

    if (
      cardId ===
      'activity-memo'
    ) {
      setScreen(
        'activity-memo',
      );
    }
  };

  /**
   * 음성 기록
   */
  if (
    screen ===
    'recording'
  ) {
    return (
      <RecordingPage
        onBack={() =>
          setScreen(
            'main',
          )
        }
        onComplete={() =>
          setScreen(
            'main',
          )
        }
      />
    );
  }

  /**
   * 감정 / 수면
   */
  if (
    screen ===
    'mood-sleep'
  ) {
    return (
      <MoodSleepRecordPage
        onBack={() =>
          setScreen(
            'main',
          )
        }
        onNext={(
          values,
        ) =>
          updateDraft(
            values,
            'pelvic-feeding',
          )
        }
      />
    );
  }

  /**
   * 통증 / 수유
   */
  if (
    screen ===
    'pelvic-feeding'
  ) {
    return (
      <PelvicFeedingRecordPage
        onBack={() =>
          setScreen(
            'main',
          )
        }
        onNext={(
          values,
        ) =>
          updateDraft(
            values,
            'skin-hair',
          )
        }
      />
    );
  }

  /**
   * 피부 / 모발
   */
  if (
    screen ===
    'skin-hair'
  ) {
    return (
      <SkinHairRecordPage
        onBack={() =>
          setScreen(
            'main',
          )
        }
        onNext={(
          values,
        ) =>
          updateDraft(
            values,
            'activity-memo',
          )
        }
      />
    );
  }

  /**
   * 활동량 / 메모
   */
  if (
    screen ===
    'activity-memo'
  ) {
    return (
      <ActivityMemoRecordPage
        onBack={() =>
          setScreen(
            'main',
          )
        }
        onSave={
          saveDailyLog
        }
      />
    );
  }

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[120px]">

      {/* HEADER */}
      <header className="flex h-[74px] items-center justify-center border-b border-gray-200 bg-gray-50">
        <h1 className="text-[20px] font-medium text-text-black">
          오늘의 기록
        </h1>
      </header>

      <section className="px-[38px] pt-[17px]">

        {/* 실제 오늘 날짜 */}
        <p className="text-[16px] font-medium leading-6 tracking-[-0.32px] text-black/70">
          {formatDisplayDate(
            today,
          )}
        </p>

        {/* 음성 기록 */}
        <button
          type="button"
          onClick={() =>
            setScreen(
              'recording',
            )
          }
          className="mx-auto mt-[18px] block h-[70px] w-[70px]"
          aria-label="음성 기록 시작"
        >
          <img
            src={micIcon}
            alt=""
            className="h-full w-full"
          />
        </button>

        {/* 안내 */}
        <div className="mt-[18px] flex h-20 items-center gap-4 rounded-[20px] bg-primary-background px-[31px]">
          <img
            src={infoIcon}
            alt="안내"
            className="h-8 w-8 shrink-0"
          />

          <p className="text-[12px] font-medium leading-4 tracking-[-0.48px] text-primary">
            통증, 감정, 증상 등을 음성 메모로 기록할 수
            있어요.
            <br />
            위 녹음 버튼을 눌러 기록해보세요.
          </p>
        </div>
      </section>

      {/* 기록 카드 */}
      <section
        className="relative mx-[40px] mt-[47px] h-[481px]"
        aria-label="기록 항목"
      >
        {recordCards.map(
          (card) => (
            <div
              key={card.id}
              className={`
                pointer-events-none absolute left-0
                h-[328px] w-full rounded-[20px]
                shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                ${card.top}
                ${card.background}
              `}
            >
              <img
                src={
                  card.flap ??
                  folderFlap
                }
                alt=""
                aria-hidden="true"
                className={`
                  absolute -top-[18px] right-[22px]
                  h-[18px] w-[70px]
                  ${card.tabOpacity}
                `}
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
                openCard(
                  card.id,
                )
              }
              className={`
                absolute left-0 w-full

                ${
                  card.id ===
                  'pain-feeding'
                    ? 'z-30 h-[60px]'
                    : card.id ===
                        'mood-sleep'
                      ? 'top-[160px] z-20 h-[321px]'
                      : 'z-20 h-[53px]'
                }

                ${
                  card.id ===
                  'mood-sleep'
                    ? ''
                    : card.top
                }
              `}
              aria-label={`${card.title} 기록하기`}
            />
          ),
        )}

        {recordCards.map(
          (card) => (
            <span
              key={`${card.id}-title`}
              className={`
                pointer-events-none absolute left-[29px] z-10
                ${card.titleTop}
                text-[20px] font-medium
                leading-[30px] tracking-[-0.4px]
                text-white
              `}
            >
              {card.title}
            </span>
          ),
        )}
      </section>

      {/* Bottom Navigation */}
      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2">
        <BottomNavigation
          activeKey="record"
          items={
            navigationItems
          }
          onChange={
            onNavigate
          }
        />
      </div>
    </main>
  );
};

export default RecordPage;
