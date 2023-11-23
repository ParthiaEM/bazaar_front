import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auction from './components/Auction.jsx';
import CreateAuction from './components/CreateAuction.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import { getCookie } from './cookies.js';
import { customAxios } from './customAxios.js';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({})

  async function getUser(token) {
    await customAxios
        .get('/user?token='+token)
        .then(function (response) {
            setUserInfo(response.data)
        })
}

  useEffect(() => {
    const token = getCookie('token')
    if (token !== undefined) {
      setIsLoggedIn(true)
      getUser(token)
    }
    else setIsLoggedIn(false)
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} userInfo={userInfo} />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/create' element={<CreateAuction isLoggedIn={isLoggedIn} />} />
          <Route path='/auction/:id' element={<Auction isLoggedIn={isLoggedIn} userInfo={userInfo} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}