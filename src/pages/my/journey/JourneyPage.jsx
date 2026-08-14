import { useState } from 'react';

import BottomNavigation from '../../../components/BottomNavigation';

import privacyIcon from '../../../assets/hidden_info.png';

const days = [
  { date: 1, day: '월' },
  { date: 2, day: '화' },
  { date: 3, day: '수' },
  { date: 4, day: '목' },
  { date: 5, day: '금' },
  { date: 6, day: '토' },
  { date: 7, day: '일' },
];

const recordCards = [
  {
    id: 'activity',
    title: '활동량/메모',
    top: 0,
    background: 'rgba(196, 133, 248, 0.10)',
  },
  {
    id: 'skin',
    title: '피부/모발',
    top: 50,
    background: 'rgba(196, 133, 248, 0.40)',
  },
  {
    id: 'pain',
    title: '통증/수유',
    top: 100,
    background: 'rgba(196, 133, 248, 0.60)',
  },
  {
    id: 'emotion',
    title: '감정/수면',
    top: 153,
    background: '#C485F8',
  },
];

const privacyOptions = [
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

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'record', label: '기록' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '할 일' },
  { key: 'mypage', label: '마이페이지' },
];

function JourneyPage({ onNavigate = () => {} }) {
  const [viewMode, setViewMode] = useState('day');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayWeekday = (today.getDay() + 6) % 7;
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - todayWeekday + (weekOffset * 7));
  const weekDates = days.map((item, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return { ...item, date: date.getDate() };
  });

  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [privateItems, setPrivateItems] = useState([]);

  const handlePrivacyToggle = (item) => {
    setPrivateItems((prev) =>
      prev.includes(item)
        ? prev.filter((value) => value !== item)
        : [...prev, item]
    );
  };

  const handleRecordClick = (recordId) => {
    console.log('선택한 기록:', recordId);
  };

  return (
    <div
      className="
        relative
        mx-auto
        min-h-[874px]
        w-full
        max-w-[402px]
        overflow-hidden
        bg-primary-light
      "
    >
      <main className="px-[21px] pt-[77px]">
        {/* Recovery Journey 제목 */}
        <div className="flex items-end justify-between">
          <h1
            className="
              font-sans
              text-[24px]
              font-medium
              leading-[36px]
              text-text-black
            "
          >
            Recovery Journey
          </h1>
        </div>

        {/* Day / Week */}
        <div
          className="
            mt-[22px]
            flex
            h-[30px]
            w-full
            overflow-hidden
            rounded-[20px]
            bg-primary-background
          "
        >
          <button
            type="button"
            onClick={() => setViewMode('day')}
            className={`
              flex-1
              rounded-[20px]
              font-sans
              text-[16px]
              font-medium
              transition-colors
              ${
                viewMode === 'day'
                  ? 'bg-primary text-white'
                  : 'bg-primary-background text-primary'
              }
            `}
          >
            Day
          </button>

          <button
            type="button"
            onClick={() => setViewMode('week')}
            className={`
              flex-1
              rounded-[20px]
              font-sans
              text-[16px]
              font-medium
              transition-colors
              ${
                viewMode === 'week'
                  ? 'bg-primary text-white'
                  : 'bg-primary-background text-primary'
              }
            `}
          >
            Week
          </button>
        </div>

        {/* 날짜 */}
        <section
          className="
            relative
            mt-[22px]
            h-[120px]
            w-full
            rounded-[20px]
            bg-gray-50
            px-[28px]
            py-[17px]
          "
        >
          <p className="absolute left-[28px] top-[17px] z-20 bg-gray-50 pr-1 text-[12px] font-medium text-gray-900">{weekStart.getMonth() + 1}월</p>
          <p
            className="
              font-sans
              text-[12px]
              font-medium
              text-gray-900
            "
          >
            6월
          </p>

          <button
            type="button"
            aria-label="이전"
            className="
              absolute
              left-[10px]
              top-[55px]
              flex
              h-[15px]
              w-[15px]
              items-center
              justify-center
              rounded-full
              bg-dark-gray
              text-[11px]
              text-white
            "
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="다음"
            className="
              absolute
              right-[10px]
              top-[55px]
              flex
              h-[15px]
              w-[15px]
              items-center
              justify-center
              rounded-full
              bg-dark-gray
              text-[11px]
              text-white
            "
          >
            ›
          </button>

          <div className="mt-[10px] flex items-start justify-between">
            {weekDates.map((item) => {
              const selected = selectedDate === item.date;

              return (
                <button
                  key={item.date}
                  type="button"
                  onClick={() => setSelectedDate(item.date)}
                  className="
                    flex
                    w-[35px]
                    flex-col
                    items-center
                    gap-[8px]
                  "
                >
                  <span
                    className={`
                      flex
                      h-[35px]
                      w-[35px]
                      items-center
                      justify-center
                      rounded-full
                      font-sans
                      text-[20px]
                      font-medium
                      ${
                        selected
                          ? 'bg-primary text-gray-50'
                          : 'text-gray-900'
                      }
                    `}
                  >
                    {item.date}
                  </span>

                  <span
                    className={`
                      font-sans
                      text-[12px]
                      ${
                        selected
                          ? 'font-bold text-primary'
                          : 'font-medium text-gray-900'
                      }
                    `}
                  >
                    {item.day}
                  </span>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => { const nextStart = new Date(weekStart); nextStart.setDate(nextStart.getDate() - 7); setWeekOffset((offset) => offset - 1); setSelectedDate(nextStart.getDate()); }} aria-label="이전 주" className="absolute left-[10px] top-[55px] z-10 flex size-[20px] items-center justify-center rounded-full bg-dark-gray text-[16px] leading-none text-white">‹</button>
          <button type="button" onClick={() => { const nextStart = new Date(weekStart); nextStart.setDate(nextStart.getDate() + 7); setWeekOffset((offset) => offset + 1); setSelectedDate(nextStart.getDate()); }} aria-label="다음 주" className="absolute right-[10px] top-[55px] z-10 flex size-[20px] items-center justify-center rounded-full bg-dark-gray text-[16px] leading-none text-white">›</button>
        </section>

        {/* 기록 다시 보기 */}
        <div className="mt-[20px] flex items-center justify-between">
          <h2
            className="
              font-sans
              text-[20px]
              font-medium
              leading-[30px]
              text-text-black
            "
          >
            기록 다시 보기
          </h2>

          {/* 비공개 설정 버튼 */}
          <button
            type="button"
            aria-label="보호자 비공개 항목 설정"
            onClick={() => setIsPrivacyOpen(true)}
            className="
              flex
              h-[30px]
              w-[30px]
              items-center
              justify-center
            "
          >
            <img
              src={privacyIcon}
              alt=""
              className="h-[30px] w-[30px]"
            />
          </button>
        </div>

        {/* AI 코멘트 */}
        <div
          className="
            mt-[19px]
            flex
            h-[80px]
            w-full
            items-center
            rounded-[20px]
            bg-primary-background
            px-[15px]
          "
        >
          <div
            className="
              flex
              h-[35px]
              w-[35px]
              shrink-0
              items-center
              justify-center
              text-[24px]
              text-primary
            "
          >
            ✦
          </div>

          <p
            className="
              ml-[15px]
              font-sans
              text-[12px]
              font-medium
              leading-[16px]
              text-primary
            "
          >
            6월 {selectedDate}일의 분석 AI 코멘트...
          </p>
        </div>

        {/* 기록 카드 */}
        <div className="relative mt-[38px] h-[328px]">
          {recordCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => handleRecordClick(card.id)}
              className="
                absolute
                left-1/2
                h-[328px]
                w-[323px]
                -translate-x-1/2
                rounded-[20px]
                text-left
                shadow-[0_4px_4px_rgba(0,0,0,0.25)]
              "
              style={{
                top: `${card.top}px`,
                background: card.background,
              }}
            >
              <span
                className="
                  absolute
                  left-[29px]
                  top-[24px]
                  font-sans
                  text-[20px]
                  font-medium
                  leading-[30px]
                  text-white
                "
              >
                {card.title}
              </span>

              {card.id !== 'emotion' && (
                <span
                  className="
                    absolute
                    right-[22px]
                    top-[34px]
                    h-[16px]
                    w-[70px]
                    rounded-t-[10px]
                    bg-primary/30
                  "
                />
              )}
            </button>
          ))}
        </div>
      </main>

      {/* Bottom Navigation 공통 컴포넌트 */}
      <div
        className="
          fixed
          bottom-[20px]
          left-1/2
          z-40
          w-full
          max-w-[402px]
          -translate-x-1/2
          px-[10px]
        "
      >
        <BottomNavigation activeKey="journey" items={navigationItems} onChange={onNavigate} />
      </div>

      {/* 비공개 설정 바텀시트 */}
      {isPrivacyOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            justify-center
          "
          onClick={() => setIsPrivacyOpen(false)}
        >
          {/* 어두운 배경 */}
          <div
            className="
              absolute
              inset-0
              bg-[rgba(59,59,59,0.20)]
            "
          />

          {/* Bottom Sheet */}
          <div
            className="
              absolute
              bottom-0
              h-[395px]
              w-full
              max-w-[402px]
              rounded-t-[20px]
              bg-gray-50
              px-[35px]
              pt-[40px]
            "
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              className="
                text-center
                font-sans
                text-[20px]
                font-medium
                leading-[30px]
                text-text-black
              "
            >
              보호자에게 비공개할 항목 선택
            </h2>

            <div
              className="
                mt-[33px]
                flex
                flex-wrap
                gap-[9px]
              "
            >
              {privacyOptions.map((item) => {
                const selected = privateItems.includes(item);

                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => handlePrivacyToggle(item)}
                    className={`
                      flex
                      h-[36px]
                      items-center
                      justify-center
                      rounded-[9px]
                      px-[27px]
                      font-sans
                      text-[14.4px]
                      font-medium
                      transition-colors
                      ${
                        selected
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-text-black'
                      }
                    `}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JourneyPage;
