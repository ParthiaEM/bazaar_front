import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom"

export default function Complete({say}) {
    return (
        <SComplete>
            <SBox>
                <BoxHeader>{say}</BoxHeader>
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
    align-items: center;
    justify-content: space-between;
    animation: ${slide} 0.5s ease forwards;
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
    background-color: #FDF8F5;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        background-color: #FFEEE8;
    }
`