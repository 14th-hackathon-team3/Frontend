import { useRef, useState } from 'react';

import BottomNavigation from '../../../components/BottomNavigation';

import recoveryJourneyIcon from '../../../assets/navigationbar_recoveryjourney.svg';
import recordIcon from '../../../assets/navigationbar_record.svg';
import homeIcon from '../../../assets/navigationbar_home.svg';
import taskIcon from '../../../assets/navigationbar_task.svg';
import accountIcon from '../../../assets/navigationbar_account.svg';

import todoStarIcon from '../../../assets/Todo_star.svg';
import recordInfoIcon from '../../../assets/Record_info.png';

const navigationItems = [
  {
    key: 'journey',
    label: '회복 여정',
    icon: recoveryJourneyIcon,
  },
  {
    key: 'record',
    label: '기록',
    icon: recordIcon,
  },
  {
    key: 'home',
    label: '홈',
    icon: homeIcon,
  },
  {
    key: 'todo',
    label: '할 일',
    icon: taskIcon,
  },
  {
    key: 'mypage',
    label: '마이페이지',
    icon: accountIcon,
  },
];

const MomIcon = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8C6.9 8 5.95833 7.60833 5.175 6.825ZM0 16V13.2C0 12.6333 0.145833 12.1125 0.4375 11.6375C0.729167 11.1625 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64583 4.75 9.3875C5.81667 9.12917 6.9 9 8 9C9.1 9 10.1833 9.12917 11.25 9.3875C12.3167 9.64583 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2708 11.1625 15.5625 11.6375C15.8542 12.1125 16 12.6333 16 13.2V16H0Z"
        fill="currentColor"
      />
    </svg>
  );
};

const PartnerIcon = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1 20V17.2C1 16.6333 1.14583 16.1125 1.4375 15.6375C1.72917 15.1625 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6458 5.75 13.3875C6.81667 13.1292 7.9 13 9 13C10.1 13 11.1833 13.1292 12.25 13.3875C13.3167 13.6458 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2708 15.1625 16.5625 15.6375C16.8542 16.1125 17 16.6333 17 17.2V20H1ZM19 20V17C19 16.2667 18.7958 15.5625 18.3875 14.8875C17.9792 14.2125 17.4 13.6333 16.65 13.15C17.5 13.25 18.3 13.4208 19.05 13.6625C19.8 13.9042 20.5 14.2 21.15 14.55C21.75 14.8833 22.2083 15.2542 22.525 15.6625C22.8417 16.0708 23 16.5167 23 17V20H19ZM6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12C7.9 12 6.95833 11.6083 6.175 10.825ZM17.825 10.825C17.0417 11.6083 16.1 12 15 12C14.8167 12 14.5833 11.9792 14.3 11.9375C14.0167 11.8958 13.7833 11.85 13.6 11.8C14.05 11.2667 14.3958 10.675 14.6375 10.025C14.8792 9.375 15 8.7 15 8C15 7.3 14.8792 6.625 14.6375 5.975C14.3958 5.325 14.05 4.73333 13.6 4.2C13.8333 4.11667 14.0667 4.0625 14.3 4.0375C14.5333 4.0125 14.7667 4 15 4C16.1 4 17.0417 4.39167 17.825 5.175C18.6083 5.95833 19 6.9 19 8C19 9.1 18.6083 10.0417 17.825 10.825Z"
        fill="currentColor"
      />
    </svg>
  );
};

const calendarDays = [
  { date: 1, label: '월' },
  { date: 2, label: '오늘', isToday: true },
  { date: 3, label: '수' },
  { date: 4, label: '목' },
  { date: 5, label: '금' },
  { date: 6, label: '토' },
  { date: 7, label: '일' },
];

