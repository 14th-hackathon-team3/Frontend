import BottomNavigation from '../../../components/BottomNavigation';

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'record', label: '기록' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '할 일' },
  { key: 'mypage', label: '마이페이지' },
];

const Homepage = ({ onNavigate = () => {} }) => (
  <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
    <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2"><BottomNavigation activeKey="home" items={navigationItems} onChange={onNavigate} /></div>
  </main>
);

export default Homepage;
