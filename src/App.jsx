import { useState } from 'react';
import Homepage from './pages/my/home/Homepage';
import JourneyPage from './pages/my/journey/JourneyPage';
import Mypage from './pages/my/mypage/Mypage';
import RecordPage from './pages/my/record/RecordPage';
import TodoPage from './pages/my/todo/TodoPage';

function App() {
  const [page, setPage] = useState('journey');

  const pages = {
    journey: <JourneyPage onNavigate={setPage} />,
    record: <RecordPage onNavigate={setPage} />,
    home: <Homepage onNavigate={setPage} />,
    todo: <TodoPage onNavigate={setPage} />,
    mypage: <Mypage onNavigate={setPage} />,
  };

  return pages[page] ?? pages.journey;
}

export default App;
