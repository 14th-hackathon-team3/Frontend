import { useEffect, useMemo, useState } from 'react';
import backButton from '../assets/back_button.svg';
import { notificationsApi } from '../api/notifications';

const isToday = (value) => {
  const date = new Date(value);
  const today = new Date();
  return date.getFullYear() === today.getFullYear()
    && date.getMonth() === today.getMonth()
    && date.getDate() === today.getDate();
};

const formatTime = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const daysAgo = Math.floor((startOfToday - startOfDate) / 86400000);

  if (daysAgo === 0) return '오늘';
  if (daysAgo < 7) return `${daysAgo}일 전`;
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const getDestination = (notification, isFamily) => {
  const target = `${notification.target_type || ''} ${notification.type || ''}`.toLowerCase();
  if (target.includes('todo')) return 'todo';
  if (!isFamily && (target.includes('record') || target.includes('log'))) return 'record';
  return null;
};

const NotificationItem = ({ notification, accentColor, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex min-h-[90px] w-full items-center border-b border-[#cfcfcf] bg-white px-[21px] py-[10px] text-left"
  >
    <div className="w-full">
      <div className="flex items-center gap-[6px]">
        <h3 className="text-[16px] font-medium text-[#121212]">{notification.title}</h3>
        {!notification.is_read && <span className="size-[7px] shrink-0 rounded-full" style={{ backgroundColor: accentColor }} />}
      </div>
      <p className="mt-[8px] text-[12px] leading-[17px] text-[#121212]">
        {notification.message}
        <span className="ml-[4px] text-[#9d9d9d]">{formatTime(notification.created_at)}</span>
      </p>
    </div>
  </button>
);

const NotificationGroup = ({ label, notifications, accentColor, onNotificationClick }) => {
  if (notifications.length === 0) return null;

  return (
    <section className="pt-[26px] first:pt-[35px]">
      <div className="px-[16px]">
        <span className="inline-flex h-[21px] items-center rounded-[20px] px-[10px] text-[11px] font-semibold text-white" style={{ backgroundColor: accentColor }}>
          {label}
        </span>
      </div>
      <div className="mt-[3px]">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.noti_id}
            notification={notification}
            accentColor={accentColor}
            onClick={() => onNotificationClick(notification)}
          />
        ))}
      </div>
    </section>
  );
};

const NotificationPage = ({ onNavigate = () => {}, variant = 'mother' }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const isFamily = variant === 'family';
  const accentColor = isFamily ? '#809CFF' : '#9B51E0';

  useEffect(() => {
    let active = true;
    notificationsApi.getAll()
      .then((data) => {
        if (active) setNotifications(Array.isArray(data) ? data : []);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || '알림을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => { active = false; };
  }, []);

  const groups = useMemo(() => ({
    today: notifications.filter((notification) => isToday(notification.created_at)),
    previous: notifications.filter((notification) => !isToday(notification.created_at)),
  }), [notifications]);

  const handleNotificationClick = async (notification) => {
    if (!notification.is_read) {
      setNotifications((items) => items.map((item) => (
        item.noti_id === notification.noti_id ? { ...item, is_read: true } : item
      )));
      try {
        await notificationsApi.markRead(notification.noti_id);
      } catch (requestError) {
        setNotifications((items) => items.map((item) => (
          item.noti_id === notification.noti_id ? { ...item, is_read: false } : item
        )));
        setError(requestError.message || '알림을 읽음 처리하지 못했습니다.');
        return;
      }
    }

    const destination = getDestination(notification, isFamily);
    if (destination) onNavigate(destination);
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-white">
      <header className="sticky top-0 z-20 flex h-[112px] items-end justify-center border-b border-[#dcdcdc] bg-[#fcfcfc] pb-[12px]">
        <button type="button" onClick={() => onNavigate('home')} aria-label="뒤로가기" className="absolute bottom-[12px] left-[20px] flex h-[32px] w-[64px] items-center justify-start">
          <span className="flex size-[31px] items-center justify-center"><img src={backButton} alt="" className="h-[21px] w-[13px]" /></span>
        </button>
        <h1 className="flex h-[32px] items-center text-[20px] font-medium text-black">알림</h1>
      </header>

      {isLoading && <p className="px-[21px] pt-[40px] text-center text-[13px] text-[#777]">알림을 불러오는 중이에요.</p>}
      {!isLoading && error && <p role="alert" className="px-[21px] pt-[40px] text-center text-[13px] text-[#d33]">{error}</p>}
      {!isLoading && !error && notifications.length === 0 && <p className="px-[21px] pt-[40px] text-center text-[13px] text-[#777]">도착한 알림이 없어요.</p>}
      {!isLoading && notifications.length > 0 && (
        <div>
          <NotificationGroup label="오늘" notifications={groups.today} accentColor={accentColor} onNotificationClick={handleNotificationClick} />
          <NotificationGroup label="이전" notifications={groups.previous} accentColor={accentColor} onNotificationClick={handleNotificationClick} />
        </div>
      )}
    </main>
  );
};

export default NotificationPage;
