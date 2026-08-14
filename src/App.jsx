import { useState } from 'react';
import Login from './pages/my/auth/Login';
import Homepage from './pages/my/home/Homepage';
import JourneyPage from './pages/my/journey/JourneyPage';
import RecordPage from './pages/my/record/RecordPage';
import TodoPage from './pages/my/todo/TodoPage';
import Mypage from './pages/my/mypage/Mypage';

const pages = {
  home: Homepage,
  journey: JourneyPage,
  record: RecordPage,
  todo: TodoPage,
  mypage: Mypage,
};

function App() {
  const [activePage, setActivePage] = useState('login');

  if (activePage === 'login') {
    return <Login onLogin={() => setActivePage('home')} />;
  }

  const Page = pages[activePage] ?? Homepage;
  return <Page onNavigate={setActivePage} />;
}

export default App;
