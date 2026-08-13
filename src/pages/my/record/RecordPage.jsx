import Header from '../../../components/Header';
import BottomNavigation from '../../../components/BottomNavigation';

import recoveryJourneyIcon from '../../../assets/navigationbar_recoveryjourney.svg';
import recordIcon from '../../../assets/navigationbar_record.svg';
import homeIcon from '../../../assets/navigationbar_home.svg';
import taskIcon from '../../../assets/navigationbar_task.svg';
import accountIcon from '../../../assets/navigationbar_account.svg';

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

const RecordPage = () => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
      <Header title="오늘의 기록" onBack={() => {}} />

      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2">
        <BottomNavigation activeKey="record" items={navigationItems} onChange={() => {}} />
      </div>
    </main>
  );
};

export default RecordPage;
