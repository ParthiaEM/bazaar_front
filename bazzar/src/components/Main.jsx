import styled from "styled-components"
import Footer from "./Footer"
import mainImage from "../images/main.svg"
import mainButton from "../images/button.svg"
import Auctions from "./Auctions"
import { useState } from "react"
import GetStarted from "./GetStarted"

export default function Main() {
    const [show, setShow] = useState(false)
    
    return (
        <SMain>
            <MainImg>
                <MainImage src={mainImage} />
                <MainButton src={mainButton} onClick={() => setShow(true)} />
            </MainImg>
            <Auctions />
            <Footer />
            {show && <GetStarted close={setShow} />}
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
    cursor: pointer;
    border-radius: 10rem;
`