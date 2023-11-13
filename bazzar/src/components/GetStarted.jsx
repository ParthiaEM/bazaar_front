import styled from "styled-components"
import Close from '../images/close.svg';

export default function GetStarted(props) {
    return (
        <SGetStarted>
            <Empty />
            <SBox>
                <BoxHeader>경매를 시작하거나 경매에 참여할 수 있어요</BoxHeader>
                <Wrap>
                    <Coulmn>
                        <Button>경매 열기</Button>
                        <Span>아이디어는 있지만 구현할 능력이 부족한 분들에게 추천</Span>
                    </Coulmn>
                    <Coulmn>
                        <Button1>경매 참여하기</Button1>
                        <Span>새로운 아이디어로 프로젝트를 하고싶은 분들에게 추천</Span>
                    </Coulmn>
                </Wrap>
            </SBox>
            <Empty>
                <CloseButton
                    src={Close}
                    onClick={() => props.close(false)}
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
    width: 100%;
    height: 80%;
    justify-content: space-evenly;
    align-items: center;
`

const Coulmn = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
`

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
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
    width: 100px;
    font-size: 12px;
    word-break: keep-all;
`

const CloseButton = styled.img`
    width: 20px;
    margin-top: 30vh;
    @media (max-height: 300px) {
        margin-top: 0;
    }
    cursor: pointer;
`;