import { useState } from 'react';
import Login from './pages/my/auth/Login';
import Homepage from './pages/my/home/Homepage';

function App() {
  const [screen, setScreen] = useState('login');

  if (screen === 'home') return <Homepage />;
  return <Login onLogin={() => setScreen('home')} />;
}

export default App;
