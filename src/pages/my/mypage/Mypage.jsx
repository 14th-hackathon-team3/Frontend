import { useState } from 'react';
import BottomNavigation from '../../../components/BottomNavigation';
import ToggleButton from '../../../components/ToggleButton';
import logoutIcon from '../../../assets/Mypage_logout.svg';
import ProfilePage from './ProfilePage';
import ProfileEditPage from './ProfileEditPage';
import FamilyMemberDeletePage from './FamilyMemberDeletePage';

const figmaSearchIcon = 'https://www.figma.com/api/mcp/asset/9c994265-572b-4fb9-bfac-3760d1c38c48.svg';

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'record', label: '기록' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '할 일' },
  { key: 'mypage', label: '마이페이지' },
];

const notificationItems = [
  { key: 'todoCreated', label: 'todo 생성 알림' },
  { key: 'familyTodoCompleted', label: '가족 todo 완료 알림' },
  { key: 'familyTodoPending', label: '가족 todo 미실행 알림' },
  { key: 'myTodoPending', label: '나의 todo 미실행 알림' },
];

const WithdrawalModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-30 mx-auto flex w-full max-w-[402px] items-center justify-center bg-[#d5d5d5]/70 px-[37px]">
    <section role="dialog" aria-modal="true" aria-labelledby="withdrawal-title" className="w-full overflow-hidden rounded-lg bg-[#262626] pt-3 text-center shadow-xl">
      <div className="px-4 pb-4">
        <img src={logoutIcon} alt="" className="mx-auto size-12" />
        <h2 id="withdrawal-title" className="mt-3 text-[17px] font-medium text-white">탈퇴하시겠습니까?</h2>
        <p className="mt-1 text-[13px] leading-[18px] text-[#b0b0b0]">탈퇴하실 경우 현재까지의 모든 데이터가 삭제되고,<br />재가입하셔야 합니다.</p>
      </div>
      <div className="flex h-11 border-t border-[#4f4f4f]">
        <button type="button" onClick={onCancel} className="flex-1 text-[17px] text-white">취소</button>
        <span className="w-px bg-[#4f4f4f]" />
        <button type="button" onClick={onConfirm} className="flex-1 text-[17px] font-semibold text-[#ff9999]">탈퇴</button>
      </div>
    </section>
  </div>
);

const Mypage = ({ onNavigate = () => {} }) => {
  const [notifications, setNotifications] = useState({ todoCreated: true, familyTodoCompleted: true, familyTodoPending: true, myTodoPending: true });
  const [view, setView] = useState('main');
  const [isWithdrawalOpen, setIsWithdrawalOpen] = useState(false);
  const [profile, setProfile] = useState({ name: '홍길동', id: 'Hong_gildong', password: 'Becomingmom!123', birthDate: '2026-07-13', photo: null });

  const toggleNotification = (key) => setNotifications((items) => ({ ...items, [key]: !items[key] }));

  if (view === 'profile') return <ProfilePage profile={profile} onBack={() => setView('main')} onEdit={() => setView('edit')} />;
  if (view === 'edit') return <ProfileEditPage initialProfile={profile} onBack={() => setView('profile')} onSave={(updatedProfile) => { setProfile(updatedProfile); setView('profile'); }} />;
  if (view === 'family-delete') return <FamilyMemberDeletePage onBack={() => setView('main')} />;

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[132px]">
      <header className="flex h-[112px] items-end border-b border-gray-300 bg-gray-50 px-5 pb-3"><button type="button" aria-label="검색" className="flex size-[31px] items-center justify-center"><img src={figmaSearchIcon} alt="" className="size-[31px]" /></button><h1 className="flex-1 pb-[3px] text-center text-[20px] font-medium text-text-black">MyPage</h1><span className="size-[31px]" /></header>
      <section className="mx-auto mt-[23px] w-[360px] space-y-[15px]">
        <button type="button" onClick={() => setView('profile')} className="flex h-[77px] w-full items-center justify-between rounded-[13px] bg-[#31302e] px-[17px] text-left"><span className="flex flex-col gap-[3px]"><strong className="text-[16px] text-white">{profile.name}</strong><span className="text-[14px] text-[#fbfbff]">ID: {profile.id}</span></span><span aria-hidden="true" className="text-[28px] leading-none text-white">›</span></button>
        <section className="rounded-[13px] bg-[#31302e] p-[17px]" aria-labelledby="notification-heading"><h2 id="notification-heading" className="text-[16px] font-bold text-white">알림 설정</h2><div className="mt-[17px] space-y-[17px]">{notificationItems.map((item) => <div key={item.key} className="flex h-[24px] items-center justify-between gap-4"><span className="text-[14px] text-white">{item.label}</span><ToggleButton selected={notifications[item.key]} onClick={() => toggleNotification(item.key)} className="!h-[24px] !w-[37px] shrink-0 rounded-full !p-[2px]" aria-label={`${item.label} ${notifications[item.key] ? '켜기' : '끄기'}`}><span className={`block !size-[19px] rounded-full bg-gray-50 transition-transform ${notifications[item.key] ? 'translate-x-[6px]' : '-translate-x-[6px]'}`} /></ToggleButton></div>)}</div></section>
        <section className="rounded-[13px] bg-[#31302e] p-[17px]"><h2 className="text-[16px] font-bold text-white">가족 구성원 변경</h2><div className="mt-[17px] space-y-[17px]"><button type="button" className="flex w-full items-center justify-between text-[14px] text-white">가족 구성원 추가 <span aria-hidden="true" className="text-[24px] leading-none">›</span></button><button type="button" onClick={() => setView('family-delete')} className="flex w-full items-center justify-between text-[14px] text-white">가족 구성원 삭제 <span aria-hidden="true" className="text-[24px] leading-none">›</span></button></div></section>
        <button type="button" onClick={() => setIsWithdrawalOpen(true)} className="flex h-[56px] w-full items-center rounded-[13px] bg-[#31302e] px-[17px] text-[14px] font-bold text-[#ff9999]">회원 탈퇴</button>
      </section>
      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2"><BottomNavigation activeKey="mypage" items={navigationItems} onChange={onNavigate} /></div>
      {isWithdrawalOpen && <WithdrawalModal onCancel={() => setIsWithdrawalOpen(false)} onConfirm={() => setIsWithdrawalOpen(false)} />}
    </main>
  );
};

export default Mypage;
