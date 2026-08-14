import { useState } from 'react';
import BottomNavigation from '../../../components/BottomNavigation';
import ToggleButton from '../../../components/ToggleButton';
import ProfilePage from './ProfilePage';
import ProfileEditPage from './ProfileEditPage';

const figmaSearchIcon = 'https://www.figma.com/api/mcp/asset/e0f7a54d-35ff-4614-b80e-4aa9ef44ac85.svg';

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '투두' },
  { key: 'mypage', label: '마이페이지' },
];

const notificationItems = [
  { key: 'todoCreated', label: 'todo 생성 알림' },
  { key: 'familyTodoCompleted', label: '가족 todo 완료 알림' },
  { key: 'familyTodoPending', label: '가족 todo 미실행 알림' },
];

const Mypage = ({ onNavigate = () => {} }) => {
  const [notifications, setNotifications] = useState({
    todoCreated: true,
    familyTodoCompleted: true,
    familyTodoPending: true,
  });
  const [view, setView] = useState('main');
  const [profile, setProfile] = useState({ name: '홍길동', id: 'Hong_gildong', password: 'Becomingmom!123', birthDate: '2026-07-13', photo: null });

  const toggleNotification = (key) => {
    setNotifications((items) => ({ ...items, [key]: !items[key] }));
  };

  if (view === 'profile') return <ProfilePage profile={profile} onBack={() => setView('main')} onEdit={() => setView('edit')} onLogout={() => setView('main')} />;
  if (view === 'edit') return <ProfileEditPage initialProfile={profile} onBack={() => setView('profile')} onSave={(updatedProfile) => { setProfile(updatedProfile); setView('profile'); }} />;

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[132px]">
      <header className="flex h-[112px] items-end border-b border-gray-300 bg-gray-50 px-5 pb-3">
        <button type="button" aria-label="검색" className="flex size-[31px] items-center justify-center"><img src={figmaSearchIcon} alt="" className="size-[31px]" /></button>
        <h1 className="flex-1 pb-[3px] text-center text-[20px] font-medium text-text-black">MyPage</h1>
        <span aria-hidden="true" className="size-[31px]" />
      </header>

      <section className="mx-auto mt-[23px] w-[360px] space-y-[15px]">
        <button type="button" onClick={() => setView('profile')} className="flex h-[77px] w-full items-center justify-between rounded-[13px] bg-[#31302e] px-[17px] text-left">
          <span className="flex flex-col gap-[3px]"><strong className="text-[16px] text-white">홍길동</strong><span className="text-[14px] text-[#fbfbff]">ID: Hong_gildong</span></span>
          <span aria-hidden="true" className="text-[28px] leading-none text-white">›</span>
        </button>

        <section className="rounded-[13px] bg-[#31302e] p-[17px]" aria-labelledby="notification-heading">
          <h2 id="notification-heading" className="text-[16px] font-bold text-white">알림 설정</h2>
          <div className="mt-[17px] space-y-[17px]">
            {notificationItems.map((item) => (
              <div key={item.key} className="flex h-[24px] items-center justify-between gap-4">
                <span className="text-[14px] text-white">{item.label}</span>
                <ToggleButton
                  selected={notifications[item.key]}
                  onClick={() => toggleNotification(item.key)}
                  className="!h-[24px] !w-[37px] shrink-0 rounded-full !p-[2px]"
                  aria-label={`${item.label} ${notifications[item.key] ? '끄기' : '켜기'}`}
                >
                  <span className={`block !size-[19px] rounded-full bg-gray-50 transition-transform ${notifications[item.key] ? 'translate-x-[6px]' : '-translate-x-[6px]'}`} />
                </ToggleButton>
              </div>
            ))}
          </div>
        </section>

        <button type="button" className="flex h-[56px] w-full items-center rounded-[13px] bg-[#31302e] px-[17px] text-[14px] font-bold text-[#ff9999]">회원 탈퇴</button>
      </section>

      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2"><BottomNavigation activeKey="mypage" items={navigationItems} onChange={onNavigate} /></div>
    </main>
  );
};

export default Mypage;
