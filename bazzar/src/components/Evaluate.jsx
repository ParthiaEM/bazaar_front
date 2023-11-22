import styled from "styled-components"
import VeryGood from '../images/veryGood.svg'
import Good from '../images/good.svg'
import Soso from '../images/soso.svg'
import Bad from '../images/bad.svg'
import VeryBad from '../images/veryBad.svg'
import { customAxios } from "../customAxios"

export default function Evaluate({close, id}) {
    async function evaluate(n) {
        const DTO = {
            "lux": n,
        }

        await customAxios
        .put('user/lux/' + id,
            DTO
        )
        .then(function (response) {
            close(2)
        })
        .catch(function (error) {
            console.log(error)
        })
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

const SBox = styled.div`
    width: 600px;
    height: 280px;
    margin: auto 0;
    background-color: #ffffff;
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
 `