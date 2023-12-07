import { useEffect } from "react"
import { useState } from "react"
import styled from "styled-components"
import AppIcon from '../images/type/app.svg'
import GameIcon from '../images/type/game.svg'
import IoTIcon from '../images/type/iot.svg'
import WebIcon from '../images/type/web.svg'
import AuctionCard from "./AuctionCard"

export default function AuctionList({auctions, typeSelected, setTypeSelected}) {
    const [sortSelected, setSortSelected] = useState(1)
    const [gotAuctions, setGotAuctions] = useState(false)
    const [auctionData, setAuctionData] = useState({})

    function sort(selectedSort, Auctions) {
        if (selectedSort === 1) setAuctionData(Auctions.filter(data => !data.isTrading && data.count === 0))
        if (selectedSort === 2) setAuctionData(Auctions.filter(data => data.isTrading && data.count > 0))
        if (selectedSort === 3) setAuctionData(Auctions.filter(data => !data.isTrading && data.count !== 0))
    }

    function getSorted(selectedSort, Auctions) {
        if (selectedSort === 1) return Auctions.filter(data => !data.isTrading && data.count === 0)
        if (selectedSort === 2) return Auctions.filter(data => data.isTrading && data.count > 0)
        if (selectedSort === 3) return Auctions.filter(data => !data.isTrading && data.count !== 0)
    }

    useEffect(() => {
        if (auctions.length === 0) setGotAuctions(false)
        else setGotAuctions(true)
        setAuctionData(auctions)
        sort(sortSelected, auctions)
    }, [auctions, sortSelected])

    useEffect(() => {
        let type
        if (typeSelected === 1) {
            sort(sortSelected, auctions)
            return
        }
        if (typeSelected === 2) type = "웹"
        if (typeSelected === 3) type = "앱"
        if (typeSelected === 4) type = "게임"
        if (typeSelected === 5) type = "IoT"

        setAuctionData(getSorted(sortSelected, auctions).filter(data => data.ideaField === type))
    }, [typeSelected, sortSelected, auctions])

    useEffect(() => {
        sort(sortSelected, auctions)
        setTypeSelected(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortSelected, auctions])

    return (
        <SAuction>
            <SortButtons>
                <SortButton
                    onClick={() => setSortSelected(1)}
                    $select={sortSelected === 1 ? "#FFEEE8" : "#FDF7F5"}
                >입찰 전 경매</SortButton>
                <SortButton
                    onClick={() => setSortSelected(2)}
                    $select={sortSelected === 2 ? "#FFEEE8" : "#FDF7F5"}
                >진행 중인 경매</SortButton>
                <SortButton
                    onClick={() => setSortSelected(3)}
                    $select={sortSelected === 3 ? "#FFEEE8" : "#FDF7F5"}
                >낙찰된 경매</SortButton>
            </SortButtons>
            <Wraper>
                <AList>
                    {gotAuctions && auctionData.length !== 0 ?
                    auctionData.map((data, i) => <AuctionCard key={i} data={data} />)
                    : <NoData>{sortSelected === 1 ? "입찰 전인 경매가 없어요" : sortSelected === 2 ? "진행 중인 경매가 없어요" : "낙찰된 경매가 없어요"}</NoData>}
                </AList>
                <TypeList>
                    <Type
                        $round="top"
                        onClick={() => setTypeSelected(1)}
                        $select={typeSelected === 1 ? "#FFEEE8" : "#FDF7F5"}
                    >전체</Type>
                    <Type
                        onClick={() => setTypeSelected(2)}
                        $select={typeSelected === 2 ? "#FFEEE8" : "#FDF7F5"}
                    ><Span>웹</Span><SImg src={WebIcon} /></Type>
                    <Type
                        onClick={() => setTypeSelected(3)}
                        $select={typeSelected === 3 ? "#FFEEE8" : "#FDF7F5"}
                    ><Span>앱</Span><SImg src={AppIcon} /></Type>
                    <Type
                        onClick={() => setTypeSelected(4)}
                        $select={typeSelected === 4 ? "#FFEEE8" : "#FDF7F5"}
                    ><Span>게임</Span><SImg src={GameIcon} /></Type>
                    <Type
                        $round="bottom"
                        onClick={() => setTypeSelected(5)}
                        $select={typeSelected === 5 ? "#FFEEE8" : "#FDF7F5"}
                    ><Span>IoT</Span><SImg src={IoTIcon} /></Type>
                </TypeList>
            </Wraper>
        </SAuction>
    )
}

const SAuction = styled.div`
    width: calc(100% - 200px);
    padding: 80px 100px;
    font-family: 'pretendard';
`

const SortButtons = styled.div`
    display: flex;
    gap: 40px;
    width: fit-content;
    margin-bottom: 40px;
    @media (max-width: 900px) {
        gap: 10px;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
`

const SortButton = styled.button`
    border: none;
    border-radius: 30px;
    padding: 12px 20px;
    font-size: 16px;
    word-break: keep-all;
    background-color: ${(props) => props.$select};
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        margin: 0 -4px 0 4px;
        background-color: #FFEEE8;
    };
`

const Wraper = styled.div`
    width: 100%;
    display: flex;
    @media (max-width: 900px) {
        flex-direction: column;
        gap: 0;
    }
`

const AList = styled.div`
    display: flex;
    height: fit-content;
    flex-direction: column;
    padding: 60px;
    border: 1px solid black;
    border-radius: 20px 0 0 20px;
    width: calc(100% - 340px);
    gap: 28px;
    @media (max-width: 900px) {
        width: auto;
        border-radius: 20px 20px 0 0;
    }
`

const TypeList = styled.div`
    display: flex;
    flex-direction: column;
`

const Type = styled.div`
    width: 140px;
    background-color: ${(props) => props.$select};
    padding: 20px 40px;
    font-size: 20px;
    line-height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    border-radius: ${(props) => props.$round === "top" ? "0 20px 0 0" : props.$round === "bottom" ? "0 0 20px 0" : ""};
    transition: 0.1s;
    &:hover {
        background-color: #FFEEE8;
        width: 160px;
        margin-right: -20px;
        border-radius: 0 20px 20px 0;
    };
    @media (max-width: 900px) {
        width: auto;
        border-radius: ${(props) => props.$round === "bottom" ? "0 0 20px 20px" : "0"};
        &:hover {
            background-color: #FFEEE8;
            width: 90%;
            border-radius: 0 20px 20px 0;
        };
    }
`

const Span = styled.span`
`

const SImg = styled.img`
    height: 40px;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
`

const NoData = styled.p`
    font-size: 20px;
    line-height: 12px;
`