const TodoPage = ({ onNavigate = () => {} }) => {
  const [activeTab, setActiveTab] = useState('my');
  const [selectedDate, setSelectedDate] = useState(2);

  const todoScrollRef = useRef(null);
  const [scrollThumbTop, setScrollThumbTop] = useState(0);
  const [showRecommendationInfo, setShowRecommendationInfo] = useState(false);

  const handleTodoScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    const maxScroll = scrollHeight - clientHeight;

    // Figma
    const trackHeight = 309;
    const thumbHeight = 250;
    const maxThumbTop = trackHeight - thumbHeight;

    const nextTop = maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTop : 0;

    setScrollThumbTop(nextTop);
  };

  const [todos, setTodos] = useState([
    // Mom 할 일
    {
      id: 1,
      text: '물 한 잔 마시기',
      role: 'mom',
      completed: false,
      isPrivate: false,
    },
    {
      id: 2,
      text: '10분 동안 편하게 쉬기',
      role: 'mom',
      completed: false,
      isPrivate: false,
    },
    {
      id: 3,
      text: '가벼운 스트레칭 하기',
      role: 'mom',
      completed: false,
      isPrivate: false,
    },

    // Partner 할 일
    {
      id: 4,
      text: '산모에게 물 가져다주기',
      role: 'partner',
      todoType: 'assigned',
      completed: false,
      isPrivate: false,
    },
    {
      id: 5,
      text: '오늘 식사 준비하기',
      role: 'partner',
      todoType: 'assigned',
      completed: false,
      isPrivate: false,
    },
    {
      id: 6,
      text: '아기 돌봄 30분 맡기',
      role: 'partner',
      todoType: 'common',
      completed: false,
      isPrivate: false,
    },
    {
      id: 7,
      text: '산모 휴식 시간 확보하기',
      role: 'partner',
      todoType: 'assigned',
      completed: false,
      isPrivate: false,
    },
    {
      id: 8,
      text: '집안일 한 가지 대신하기',
      role: 'partner',
      todoType: 'assigned',
      completed: false,
      isPrivate: false,
    },
    {
      id: 9,
      text: '세탁기 돌리기',
      role: 'partner',
      todoType: 'common',
      completed: false,
      isPrivate: false,
    },
    {
      id: 10,
      text: '간식 챙겨주기',
      role: 'partner',
      todoType: 'common',
      completed: false,
      isPrivate: false,
    },
  ]);

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo,
      ),
    );
  };

  const visibleTodos = todos.filter((todo) =>
    activeTab === 'my' ? todo.role === 'mom' && !todo.isPrivate : todo.role === 'partner',
  );
  const sortedTodos = [...visibleTodos].sort((a, b) => Number(a.completed) - Number(b.completed));

  const assignedTodos = todos
    .filter((todo) => todo.role === 'partner' && todo.todoType === 'assigned')
    .sort((a, b) => Number(a.completed) - Number(b.completed));

  const commonTodos = todos
    .filter((todo) => todo.role === 'partner' && todo.todoType === 'common')
    .sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <main className="mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
      <h1 className="sr-only">할 일</h1>

      <div className="mx-auto flex w-[360px] flex-col gap-[15px] pt-[90px]">
        {/* 캘린더 */}
        <section
          className="
            h-[120px] w-[360px]
            rounded-[20px] bg-gray-50
          "
          aria-label="주간 캘린더"
        >
          <div
            className="
              ml-[28px] mt-[17px]
              flex h-[85px] w-[305px]
              flex-col items-start gap-[10px]
            "
          >
            <p
              className="
                text-[12px] font-medium
                tracking-[-0.6px] text-gray-900
              "
            >
              6월
            </p>

            <div className="flex h-[61px] w-[305px] items-center gap-[10px]">
              {calendarDays.map((item) => {
                const isSelected = selectedDate === item.date;

                return (
                  <button
                    key={item.date}
                    type="button"
                    onClick={() => setSelectedDate(item.date)}
                    aria-pressed={isSelected}
                    aria-label={`${item.date}일 ${item.label}`}
                    className="
                      flex h-[61px] w-[35px]
                      flex-col items-center gap-[12px]
                    "
                  >
                    <span
                      className={`
                        flex h-[35px] w-[35px]
                        items-center justify-center rounded-full
                        text-[20px] font-medium tracking-[-1px]
                        ${isSelected ? 'bg-primary text-gray-50' : 'text-gray-900'}
                      `}
                    >
                      {item.date}
                    </span>

                    <span
                      className={`
                        text-[12px] tracking-[-0.6px]
                        ${item.isToday ? 'font-bold text-primary' : 'font-medium text-gray-900'}
                      `}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI 추천 */}
        <button
          type="button"
          className="
            flex h-[80px] w-[360px]
            items-center gap-[8px]
            rounded-[20px] bg-primary-background
            px-[15px] py-[15px]
            text-left
          "
          aria-label="AI 추천 할 일 보기"
        >
          <img src={todoStarIcon} alt="" className="h-[35px] w-[35px] shrink-0" />

          <p
            className="
              min-w-0 flex-1
              text-[12px] font-medium
              leading-[16px] tracking-[-0.6px]
              text-primary
            "
          >
            요 며칠 수면 시간이 줄고 있어요. 이대로 이어지면
            <br />
            지칠 수 있으니, 오늘은 휴식 위주의 할 일을 준비했어요.
          </p>

          <span
            aria-hidden="true"
            className="
              mr-[2px] h-[8px] w-[8px] shrink-0
              rotate-45
              border-r-[1.5px] border-t-[1.5px]
              border-primary
            "
          />
        </button>

        {/* TODO 카드 */}
        <section
          className="
            h-[451px] w-[360px]
            rounded-[20px] bg-gray-50
            pt-[18px]
          "
          aria-label="할 일 목록"
        >
          {/* Mom / Family */}
          <div className="ml-[19px] flex h-[50px] w-[320px]">
            <button
              type="button"
              onClick={() => setActiveTab('my')}
              aria-pressed={activeTab === 'my'}
              className={`
                flex h-[50px] w-[160px] shrink-0
                items-center justify-center gap-[10px]
                rounded-[20px]
                ${activeTab === 'my' ? 'bg-primary' : 'bg-primary-background'}
              `}
            >
              <MomIcon
                className={`
                    h-[16px] w-[16px]
                    ${activeTab === 'my' ? 'text-primary-background' : 'text-primary'}
                `}
              />

              <span
                className={`
                  text-[16px] font-medium tracking-[0.48px]
                  ${activeTab === 'my' ? 'text-primary-background' : 'text-primary'}
                `}
              >
                Mom
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('family')}
              aria-pressed={activeTab === 'family'}
              className={`
                flex h-[50px] w-[160px] shrink-0
                items-center justify-center gap-[10px]
                rounded-[20px]
                ${activeTab === 'family' ? 'bg-primary' : 'bg-primary-background'}
              `}
            >
              <PartnerIcon
                className={`
                    h-[24px] w-[24px]
                    ${activeTab === 'family' ? 'text-primary-background' : 'text-primary'}
                `}
              />

              <span
                className={`
                  text-[16px] font-medium tracking-[0.48px]
                  ${activeTab === 'family' ? 'text-primary-background' : 'text-primary'}
                `}
              >
                Family
              </span>
            </button>
          </div>

          {/* TODO 리스트 */}
          <div className="relative ml-[27px] mt-[27px] h-[309px] w-[304px]">
            <div
              ref={todoScrollRef}
              onScroll={handleTodoScroll}
              className={`
                flex h-full w-full flex-col items-start gap-[15px]
                ${activeTab === 'family' ? 'todo-scroll overflow-y-auto' : ''}
              `}
            >
              {activeTab === 'my' ? (
                sortedTodos.map((todo) => (
                  <div key={todo.id} className="flex h-[19.5px] w-full items-center gap-[15px]">
                    <button
                      type="button"
                      onClick={() => toggleTodo(todo.id)}
                      className={`
                        flex h-[19.5px] w-[19.5px] shrink-0
                        items-center justify-center rounded-[4.5px]
                        ${todo.completed ? 'bg-primary' : 'bg-[#D9D9D9]'}
                      `}
                      aria-label={todo.completed ? '할 일 완료 취소' : '할 일 완료'}
                    >
                      {todo.completed && (
                        <svg
                          width="13"
                          height="10"
                          viewBox="0 0 13 10"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 5L4.5 8.5L12 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>

                    <span
                      className={`
                        text-[16px] font-normal text-text-black
                        ${todo.completed ? 'line-through' : ''}
                      `}
                    >
                      {todo.text}
                    </span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex w-full flex-col gap-[15px]">
                    <div className="relative flex items-center gap-[4px]">
                      <p className="text-[16px] font-medium leading-normal text-primary">
                        보호자님을 위한 추천 To-do
                      </p>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowRecommendationInfo((prev) => !prev)}
                          aria-label="추천 To-do 안내 보기"
                          aria-expanded={showRecommendationInfo}
                          className="flex h-[16px] w-[16px] items-center justify-center"
                        >
                          <img src={recordInfoIcon} alt="" className="h-[16px] w-[16px]" />
                        </button>

                        {showRecommendationInfo && (
                          <div
                            className="
                              absolute left-1/2 top-[28px] z-20
                              w-[185px] -translate-x-1/2
                              rounded-[10px] bg-gray-900
                              px-[10px] py-[9px]
                              text-center text-[9px] font-normal
                              leading-[14px] text-white
                            "
                          >
                            <span
                              className="
                                absolute -top-[8px] left-1/2
                                h-0 w-0 -translate-x-1/2
                                border-b-[8px] border-l-[6px] border-r-[6px]
                                border-b-gray-900 border-l-transparent border-r-transparent
                              "
                            />
                            온보딩에서 입력한 보호자 정보를 바탕으로,
                            <br />
                            산모의 회복을 위해 보호자님이 도와주면
                            <br />
                            좋은 일을 추천해드려요.
                          </div>
                        )}
                      </div>
                    </div>

                    {assignedTodos.map((todo) => (
                      <div key={todo.id} className="flex h-[19.5px] w-full items-center gap-[15px]">
                        <button
                          type="button"
                          onClick={() => toggleTodo(todo.id)}
                          className={`
                            flex h-[19.5px] w-[19.5px] shrink-0
                            items-center justify-center rounded-[4.5px]
                            ${todo.completed ? 'bg-primary' : 'bg-[#D9D9D9]'}
                          `}
                          aria-label={todo.completed ? '할 일 완료 취소' : '할 일 완료'}
                        >
                          {todo.completed && (
                            <svg
                              width="13"
                              height="10"
                              viewBox="0 0 13 10"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M1 5L4.5 8.5L12 1"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>

                        <span
                          className={`
                            text-[16px] font-normal text-text-black
                            ${todo.completed ? 'line-through' : ''}
                          `}
                        >
                          {todo.text}
                        </span>

                        <span className="ml-auto mr-[18px] shrink-0 text-[12px] font-normal tracking-[-0.36px] text-gray-900">
                          {todo.assignee || '담당자'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-[8px] flex w-full flex-col gap-[15px]">
                    <p className="text-[16px] font-medium leading-normal text-primary">
                      공통 To-do
                    </p>

                    {commonTodos.map((todo) => (
                      <div key={todo.id} className="flex h-[19.5px] w-full items-center gap-[15px]">
                        <button
                          type="button"
                          onClick={() => toggleTodo(todo.id)}
                          className={`
                            flex h-[19.5px] w-[19.5px] shrink-0
                            items-center justify-center rounded-[4.5px]
                            ${todo.completed ? 'bg-primary' : 'bg-[#D9D9D9]'}
                          `}
                          aria-label={todo.completed ? '할 일 완료 취소' : '할 일 완료'}
                        >
                          {todo.completed && (
                            <svg
                              width="13"
                              height="10"
                              viewBox="0 0 13 10"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M1 5L4.5 8.5L12 1"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </button>

                        <span
                          className={`
                            text-[16px] font-normal text-text-black
                            ${todo.completed ? 'line-through' : ''}
                          `}
                        >
                          {todo.text}
                        </span>

                        <span className="ml-auto mr-[18px] shrink-0 text-[12px] font-normal tracking-[-0.36px] text-gray-900">
                          {todo.assignee || '담당자'}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {activeTab === 'family' && (
              <div
                className="pointer-events-none absolute right-0 top-0 h-[250px] w-[2px] bg-gray-900"
                style={{
                  transform: `translateY(${scrollThumbTop}px)`,
                }}
              />
            )}
          </div>
        </section>
      </div>

      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2">
        <BottomNavigation activeKey="todo" items={navigationItems} onChange={onNavigate} />
      </div>
    </main>
  );
};

export default TodoPage;
