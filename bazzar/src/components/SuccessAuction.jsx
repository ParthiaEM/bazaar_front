import { useState } from "react";
import styled from "styled-components"
import { customAxios } from "../customAxios";
import Complete from "./Complete";
import Close from '../images/close.svg';
import Gavel from '../images/gavel.svg';
import Off from '../images/off.svg';
import On from '../images/on.svg';
import { useEffect } from "react";

export default function SuccessAuction({close, id, bidder, price}) {
    const [count, setCount] = useState(0)
    const [show, setShow] = useState(false)

    async function end(ID) {
        await customAxios
        .get('/idea/' + ID + '/end')
        .then(function () {
            setShow(true)
        })
    }

    useEffect(() => {
        if (count === 3) end(id)
    }, [count, id])

    return (
        <SGetStarted>
            <Empty />
            <SBox>
                <BoxHeader>낙찰을 확정하고 경매를 마무리할까요?</BoxHeader>
                <Wrap>
                    <Column>
                        <Span>입찰자 : {bidder}님</Span>
                        <Span>낙찰 금액 : {price}원</Span>
                    </Column>
                    <Column>
                        <Img src={Gavel} onClick={() => setCount(bf => bf+1)} />
                        <Row>
                            <Img1 src={count >= 1 ? On : Off} />
                            <Img1 src={count >= 2 ? On : Off} />
                            <Img1 src={count >= 3 ? On : Off} />
                        </Row>
                    </Column>
                </Wrap>
                <Span1>망치를 세 번 눌러 낙찰을 확정해주세요</Span1>
            </SBox>
            <Empty>
                <CloseButton
                    src={Close}
                    onClick={() => close(false)}
                />
            </Empty>
            {show && <Complete say="낙찰이 완료되었습니다!" />}
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

const Column = styled.div`
    width: 160px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Span = styled.span`
    font-size: 20px;
`

const Span1 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
    font-size: 12px;
    line-height: 20px;
    word-break: keep-all;
`

const Img = styled.img`
    width: 100px;
    margin: auto;
    cursor: pointer;
`

const Img1 = styled.img`
    width: 20px;
    margin: auto;
`

const Row = styled.div`
    margin: auto;
    width: 100px;
    display: flex;
    gap: 20px;
`

const CloseButton = styled.img`
    width: 20px;
    margin-top: 30vh;
    @media (max-height: 300px) {
        margin-top: 0;
    }
    cursor: pointer;
`;