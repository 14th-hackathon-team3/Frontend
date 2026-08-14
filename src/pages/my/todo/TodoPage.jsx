import { useState } from 'react';

import BottomNavigation from '../../../components/BottomNavigation';

import recoveryJourneyIcon from '../../../assets/navigationbar_recoveryjourney.svg';
import recordIcon from '../../../assets/navigationbar_record.svg';
import homeIcon from '../../../assets/navigationbar_home.svg';
import taskIcon from '../../../assets/navigationbar_task.svg';
import accountIcon from '../../../assets/navigationbar_account.svg';

import todoStarIcon from '../../../assets/Todo_star.svg';
import hiddenInfoIcon from '../../../assets/hidden_info.png';

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

const PrivateIcon = () => (
  <span className="relative inline-block h-[20px] w-[20px] shrink-0" aria-hidden="true">
    {/* Partner 아이콘 */}
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="absolute inset-0">
      <path
        d="M0.833336 16.6666V14.3333C0.833336 13.861 0.954864 13.427 1.19792 13.0312C1.44097 12.6353 1.76389 12.3333 2.16667 12.1249C3.02778 11.6944 3.90278 11.3714 4.79167 11.1562C5.68056 10.9409 6.58334 10.8333 7.5 10.8333C8.41667 10.8333 9.31945 10.9409 10.2083 11.1562C11.0972 11.3714 11.9722 11.6944 12.8333 12.1249C13.2361 12.3333 13.559 12.6353 13.8021 13.0312C14.0451 13.427 14.1667 13.861 14.1667 14.3333V16.6666H0.833336ZM15.8333 16.6666V14.1666C15.8333 13.5555 15.6632 12.9687 15.3229 12.4062C14.9826 11.8437 14.5 11.361 13.875 10.9583C14.5833 11.0416 15.25 11.1839 15.875 11.3853C16.5 11.5867 17.0833 11.8333 17.625 12.1249C18.125 12.4027 18.5069 12.7117 18.7708 13.052C19.0347 13.3923 19.1667 13.7638 19.1667 14.1666V16.6666H15.8333ZM5.14584 9.02075C4.49306 8.36797 4.16667 7.58325 4.16667 6.66659C4.16667 5.74992 4.49306 4.9652 5.14584 4.31242C5.79861 3.65964 6.58334 3.33325 7.5 3.33325C8.41667 3.33325 9.20139 3.65964 9.85417 4.31242C10.5069 4.9652 10.8333 5.74992 10.8333 6.66659C10.8333 7.58325 10.5069 8.36797 9.85417 9.02075C9.20139 9.67353 8.41667 9.99992 7.5 9.99992C6.58334 9.99992 5.79861 9.67353 5.14584 9.02075ZM14.8542 9.02075C14.2014 9.67353 13.4167 9.99992 12.5 9.99992C12.3472 9.99992 12.1528 9.98256 11.9167 9.94783C11.6806 9.91311 11.4861 9.87492 11.3333 9.83325C11.7083 9.38881 11.9965 8.89575 12.1979 8.35409C12.3993 7.81242 12.5 7.24992 12.5 6.66659C12.5 6.08325 12.3993 5.52075 12.1979 4.97909C11.9965 4.43742 11.7083 3.94436 11.3333 3.49992C11.5278 3.43047 11.7222 3.38534 11.9167 3.3645C12.1111 3.34367 12.3056 3.33325 12.5 3.33325C13.4167 3.33325 14.2014 3.65964 14.8542 4.31242C15.5069 4.9652 15.8333 5.74992 15.8333 6.66659C15.8333 7.58325 15.5069 8.36797 14.8542 9.02075Z"
        fill="#C485F8"
      />
    </svg>

    {/* 비공개 X */}
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      className="absolute left-[1px] top-[1px]"
    >
      <path d="M0.589256 1.70044L14.4781 15.5893" stroke="#C485F8" strokeWidth="1.66667" />
      <path d="M1.70037 0.589355L15.5893 14.4782" stroke="white" strokeWidth="1.66667" />
    </svg>
  </span>
);

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
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState('');

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
      assignee: '담당자',
      completed: false,
      isPrivate: false,
    },
    {
      id: 5,
      text: '오늘 식사 준비하기',
      role: 'partner',
      assignee: '담당자',
      completed: false,
      isPrivate: false,
    },
    {
      id: 6,
      text: '아기 돌봄 30분 맡기',
      role: 'partner',
      assignee: '담당자',
      completed: false,
      isPrivate: false,
    },
    {
      id: 7,
      text: '산모 휴식 시간 확보하기',
      role: 'partner',
      assignee: '담당자',
      completed: false,
      isPrivate: false,
    },
    {
      id: 8,
      text: '집안일 한 가지 대신하기',
      role: 'partner',
      assignee: '담당자',
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
    activeTab === 'my' ? todo.role === 'mom' : todo.role === 'partner',
  );
  const sortedTodos = [...visibleTodos].sort((a, b) => Number(a.completed) - Number(b.completed));

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
          {/* Mom / Partner */}
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
              onClick={() => setActiveTab('partner')}
              aria-pressed={activeTab === 'partner'}
              className={`
                flex h-[50px] w-[160px] shrink-0
                items-center justify-center gap-[10px]
                rounded-[20px]
                ${activeTab === 'partner' ? 'bg-primary' : 'bg-primary-background'}
              `}
            >
              <PartnerIcon
                className={`
                    h-[24px] w-[24px]
                    ${activeTab === 'partner' ? 'text-primary-background' : 'text-primary'}
                `}
              />

              <span
                className={`
                  text-[16px] font-medium tracking-[0.48px]
                  ${activeTab === 'partner' ? 'text-primary-background' : 'text-primary'}
                `}
              >
                Partner
              </span>
            </button>
          </div>

          {/* TODO 리스트 */}
          <div className="ml-[27px] mt-[33px] flex flex-col items-start gap-[15px]">
            {sortedTodos.map((todo) => (
              <div key={todo.id} className="flex h-[19.5px] w-[306px] items-center gap-[15px]">
                {' '}
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
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none" aria-hidden="true">
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
                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    autoFocus
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => {
                      setTodos((prev) =>
                        prev.map((item) =>
                          item.id === todo.id
                            ? { ...item, text: editText.trim() || item.text }
                            : item,
                        ),
                      );
                      setEditingTodoId(null);
                      setEditText('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                      }
                    }}
                    className="
                        min-w-0 flex-1 bg-transparent
                        text-[16px] font-normal text-text-black
                        outline-none
                        "
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setSelectedTodo(todo)}
                    className={`
                        text-[16px] font-normal text-text-black
                        ${todo.completed ? 'line-through' : ''}
                    `}
                  >
                    {todo.text}
                  </button>
                )}
                {todo.role === 'mom' && todo.isPrivate && <PrivateIcon />}
                {activeTab === 'partner' && (
                  <span
                    className="
                      ml-auto shrink-0
                      text-[12px] font-normal leading-[18px]
                      tracking-[-0.36px] text-gray-900
                    "
                  >
                    {todo.assignee}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {selectedTodo && (
        <>
          {/* 배경 오버레이 */}
          <button
            type="button"
            aria-label="상세 닫기"
            onClick={() => setSelectedTodo(null)}
            className="fixed inset-0 z-20 bg-black/20"
          />

          {/* TODO 상세 바텀시트 */}
          <section
            className="
                fixed bottom-0 left-1/2 z-30
                w-full max-w-[402px]
                -translate-x-1/2
                rounded-t-[20px] bg-white
                px-[24px] pb-[32px] pt-[10px]
            "
            aria-label="할 일 상세"
          >
            {/* 상단 핸들 */}
            <div className="mx-auto h-[4px] w-[42px] rounded-full bg-gray-200" />

            {/* TODO 제목 */}
            <h2 className="mt-[34px] text-center text-[20px] font-medium text-text-black">
              {selectedTodo.text}
            </h2>

            {/* AI 추천 이유 */}
            <div
              className="
                mt-[36px] flex h-[96px] w-full
                items-center gap-[18px]
                rounded-[20px] bg-primary-background
                px-[28px]
                "
            >
              <img src={todoStarIcon} alt="" className="h-[35px] w-[35px] shrink-0" />

              <span className="text-[14px] font-medium text-primary">위험일 추천 이유</span>
            </div>

            {/* 수정 / 삭제 */}
            <div className="mt-[20px] flex gap-[10px]">
              <button
                type="button"
                onClick={() => {
                  setEditingTodoId(selectedTodo.id);
                  setEditText(selectedTodo.text);
                  setSelectedTodo(null);
                }}
                className="
                    flex h-[80px] flex-1
                    flex-col items-center justify-center gap-[8px]
                    rounded-[10px] bg-[#E0E0E0]
                    text-[16px] font-normal text-text-black
                "
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
                  <path
                    d="M3.90625 14.8438H5.01953L12.6562 7.20703L11.543 6.09375L3.90625 13.7305V14.8438ZM2.34375 16.4062V13.0859L12.6562 2.79297C12.8125 2.64974 12.985 2.53906 13.1738 2.46094C13.3626 2.38281 13.5612 2.34375 13.7695 2.34375C13.9779 2.34375 14.1797 2.38281 14.375 2.46094C14.5703 2.53906 14.7396 2.65625 14.8828 2.8125L15.957 3.90625C16.1133 4.04948 16.2272 4.21875 16.2988 4.41406C16.3704 4.60938 16.4062 4.80469 16.4062 5C16.4062 5.20833 16.3704 5.4069 16.2988 5.5957C16.2272 5.78451 16.1133 5.95703 15.957 6.11328L5.66406 16.4062H2.34375ZM12.0898 6.66016L11.543 6.09375L12.6562 7.20703L12.0898 6.66016Z"
                    fill="#2260FF"
                  />
                </svg>
                수정하기
              </button>

              <button
                type="button"
                onClick={() => {
                  setTodos((prev) => prev.filter((todo) => todo.id !== selectedTodo.id));
                  setSelectedTodo(null);
                }}
                className="
                    flex h-[80px] flex-1
                    flex-col items-center justify-center gap-[8px]
                    rounded-[10px] bg-[#E0E0E0]
                    text-[16px] font-normal text-text-black
                "
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" aria-hidden="true">
                  <path
                    d="M4.375 18C3.825 18 3.35417 17.8042 2.9625 17.4125C2.57083 17.0208 2.375 16.55 2.375 16V3H1.375V1H6.375V0H12.375V1H17.375V3H16.375V16C16.375 16.55 16.1792 17.0208 15.7875 17.4125C15.3958 17.8042 14.925 18 14.375 18H4.375ZM14.375 3H4.375V16H14.375V3ZM6.375 14H8.375V5H6.375V14ZM10.375 14H12.375V5H10.375V14Z"
                    fill="#EB2B2B"
                  />
                </svg>
                삭제하기
              </button>
            </div>

            {/* 보호자 공개 설정 */}
            <button
              type="button"
              onClick={() => {
                setTodos((prev) =>
                  prev.map((todo) =>
                    todo.id === selectedTodo.id ? { ...todo, isPrivate: !todo.isPrivate } : todo,
                  ),
                );

                setSelectedTodo((prev) => ({
                  ...prev,
                  isPrivate: !prev.isPrivate,
                }));
              }}
              className="
                    mt-[24px] flex items-center gap-[12px]
                    text-[16px] font-normal text-text-black
                "
            >
              <img src={hiddenInfoIcon} alt="" className="h-[24px] w-[24px] shrink-0" />
              {selectedTodo.isPrivate ? '보호자에게 공개하기' : '보호자에게 비공개 하기'}
            </button>
          </section>
        </>
      )}

      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2">
        <BottomNavigation activeKey="todo" items={navigationItems} onChange={onNavigate} />
      </div>
    </main>
  );
};

export default TodoPage;
