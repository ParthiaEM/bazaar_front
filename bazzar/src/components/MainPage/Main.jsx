import styled from "styled-components"
import Footer from "../Static/Footer"
import mainImage from "../../images/main/main.svg"
import mainButton from "../../images/main/button.svg"
import { useState } from "react"
import GetStarted from "../Modals/GetStarted"
import { useEffect } from "react"
import { customAxios } from "../../customAxios"
import AuctionList from "./AuctionList"

export default function Main({isLoggedIn}) {
    const [show, setShow] = useState(false)
    const [auctions, setAuctions] = useState([])
    const [typeSelected, setTypeSelected] = useState(1)
    const [auctionIDs, setAuctionIDs] = useState([])

    async function getIdeas() {
        await customAxios
        .get('/idea')
        .then(function (response) {
            setAuctions(response.data)
            setAuctionIDs([response.data.map(auction => auction.ideaId)])
        })
        .catch()
    }

    useEffect(() => {
        getIdeas()
    }, [])
    
    return (
        <SMain>
            <MainImg>
                <MainImage src={mainImage} />
                <MainButton src={mainButton} onClick={() => setShow(true)} />
            </MainImg>
            <AuctionList auctions={auctions} typeSelected={typeSelected} setTypeSelected={setTypeSelected} />
            <Footer setTypeSelected={setTypeSelected} isLoggedIn={isLoggedIn} />
            {show && <GetStarted close={setShow} ids={auctionIDs} />}
        </SMain>
    )
}

const SMain = styled.div`
    width: 100%;
`

const MainImg = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    background-image: url("../../images/main.svg");
    background-size: cover;
    background-position: center;
`

const MainImage = styled.img`
    width: 100%;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
`

const MainButton = styled.img`
    width: 20%;
    margin-top: 22%;
    position: absolute;
    cursor: pointer;
    border-radius: 10rem;
    transition: 0.5s;
    &:hover {
        width: 21%;
        margin-top: 21.8%;
    };
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
`