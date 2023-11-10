import styled from "styled-components"
import Footer from "./Footer"
import mainImage from "../images/main.svg"
import mainButton from "../images/button.svg"
import Auctions from "./Auctions"

export default function Main() {
    return (
        <SMain>
            <MainImg>
                <MainImage src={mainImage} />
                <MainButton src={mainButton} />
            </MainImg>
            <Auctions />
            <Footer />
        </SMain>
    )
}

const SMain = styled.div`
    width: 100vw;
`

const MainImg = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    background-image: url("../images/main.svg");
    background-size: cover;
    background-position: center;
`

const MainImage = styled.img`
    width: 100%;
`

const MainButton = styled.img`
    width: 20%;
    margin-top: 22%;
    position: absolute;
`