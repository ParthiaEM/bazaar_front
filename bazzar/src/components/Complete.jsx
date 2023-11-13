import styled from "styled-components"
import { Link } from "react-router-dom"

export default function Complete() {
    return (
        <SComplete>
            <SBox>
                <BoxHeader>경매가 등록되었습니다!</BoxHeader>
                <Link to="/" style={{color: "black", textDecoration: "none"}}>
                    <Button>완료</Button>
                </Link>
                <Empty />
            </SBox>
        </SComplete>
    )
}

const SComplete = styled.div`
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
    width: 400px;
    height: 280px;
    margin: auto 0;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const BoxHeader = styled.div`
    width: 100%;
    height: 60px;
    background-color: #FDF7F5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
`;

const Empty = styled(BoxHeader)`
    height: 20px;
    background-color: white;
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