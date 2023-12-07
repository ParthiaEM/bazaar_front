import styled from 'styled-components';
import Logo from '../images/logo.svg';
import DarkerBulb from '../images/bulbmeter/darker.svg';
import DarkBulb from '../images/bulbmeter/dark.svg';
import NormalBulb from '../images/bulbmeter/normal.svg';
import LightBulb from '../images/bulbmeter/light.svg';
import LighterBulb from '../images/bulbmeter/lighter.svg';
import { useState } from 'react';
import Registration from './Registration';
import Login from './Login';
import { Link } from 'react-router-dom';

export default function Header({isLoggedIn, setIsLoggedIn, setUserInfo, userInfo}) {
    const [openRegist, setOpenRegist] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    return (
        <SHeader>
            <Link to="/">
                <SLogo src={Logo} />
            </Link>
            
            {
                isLoggedIn ?
                <Wrap>
                    <Link to="/create">
                        <StartAuctionButton>경매 열기</StartAuctionButton>
                    </Link>
                    <Link to="/mypage">
                        <AccountInfo><Gray>{userInfo.userId}</Gray> 님</AccountInfo>
                    </Link>
                    <BulbMeter src={toSVG(userInfo.lux)} />
                </Wrap> :
                <LoginButton onClick={() => setOpenRegist(true)}>로그인</LoginButton>
            }
            {openRegist && <Registration close={setOpenRegist} change={setOpenLogin} />}
            {openLogin && <Login close={setOpenLogin} change={setOpenRegist} setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />}
        </SHeader>
    )
}

function toSVG(n) {
    if(n <= 100) return DarkerBulb;
    if(n <= 200) return DarkBulb;
    if(n <= 300) return NormalBulb;
    if(n <= 400) return LightBulb;
    return LighterBulb;
}

const SHeader = styled.div`
    height: 80px;
    padding: 0 100px;
    background-color: #FDF7F5;
    display: flex;
    justify-content: space-between;
    font-family: 'Pretendard';
    transition: 0.3s;
    @media (max-width: 700px) {
        padding: 0 40px;
    }
`;

const SLogo = styled.img`
    height: 60px;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        height: 68px;
        margin: 6px -8px;
    };
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
`;

const LoginButton = styled.button`
    width: 80px;
    height: 40px;
    margin: auto 0;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        font-weight: bold;
    }
`;

const Wrap = styled.div`
    display: flex;
    margin: auto 0;
    gap: 20px;
`

const StartAuctionButton = styled.button`
    width: 100px;
    height: 40px;
    margin: auto 0;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
    word-break: keep-all;
    &:hover {
        font-weight: bold;
    }
`;

const AccountInfo = styled.button`
    height: 40px;
    margin: auto 0;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        font-weight: bold;
    }
`;

const Gray = styled.span`
    color: #9a9a9a;
`;

const BulbMeter = styled.img`
    height: 40px;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
`;