import styled, { keyframes } from "styled-components"
import VeryGood from '../../images/eval/veryGood.svg'
import Good from '../../images/eval/good.svg'
import Soso from '../../images/eval/soso.svg'
import Bad from '../../images/eval/bad.svg'
import VeryBad from '../../images/eval/veryBad.svg'
import { customAxios } from "../../customAxios"

export default function Evaluate({close, id, setLux}) {
    async function evaluate(n) {
        setLux(bf => bf + n)

        const DTO = {
            "lux": n,
        }

        await customAxios
        .put('user/lux/' + id,
            DTO
        )
        .then(function () {
            close(2)
        })
        .catch()
    }

    return (
        <SGetStarted>
            <SBox>
                <BoxHeader>판매자의 아이디어, 신뢰도 등을 종합적으로 평가해주세요</BoxHeader>
                <Wrap>
                    <Line>
                        <Img onClick={() => evaluate(-5)} src={VeryBad} />
                        <Img onClick={() => evaluate(-2)} src={Bad} />
                        <Img onClick={() => evaluate(+5)} src={Soso} />
                        <Img onClick={() => evaluate(+10)} src={Good} />
                        <Img onClick={() => evaluate(+25)} src={VeryGood} />
                    </Line>
                    <Line>
                        <Span>별로였어요</Span>
                        <Span>평범해요</Span>
                        <Span>만족스러워요</Span>
                    </Line>
                </Wrap>
            </SBox>
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
        margin-top: -280px;
    }
    100% {
        margin-top: calc(50vh - 140px);
    }
`

const SBox = styled.div`
    width: 600px;
    height: 280px;
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
    width: 60px;
`

const Line = styled.div`
    display: flex;
    justify-content: space-between;
    width: 70%;
`

 const Img = styled.img`
    height: 60px;
    cursor: pointer;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
 `