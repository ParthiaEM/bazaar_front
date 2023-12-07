import styled, { keyframes } from "styled-components"
import Close from '../../images/icon/close.svg';
import { useState } from "react";
import { customAxios } from "../../customAxios";
import { useEffect } from "react";

export default function Payment({close, userUniqueId, price}) {
    const [user, setUser] = useState({'userAccount': '은행 계좌번호'})

    async function getUser(ID) {
        await customAxios
        .get('/user/' + parseInt(ID))
        .then(function (response) {
            setUser(response.data)
        })
        .catch()
    }

    useEffect(() => {
        getUser(userUniqueId)
    }, [userUniqueId])

    return (
        <SGetStarted>
            <Empty />
            <SBox>
                <BoxHeader>판매자의 은행 계좌에 낙찰 받은 금액을 정확하게 보내주세요</BoxHeader>
                <Wrap>
                    <Span>{user.userId} 님에게 {price}원을 보내주세요</Span>
                    <Line>
                        <Box>{user.userAccount.split(' ')[0]}</Box>
                        <Box1>{user.userAccount.split(' ')[1]}</Box1>
                    </Line>
                </Wrap>
            </SBox>
            <Empty>
                <CloseButton
                    src={Close}
                    onClick={() => close(false)}
                />
            </Empty>
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

const Empty = styled.div`
    width: 20px;
    margin: 20px;
`;

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
    flex-direction: column;
    width: 100%;
    height: 70%;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

const Span = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    word-break: keep-all;
    font-size: 20px;
`

const Line = styled.div`
    display: flex;
    gap: 20px;
`

const Box = styled.div`
    border: 1px solid black;
    padding: 8px 40px;
    font-size: 16px;
`

const Box1 = styled(Box)`
    width: 200px;
    padding: 8px 12px;
`

const CloseButton = styled.img`
    width: 20px;
    margin-top: 30vh;
    @media (max-height: 300px) {
        margin-top: 0;
    }
    cursor: pointer;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
`;