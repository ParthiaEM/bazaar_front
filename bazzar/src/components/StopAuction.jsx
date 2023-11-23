import { useState } from "react";
import styled from "styled-components"
import { getCookie } from "../cookies";
import { customAxios } from "../customAxios";
import Complete from "./Complete";

export default function StopAuction({close, id}) {
    const [show, setShow] = useState(false)

    async function stopAuction() {
        await customAxios
        .delete('/idea/' + id + '?token=' + getCookie('token'))
        .then(function () {
            setShow(true)
        })
        .catch()
    }

    return (
        <SGetStarted>
            <SBox>
                <BoxHeader>정말 경매를 취소하고 삭제할까요?</BoxHeader>
                <Wrap>
                    <Button onClick={() => close(0)}>아니오</Button>
                    <Button1 onClick={() => stopAuction()}>네</Button1>
                </Wrap>
                <Span>누적된 입찰액이 사라집니다</Span>
            </SBox>
            {show && <Complete say="경매를 성공적으로 삭제했습니다!" />}
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

const SBox = styled.div`
    width: 500px;
    height: 300px;
    margin: auto 0;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    background-color: #FFEEE8;
    cursor: pointer;
`

const Button1 = styled(Button)`
    background-color: #FDF7F5;
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