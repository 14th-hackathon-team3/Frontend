import { useEffect, useState } from 'react';
import MyJourneyPage from './pages/my/journey/JourneyPage';
import MyRecordPage from './pages/my/record/RecordPage';
import MyHomepage from './pages/my/home/Homepage';
import MyTodoPage from './pages/my/todo/TodoPage';
import MyMypage from './pages/my/mypage/Mypage';
import FamilyJourneyPage from './pages/family/journey/JourneyPage';
import FamilyHomepage from './pages/family/home/Homepage';
import FamilyTodoPage from './pages/family/todo/TodoPage';
import FamilyMypage from './pages/family/mypage/Mypage';

const myPages = { journey: MyJourneyPage, record: MyRecordPage, home: MyHomepage, todo: MyTodoPage, mypage: MyMypage };
const familyPages = { journey: FamilyJourneyPage, home: FamilyHomepage, todo: FamilyTodoPage, mypage: FamilyMypage };

const getLocationState = () => {
  const [, role, page] = window.location.pathname.split('/');
  const isFamily = role === 'family';
  const pages = isFamily ? familyPages : myPages;
  return { role: isFamily ? 'family' : 'my', page: pages[page] ? page : 'mypage' };
};

function App() {
  const [location, setLocation] = useState(getLocationState);
  const pages = location.role === 'family' ? familyPages : myPages;
  const Page = pages[location.page];

  useEffect(() => {
    const handlePopState = () => setLocation(getLocationState());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (page) => {
    if (!pages[page] || page === location.page) return;
    const path = location.role === 'family' ? `/family/${page}` : `/${page}`;
    window.history.pushState({}, '', path);
    setLocation({ ...location, page });
  };

  return <Page onNavigate={handleNavigate} />;
}

export default App;
