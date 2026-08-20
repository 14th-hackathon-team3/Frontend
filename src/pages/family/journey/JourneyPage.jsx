import { useState } from 'react';

import BottomNavigation from '../../../components/BottomNavigation';

import menuBookIcon from '../../../assets/Family_menu_book.svg';
import analysisIcon from '../../../assets/Family_star.svg';

import FolderFlap1 from '../../../assets/Rectangle1.svg';
import FolderFlap2 from '../../../assets/Rectangle2.svg';
import FolderFlap3 from '../../../assets/Rectangle3.svg';
import FolderFlap4 from '../../../assets/Rectangle4.svg';

import hiddenInfoIcon from '../../../assets/hidden_info.png';


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
    title: '활동량/메모',
    top: 'top-0',
    titleTop: 'top-[24px]',
    background: 'bg-[#EEF2FF]',
    flap: FolderFlap4,
  },

  {
    title: '피부/모발',
    top: 'top-[50px]',
    titleTop: 'top-[74px]',
    background: 'bg-[#B9C7FF]',
    flap: FolderFlap3,
  },

  {
    title: '통증/수유',
    top: 'top-[100px]',
    titleTop: 'top-[124px]',
    background: 'bg-[#97ADFF]',
    flap: FolderFlap2,
  },

  {
    title: '감정/수면',
    top: 'top-[153px]',
    titleTop: 'top-[177px]',
    background: 'bg-[#809CFF]',
    flap: FolderFlap1,
  },
];


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
  area = false,
}) => {
  return (
    <div className="mt-3">

      <div className="relative h-[64px]">

        {points
          .slice(0, -1)
          .map((point, index) => {

            const nextPoint =
              points[index + 1];

            const horizontal = 38;

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
                  left: `${index * 38}px`,
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


        {points.map(
          (point, index) => (
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
                left: `${index * 38}px`,
                top: `${point}px`,
                borderColor: color,
              }}
            />
          )
        )}

      </div>


      <div
        className="
          flex
          w-[228px]
          justify-between
          text-[11px]
          text-[#9D9D9D]
        "
      >
        <span>월</span>
        <span>화</span>
        <span>수</span>
        <span>목</span>
        <span>금</span>
        <span>토</span>
        <span>일</span>
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
  area,
}) => {
  return (
    <article
      className="
        rounded-[16px]
        bg-white
        px-4
        py-4
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
            text-[16px]
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

          <span
            className={`
              rounded-full
              px-2
              py-[2px]
              text-[12px]

              ${
                title === '수면'
                  ? 'bg-[#FDF0EC] text-[#EB2B2B]'
                  : 'bg-[#EDFAF4] text-[#3A9E72]'
              }
            `}
          >
            {badge}
          </span>


          <span
            className="
              text-[16px]
              font-medium
            "
            style={{
              color,
            }}
          >
            {value}
          </span>

        </div>

      </div>


      <TrendChart
        color={color}
        points={points}
        area={area}
      />

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
}) => {
  return (
    <main
      className="
        relative
        mx-auto
        min-h-screen
        w-full
        max-w-[402px]
        bg-[#F6F8FF]
        pb-[122px]
        pt-[76px]
      "
    >

      {/* HEADER */}
      <header
        className="
          flex
          items-center
          justify-between
          px-[16px]
        "
      >

        <h1
          className="
            text-[20px]
            font-medium
            tracking-[-0.4px]
            text-[#121212]
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
            size-[30px]
            items-center
            justify-center
          "
        >
          <img
            src={menuBookIcon}
            alt=""
            className="size-[24px]"
          />
        </button>

      </header>


      {/* DAY / WEEK */}
      <div
        className="
          mx-auto
          mt-[22px]
          flex
          h-[26px]
          w-[370px]
          rounded-[20px]
          bg-[#F0F2F9]
        "
      >

        <button
          type="button"
          onClick={onDay}
          className="
            w-1/2
            rounded-[20px]
            text-[12px]
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
            text-[12px]
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
          h-[70px]
          w-[360px]
          items-center
          gap-[12px]
          rounded-[20px]
          bg-[#F2F4FC]
          px-[15px]
        "
      >

        <img
          src={analysisIcon}
          alt=""
          className="size-[30px]"
        />


        <p
          className="
            text-[12px]
            font-medium
            tracking-[-0.4px]
            text-[#809CFF]
          "
        >
          최근 7일 종합 분석
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
            badge="최근 3일 감소"
            value="5.3h"
            color="#E66161"
            points={[
              28,
              13,
              36,
              28,
              46,
              61,
              52,
            ]}
          />
        )}


        {privateCards.includes('통증') ? (
          <PrivacyCard title="통증" />
        ) : (
          <TrackingCard
            title="통증"
            badge="전반적으로 감소"
            value="4"
            color="#6BBF99"
            points={[
              14,
              14,
              36,
              36,
              58,
              58,
              36,
            ]}
            area
          />
        )}


        {privateCards.includes('감정') ? (
          <PrivacyCard title="감정" />
        ) : (
          <article
            className="
              rounded-[16px]
              bg-white
              px-4
              py-4
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
                  text-[16px]
                  font-medium
                  text-[#121212]
                "
              >
                감정
              </h2>


              <span
                className="
                  rounded-full
                  bg-[#EDFAF4]
                  px-2
                  py-[2px]
                  text-[12px]
                  text-[#3A9E72]
                "
              >
                최근 긍정적인 감정 증가
              </span>

            </div>


            <div
              className="
                mt-4
                flex
                justify-between
                px-[10px]
                text-[22px]
              "
            >
              <span>😊</span>
              <span>🙂</span>
              <span>🙂</span>
              <span>😌</span>
              <span>🙂</span>
              <span>😊</span>
              <span>😊</span>
            </div>


            <div
              className="
                mt-1
                flex
                justify-between
                px-[9px]
                text-[11px]
                text-[#9D9D9D]
              "
            >
              <span>월</span>
              <span>화</span>
              <span>수</span>
              <span>목</span>
              <span>금</span>
              <span>토</span>
              <span>일</span>
            </div>

          </article>
        )}

      </section>


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


  const dateLabel =
    selectedDate.getTime() ===
    today.getTime()
      ? '오늘'
      : `${
          selectedDate.getMonth() +
          1
        }월 ${selectedDate.getDate()}일`;


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
        bg-[#F6F8FF]
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
          items-center
          justify-between
          px-[16px]
        "
      >

        <h1
          className="
            text-[20px]
            font-medium
            tracking-[-0.4px]
            text-[#121212]
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
            flex
            size-[30px]
            items-center
            justify-center
          "
        >

          <img
            src={menuBookIcon}
            alt=""
            className="size-[24px]"
          />

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
          h-[26px]
          w-[370px]
          rounded-[20px]
          bg-[#F0F2F9]
        "
      >

        <button
          type="button"
          className="
            w-1/2
            rounded-[20px]
            bg-[#809CFF]
            text-[12px]
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
            text-[12px]
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
          mt-[20px]
          h-[112px]
          w-[360px]
          rounded-[20px]
          bg-white
          px-[22px]
          pt-[14px]
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
            top-[49px]
            flex
            size-[20px]
            items-center
            justify-center
            text-[19px]
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
            top-[49px]
            flex
            size-[20px]
            items-center
            justify-center
            text-[19px]
            text-[#121212]
          "
        >
          ›
        </button>


        <div
          className="
            mt-[8px]
            flex
            justify-between
            px-[7px]
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
                    gap-[6px]
                  "
                >

                  <span
                    className={`
                      flex
                      size-[31px]
                      items-center
                      justify-center
                      rounded-full
                      text-[15px]
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
                      text-[10px]
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
          mx-[16px]
          mt-[20px]
        "
      >

        <h2
          className="
            text-[16px]
            font-medium
            tracking-[-0.3px]
            text-[#121212]
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
          mt-[15px]
          flex
          h-[70px]
          w-[360px]
          items-center
          gap-[12px]
          rounded-[20px]
          bg-[#F2F4FC]
          px-[15px]
        "
      >

        <img
          src={analysisIcon}
          alt=""
          className="size-[30px]"
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
          w-[322px]
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
                shadow-[0_2px_4px_rgba(0,0,0,0.12)]

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
                text-[16px]
                font-medium
                leading-[24px]
                tracking-[-0.3px]
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
        />

      </div>

    </main>
  );
};


export default JourneyPage;