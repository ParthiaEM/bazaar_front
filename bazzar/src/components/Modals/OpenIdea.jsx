import { useState } from "react";
import styled, { keyframes } from "styled-components"
import { customAxios } from "../../customAxios";
import Complete from "./Complete";

export default function OpenIdea({close, id}) {
    const [show, setShow] = useState(false)

    async function open() {
        await customAxios
        .get('/idea/complete/' + id)
        .then(function () {
            setShow(true)
        })
        .catch()
    }

    return (
        <SGetStarted>
            <SBox>
                <BoxHeader>낙찰자에게 아이디어를 공개할까요?</BoxHeader>
                <Wrap>
                    <Button onClick={() => close(0)}>아니오</Button>
                    <Button onClick={() => open()}>네</Button>
                </Wrap>
                <Span>낙찰자의 결제를 확인한 후 진행해주세요</Span>
            </SBox>
            {show && <Complete say="아이디어를 공개했습니다!" />}
        </SGetStarted>
    )
}

const SGetStarted = styled.div`
    width: 100vw;
    max-height: max-content;
    min-height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    background-color: #00000030;
    display: flex;
    justify-content: center;
    font-family: "Pretendard";
    cursor: default;
    z-index: 10;
`

const slide = keyframes`
    0% {
        margin-top: -300px;
    }
    100% {
        margin-top: calc(50vh - 150px);
    }
`

const SBox = styled.div`
    width: 500px;
    height: 300px;
    margin: auto 0;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation: ${slide} 0.5s ease forwards;
`;

const BoxHeader = styled.div`
    width: 100%;
    height: 60px;
    background-color: #FDF7F5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

const Wrap = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 60px;
    border-radius: 30px;
    font-size: 20px;
    background-color: #FDF8F5;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        background-color: #FFEEE8;
    }
`

const Span = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    font-size: 12px;
    line-height: 20px;
    word-break: keep-all;
`