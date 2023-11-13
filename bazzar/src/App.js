import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import { getCookie } from './cookies.js';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const token = getCookie('token')
    if (token !== undefined) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} userInfo={userInfo} />
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}