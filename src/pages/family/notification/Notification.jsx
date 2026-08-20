import backButton from '../../../assets/back_button.svg';


/* =========================
   오늘 알림
========================= */
const todayNotifications = [
  {
    id: 1,
    title: '오늘의 회복 To-do가 준비됐어요.',
    description:
      '어제 기록을 바탕으로 오늘은 산모님을 위한 맞춤 케어를 준비했어요. 지금 확인해보세요.',
    time: '오늘',
    unread: true,
  },
  {
    id: 2,
    title: '잠시 기록을 쉬고 있었네요.',
    description:
      '최근 기록이 없어 현재 회복 상태를 확인하기 어려워요. 오늘의 기록을 간단히 남겨주시면 지금의 상태에 맞는 회복 To-do를 준비해드릴게요.',
    time: '오늘',
    unread: true,
  },
];


/* =========================
   이전 알림
========================= */
const previousNotifications = [
  {
    id: 3,
    title: '잠시 기록을 쉬고 있었네요.',
    description:
      '최근 기록이 없어 현재 회복 상태를 확인하기 어려워요. 오늘의 기록을 간단히 남겨주시면 지금의 상태에 맞는 회복 To-do를 준비해드릴게요.',
    time: '3일 전',
    unread: false,
  },
  {
    id: 4,
    title: '잠시 기록을 쉬고 있었네요.',
    description:
      '최근 기록이 없어 현재 회복 상태를 확인하기 어려워요. 오늘의 기록을 간단히 남겨주시면 지금의 상태에 맞는 회복 To-do를 준비해드릴게요.',
    time: '8월 10일',
    unread: false,
  },
];


/* =========================
   날짜 Badge
========================= */
const DateBadge = ({ children }) => {
  return (
    <div
      className="
        inline-flex
        h-[21px]
        items-center
        justify-center
        rounded-[20px]
        bg-[#C485F8]
        px-[10px]
      "
    >
      <span
        className="
          text-[11px]
          font-semibold
          leading-[16.5px]
          tracking-[0.33px]
          text-white
        "
      >
        {children}
      </span>
    </div>
  );
};


/* =========================
   알림 한 개
========================= */
const NotificationItem = ({
  title,
  description,
  time,
  unread,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        min-h-[90px]
        w-full
        items-center
        justify-center
        border-b
        border-[#CFCFCF]
        bg-white
        px-[21px]
        py-[10px]
        text-left
      "
    >
      <div className="w-full max-w-[360px]">

        {/* 제목 */}
        <div className="flex items-center gap-[6px]">

          <h3
            className="
              text-[16px]
              font-medium
              text-[#121212]
            "
          >
            {title}
          </h3>


          {/* 읽지 않은 알림 */}
          {unread && (
            <span
              className="
                size-[7px]
                shrink-0
                rounded-full
                bg-[#0088FF]
              "
            />
          )}

        </div>


        {/* 알림 내용 */}
        <p
          className="
            mt-[8px]
            text-[12px]
            font-normal
            leading-[17px]
            text-[#121212]
          "
        >
          {description}

          <span
            className="
              ml-[4px]
              text-[#9D9D9D]
            "
          >
            {time}
          </span>
        </p>

      </div>
    </button>
  );
};


/* =========================
   Notification Page
========================= */
const NotificationPage = ({
  onNavigate = () => {},
}) => {

  /* =========================
     알림 클릭
  ========================= */
  const handleNotificationClick = (notification) => {

    /*
      첫 번째 알림:
      오늘의 회복 To-do
      → Todo 페이지
    */
    if (notification.id === 1) {
      onNavigate('todo');
      return;
    }


    /*
      기록 관련 알림
      → 기록 페이지
    */
    if (
      notification.id === 2 ||
      notification.id === 3 ||
      notification.id === 4
    ) {
      onNavigate('record');
    }
  };


  return (
    <main
      className="
        relative
        mx-auto
        min-h-screen
        w-full
        max-w-[402px]
        bg-white
      "
    >

      {/* =========================
          Header
      ========================= */}
      <header
        className="
          sticky
          top-0
          z-20
          flex
          h-[112px]
          items-end
          justify-center
          border-b
          border-[#DCDCDC]
          bg-[#FCFCFC]
          pb-[12px]
        "
      >

        {/* 뒤로가기 */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          aria-label="뒤로가기"
          className="
            absolute
            bottom-[12px]
            left-[20px]
            flex
            h-[32px]
            w-[64px]
            items-center
            justify-start
          "
        >
          <span
            className="
              flex
              size-[31px]
              items-center
              justify-center
            "
          >
            <img
              src={backButton}
              alt=""
              className="
                h-[21px]
                w-[13px]
              "
            />
          </span>
        </button>


        {/* 제목 */}
        <h1
          className="
            flex
            h-[32px]
            items-center
            justify-center
            text-[20px]
            font-medium
            text-black
          "
        >
          알림
        </h1>


        {/* 오른쪽 공간 */}
        <span
          aria-hidden="true"
          className="
            absolute
            bottom-[12px]
            right-[20px]
            h-[32px]
            w-[64px]
          "
        />

      </header>


      {/* =========================
          오늘
      ========================= */}
      <section className="pt-[35px]">

        <div className="px-[16px]">
          <DateBadge>
            오늘
          </DateBadge>
        </div>


        <div className="mt-0">

          {todayNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              description={notification.description}
              time={notification.time}
              unread={notification.unread}
              onClick={() =>
                handleNotificationClick(notification)
              }
            />
          ))}

        </div>

      </section>


      {/* =========================
          어제
      ========================= */}
      <section className="pt-[26px]">

        <div className="px-[16px]">
          <DateBadge>
            어제
          </DateBadge>
        </div>


        <div className="mt-[3px]">

          {previousNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              description={notification.description}
              time={notification.time}
              unread={notification.unread}
              onClick={() =>
                handleNotificationClick(notification)
              }
            />
          ))}

        </div>

      </section>

    </main>
  );
};


export default NotificationPage;