import { useEffect, useState } from 'react';

import { authApi } from './api/auth';
import { groupsApi } from './api/groups';

import Login from './pages/my/auth/Login';

// 산모 페이지
import MyHomepage from './pages/my/home/Homepage';
import MyJourneyPage from './pages/my/journey/JourneyPage';
import MyRecordPage from './pages/my/record/RecordPage';
import MyTodoPage from './pages/my/todo/TodoPage';
import MyMypage from './pages/my/mypage/Mypage';
import RecoveryContentPage from './pages/my/content/RecoveryContentPage';
import MyOnboardingPage from './pages/my/onboarding/OnboardingPage';
import MyRecoveryGuidePage from './pages/my/recovery/RecoveryGuidePage';
import MyNotificationPage from './pages/my/notification/Notification';

// 가족 페이지
import FamilyHomepage from './pages/family/home/Homepage';
import FamilyJourneyPage from './pages/family/journey/JourneyPage';
import FamilyTodoPage from './pages/family/todo/TodoPage';
import FamilyMypage from './pages/family/mypage/Mypage';
import FamilyOnboardingPage from './pages/family/onboarding/FamilyOnboardingPage';
import FamilyRecoveryGuidePage from './pages/family/recovery/FamilyRecoveryGuidePage';
import FamilyRecoveryContentPage from './pages/family/content/RecoveryContentPage';
import FamilyInvitePage from './pages/family/auth/Family_invite';
import FamilyInviteExpiredPage from './pages/family/auth/FamilyInviteExpiredPage';
import FamilySignup from './pages/family/auth/Signup';
import FamilyNotificationPage from './pages/family/notification/Notification';

const getInviteCode = () => {
  if (typeof window === 'undefined') return '';
  const pathCode = window.location.pathname.match(/^\/invite\/([^/]+)\/?$/)?.[1];
  return decodeURIComponent(pathCode || new URLSearchParams(window.location.search).get('invite_code') || '');
};

const myPages = {
  home: MyHomepage,
  journey: MyJourneyPage,
  record: MyRecordPage,
  todo: MyTodoPage,
  mypage: MyMypage,
  recoveryContent: RecoveryContentPage,
  recoveryGuide: MyRecoveryGuidePage,
  onboarding: MyOnboardingPage,
  notification: MyNotificationPage,
};

const familyPages = {
  home: FamilyHomepage,
  journey: FamilyJourneyPage,
  todo: FamilyTodoPage,
  mypage: FamilyMypage,
  recoveryContent: FamilyRecoveryContentPage,
  recoveryGuide: FamilyRecoveryGuidePage,
  onboarding: FamilyOnboardingPage,
  notification: FamilyNotificationPage,
};

function App() {
  const [inviteCode] = useState(getInviteCode);
  const [invitation, setInvitation] = useState(null);
  const [activePage, setActivePage] = useState(inviteCode ? 'invite-loading' : 'login');
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if (!inviteCode) return;

    let active = true;
    groupsApi.verifyInvite(inviteCode)
      .then((data) => {
        if (!active) return;
        if (data?.is_valid === false) {
          setActivePage('invite-expired');
          return;
        }
        setInvitation(data);
        setActivePage('family-invite');
      })
      .catch(() => {
        if (active) setActivePage('invite-expired');
      });

    return () => { active = false; };
  }, [inviteCode]);

  const handleLogin = async () => {
    const user = await authApi.me();

    setUserType(user.user_type);
    setActivePage('home');
  };

  const handleSignup = (user) => {
    setUserType(user.user_type);
    setActivePage('onboarding');
  };

  if (activePage === 'invite-loading') {
    return <main className="mx-auto flex min-h-screen w-full max-w-[402px] items-center justify-center bg-[#F6F8FF] text-[14px] text-[#666]">초대 링크를 확인하고 있어요.</main>;
  }

  if (activePage === 'invite-expired') {
    return <FamilyInviteExpiredPage />;
  }

  if (activePage === 'family-invite') {
    return <FamilyInvitePage motherName={invitation?.mother_name} onAccept={() => setActivePage('family-signup')} />;
  }

  if (activePage === 'family-signup') {
    return <FamilySignup inviteCode={inviteCode} onBack={() => setActivePage('family-invite')} onComplete={handleSignup} />;
  }

  if (activePage === 'login') {
    return <Login onLogin={handleLogin} onSignup={handleSignup} />;
  }

  const pages = userType === 'guardian' ? familyPages : myPages;
  const Page = pages[activePage] ?? pages.home;

  return <Page onNavigate={setActivePage} />;
}

export default App;
