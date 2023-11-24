import styled from "styled-components"
import Parthia from "../images/parthia.svg"
import Logo from '../images/logo.svg';
import { removeCookie } from "../cookies";
import { Link } from 'react-router-dom';

export default function Footer({setTypeSelected}) {
    return (
        <SFooter>
            <Wrap>
                <SParthia src={Parthia} />
                <SLogo src={Logo} />    
            </Wrap>
            <Wrap2>
                <Column>
                    <Link to="/create" style={{color: "black", textDecoration: "none"}}><SLink>경매 열기</SLink></Link>
                </Column>
                <Column1>
                    <Wrap1>
                        <SLink onClick={() => (setTypeSelected(1) | window.scrollTo({top: 700}))}>전체 아이디어</SLink>
                        <SLink onClick={() => (setTypeSelected(2) | window.scrollTo({top: 700}))}>웹 아이디어</SLink>
                        <SLink onClick={() => (setTypeSelected(3) | window.scrollTo({top: 700}))}>앱 아이디어</SLink>
                    </Wrap1>
                    <Wrap1>
                        <SLink onClick={() => (setTypeSelected(4) | window.scrollTo({top: 700}))}>게임 아이디어</SLink>
                        <SLink onClick={() => (setTypeSelected(5) | window.scrollTo({top: 700}))}>IoT 아이디어</SLink>
                    </Wrap1>
                </Column1>
                <Column>
                    <SLink>마이페이지</SLink>
                    <SLink onClick={() => (removeCookie('token', {path: '/'}) | window.location.reload() | window.scrollTo({top: 0}))}>로그아웃</SLink>
                </Column>
            </Wrap2>
        </SFooter>
    )
}

const SFooter = styled.div`
    padding: 40px 100px;
    background-color: #FDF7F5;
    display: flex;
    justify-content: space-between;
    font-family: 'Pretendard';
`;

const Wrap = styled.div`
    display: flex;
    margin: auto 0;
    gap: 20px;
    justify-content: right;
    @media (max-width: 700px) {
        flex-direction: column;
        gap: 0;
    }
`;

const SParthia = styled.img`
    height: 120px;
    margin: auto 0;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    transition: 1s;
    &:hover {
        transform: rotate(720deg);
    }
`;

const SLogo = styled(SParthia)`
    height: 60px;
`;

const Wrap2 = styled.div`
    display: flex;
    margin: auto 0;
    gap: 60px;
    @media (max-width: 900px) {
        margin: 20px 0;
        flex-direction: column;
        gap: 20px;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (max-width: 900px) {
        gap: 0;
    }
`;

const SLink = styled.div`
    width: 120px;
    font-size: 20px;
    text-align: right;
    cursor: pointer;
    @media (max-width: 1150px) {
        line-height: 28px;
    }
`;

const Column1 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    @media (max-width: 1150px) {
        gap: 0;
    }
`;

const Wrap1 = styled.div`
    display: flex;
    margin: auto 0;
    gap: 20px;
    justify-content: right;
    @media (max-width: 1150px) {
        flex-direction: column;
        gap: 0;
    }
    @media (max-width: 700px) {
        flex-direction: column;
        gap: 0;
    }
`;