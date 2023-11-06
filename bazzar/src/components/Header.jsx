import styled from 'styled-components';
import Logo from '../images/logo.svg';
import DarkerBulb from '../images/bulbmeter/darker.svg';
import DarkBulb from '../images/bulbmeter/dark.svg';
import NormalBulb from '../images/bulbmeter/normal.svg';
import LightBulb from '../images/bulbmeter/light.svg';
import LighterBulb from '../images/bulbmeter/lighter.svg';
import { useState } from 'react';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <SHeader>
            <SLogo src={Logo} />
            {
                isLoggedIn ?
                <Wrap>
                    <StartAuctionButton>경매 열기</StartAuctionButton>
                    <AccountInfo><Gray>id</Gray> 님</AccountInfo>
                    <BulbMeter src={toSVG(250)} />
                </Wrap> :
                <LoginButton onClick={() => setIsLoggedIn(true)}>로그인</LoginButton>
            }
            
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
`;

const SLogo = styled.img`
    height: 60px;
    margin: auto 0;
    cursor: pointer;
`;

const LoginButton = styled.button`
    width: 80px;
    height: 40px;
    margin: auto 0;
    border: none;
    background: none;
    font-size: 20px;
    font-family: 'Pretendard';
    cursor: pointer;
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
    font-family: 'Pretendard';
    cursor: pointer;
    word-break: keep-all;
`;

const AccountInfo = styled.button`
    height: 40px;
    margin: auto 0;
    border: none;
    background: none;
    font-size: 20px;
    font-family: 'Pretendard';
    cursor: pointer;
    text-decoration: underline;
`;

const Gray = styled.span`
    color: #9a9a9a;
`;

const BulbMeter = styled.img`
    height: 40px;
`;