import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Auction from './components/Auction.jsx';
import CreateAuction from './components/CreateAuction.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Mypage from './components/Mypage.jsx';
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
        .catch()
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
    <SApp>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} userInfo={userInfo} />
        <Routes>
          <Route path='/' element={<Main isLoggedIn={isLoggedIn} />} />
          <Route path='/create' element={<CreateAuction isLoggedIn={isLoggedIn} />} />
          <Route path='/auction/:id' element={<Auction isLoggedIn={isLoggedIn} userInfo={userInfo} />} />
          <Route path='/mypage' element={<Mypage userInfo={userInfo} />} />
        </Routes>
      </BrowserRouter>
    </SApp>
  );
}

const SApp = styled.div`
  background-color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`