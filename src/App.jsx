import { useState } from 'react';

import { authApi } from './api/auth';

import Login from './pages/my/auth/Login';

// 산모 페이지
import MyHomepage from './pages/my/home/Homepage';
import MyJourneyPage from './pages/my/journey/JourneyPage';
import MyRecordPage from './pages/my/record/RecordPage';
import MyTodoPage from './pages/my/todo/TodoPage';
import MyMypage from './pages/my/mypage/Mypage';
import RecoveryContentPage from './pages/my/content/RecoveryContentPage';
import MyOnboardingPage from './pages/my/onboarding/OnboardingPage';

// 가족 페이지
import FamilyHomepage from './pages/family/home/Homepage';
import FamilyJourneyPage from './pages/family/journey/JourneyPage';
import FamilyTodoPage from './pages/family/todo/TodoPage';
import FamilyMypage from './pages/family/mypage/Mypage';
import FamilyOnboardingPage from './pages/family/onboarding/FamilyOnboardingPage';

const myPages = {
  home: MyHomepage,
  journey: MyJourneyPage,
  record: MyRecordPage,
  todo: MyTodoPage,
  mypage: MyMypage,
  recoveryContent: RecoveryContentPage,
  onboarding: MyOnboardingPage,
};

const familyPages = {
  home: FamilyHomepage,
  journey: FamilyJourneyPage,
  todo: FamilyTodoPage,
  mypage: FamilyMypage,
  onboarding: FamilyOnboardingPage,
};

function App() {
  const [activePage, setActivePage] = useState('login');
  const [userType, setUserType] = useState(null);

  const handleLogin = async () => {
    const user = await authApi.me();

    setUserType(user.user_type);
    setActivePage('home');
  };

  if (activePage === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  const pages = userType === 'guardian' ? familyPages : myPages;
  const Page = pages[activePage] ?? pages.home;

  return <Page onNavigate={setActivePage} />;
}

export default App;
