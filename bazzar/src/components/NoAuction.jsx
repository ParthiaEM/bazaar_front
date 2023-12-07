import styled, { keyframes } from "styled-components"
import Parthia from "../images/parthia.svg"
import Logo from "../images/logo.svg"
import { Link } from "react-router-dom"

export default function NoAuction() {
    return (
        <Container>
            <Span>
                <Img src={Parthia} />
                <Img src={Logo} />
            </Span>
            <Alarm>
                <Letter>존</Letter>
                <Letter>재</Letter>
                <Letter>하</Letter>
                <Letter>지</Letter>&nbsp;
                <Letter>않</Letter>
                <Letter>는</Letter>&nbsp;
                <Letter>경</Letter>
                <Letter>매</Letter>
                <Letter>입</Letter>
                <Letter>니</Letter>
                <Letter>다</Letter>
            </Alarm>
            <Link to="/" style={{color: "black", textDecoration: "none"}}>
                <Button>돌아가기</Button>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100vw;
    height: calc(100vh - 80px);
    font-family: 'pretendard';
    gap: 10%;
    background-color: #FFEEE8;
`

const Alarm = styled.div`
    font-weight: 900;
    font-size: 60px;
    line-height: 68px;
    text-align: center;
    word-break: keep-all;
    display: flex;
`

const Letter = styled.div`
    padding: 0 4px 0 4px;
    transition: 0.1s;
    &:hover {
        padding: 0;
        font-size: 68px;
        &:nth-child(odd) {
            font-family: 'Times New Roman', Times, serif;
            transform: skew(40deg);
        }
        &:nth-child(even) {
            font-family: 'Courier New', Courier, monospace;
            transform: skew(-15deg);
        }
        font-weight: 900;
    }
`

const falling = keyframes`
    0% {
        margin: 0;
    }
    35% {
        margin-top: 0;
        transform: rotate(7200deg);
    }
    50% {
        margin-top: 500px;
    }
`

const slide = keyframes`
    70% {
        transform: scaleX(10);
    }
`

const Img = styled.img`
    height: 70%;
    z-index: 10;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    &:first-child:hover {
        animation: ${falling} 10s ease-in;
    }
    &:last-child:hover {
        animation: ${slide} 1s ease;
    }
`

const Span = styled.div`
    display: flex;
    justify-content: center;
    gap: 10%;
    width: 50%;
    height: 30%;
    background-color: #FDF7F5;
    border-radius: 0 0 100% 100%;
`

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px 100px;
    background-color: #FFEEE8;
    font-size: 32px;
    border-radius: 40px;
    cursor: pointer;
    word-break: keep-all;
    transition: 0.1s;
    &:hover {
        background-color: #FDF7F5;
        color: #FFEEE8
    }
`