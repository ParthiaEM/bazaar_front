import { useEffect } from "react"
import { useState } from "react"
import { customAxios } from "../customAxios"
import { removeCookie } from "../cookies";
import styled, { keyframes } from "styled-components"
import AuctionCard from "./AuctionCard"
import DarkerBulb from '../images/bulbmeter/darker.svg';
import DarkBulb from '../images/bulbmeter/dark.svg';
import NormalBulb from '../images/bulbmeter/normal.svg';
import LightBulb from '../images/bulbmeter/light.svg';
import LighterBulb from '../images/bulbmeter/lighter.svg';
import PointerSVG from '../images/pointer.svg';
import ModInfo from "./ModInfo";

export default function Mypage({userInfo}) {
    const [sortSelected, setSortSelected] = useState(1)
    const [auctions, setAuctions] = useState({})

    async function getAuctions() {
        await customAxios
        .get('/idea')
        .then(function (response) {
            setAuctions(response.data)
        })
        .catch()
    }

    useEffect(() => {
        getAuctions()
        if (userInfo.userId === undefined) window.location.href = '/'
    }, [userInfo.userId])

    function sorting() {
        if (sortSelected === 3) {
            if (auctions.filter(data => data.postedUserId === userInfo.userUniqueId).length !== 0)
                return auctions.filter(data => data.postedUserId === userInfo.userUniqueId)
                    .map((data, key) =>
                        <AuctionCard key={key} data={data} />
                    )
            else return (<NoData>내가 올린 아이디어가 없어요</NoData>)
        }
        if (sortSelected === 4) {
            if (auctions.filter(data => data.bidUserId === userInfo.userUniqueId && data.isTrading).length !== 0)
                return auctions.filter(data => data.bidUserId === userInfo.userUniqueId && data.isTrading)
                    .map((data, key) =>
                        <AuctionCard key={key} data={data} />
                    )
            else return (<NoData>내가 입찰한 아이디어가 없어요</NoData>)
        }
        if (sortSelected === 5) {
            if (auctions.filter(data => data.purchasedUserId === userInfo.userUniqueId).length !== 0)
                return auctions.filter(data => data.purchasedUserId === userInfo.userUniqueId)
                    .map((data, key) =>
                        <AuctionCard key={key} data={data} />
                    )
            else return (<NoData>내가 낙찰받은 아이디어가 없어요</NoData>)
        }
    }

    function getBulb() {
        if(userInfo.lux <= 100) return DarkerBulb;
        if(userInfo.lux <= 200) return DarkBulb;
        if(userInfo.lux <= 300) return NormalBulb;
        if(userInfo.lux <= 400) return LightBulb;
        return LighterBulb;
    }

    function logOut() {
        removeCookie('token', {path: '/'})
        window.location.href = '/'
    }

    return (
        <SAuction>
            <SLink onClick={() => logOut()}>로그아웃</SLink>
            <Wraper>
                <TypeList>
                    <Type
                        $round="top"
                        onClick={() => setSortSelected(1)}
                        $select={sortSelected === 1 ? "#FFEEE8" : "#FDF7F5"}
                    >내 정보</Type>
                    <Type
                        onClick={() => setSortSelected(2)}
                        $select={sortSelected === 2 ? "#FFEEE8" : "#FDF7F5"}
                    >정보 수정하기</Type>
                    <Type
                        onClick={() => setSortSelected(3)}
                        $select={sortSelected === 3 ? "#FFEEE8" : "#FDF7F5"}
                    ><Span>내가 올린 아이디어</Span></Type>
                    <Type
                        onClick={() => setSortSelected(4)}
                        $select={sortSelected === 4 ? "#FFEEE8" : "#FDF7F5"}
                    ><Span>내가 입찰한 아이디어</Span></Type>
                    <Type
                        $round="bottom"
                        onClick={() => setSortSelected(5)}
                        $select={sortSelected === 5 ? "#FFEEE8" : "#FDF7F5"}
                    ><Span>내가 낙찰받은 아이디어</Span></Type>
                </TypeList>
                {sortSelected === 1 &&
                    <BulbMeter>
                        <Title>나의 벌브미터</Title>
                        <Bulb src={getBulb()} />
                        <Box>
                            <Number><Span>0</Span><Span>500</Span></Number>
                            <Gauge />
                            <Pointer src={PointerSVG} $lux={userInfo.lux} />
                            <MyLux $lux={userInfo.lux}>{userInfo.lux} lux</MyLux>
                        </Box>
                    </BulbMeter>
                }
                {sortSelected === 2 &&
                    <ModInfo userInfo={userInfo} />
                }
                {sortSelected > 2 &&
                    <AList>
                        {sorting()}
                    </AList>
                }
            </Wraper>
        </SAuction>
    )
}

const SAuction = styled.div`
    min-width: max-content;
    max-width: 100%;
    padding: 60px 100px 80px;
    font-family: 'pretendard';
`

const Wraper = styled.div`
    width: 100%;
    display: flex;
    @media (max-width: 750px) {
        flex-direction: column;
        gap: 0;
    }
`

const BulbMeter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 12px 60px;
    border: 1px solid black;
    border-radius: 0 20px 20px 0;
    width: 60%;
    gap: 28px;
    @media (max-width: 750px) {
        width: auto;
        border-radius: 0 0 20px 20px;
    }
`

const Title = styled.div`
    font-size: 32px;
    font-weight: bold;
`

const Bulb = styled.img`
    height: 140px;
`

const Box = styled.div`
    width: 80%;
`

const Number = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    font-weight: bold;
`

const Gauge = styled.div`
    width: 100%;
    height: 40px;
    background: linear-gradient(270deg, #FFDA00 0%, #F5F5F5 100%);
    box-shadow: 0 0 0 4px black inset;
`

const slide1 = keyframes`
    0% {
        margin-left: -12px;
        opacity: 0;
    };
`

const slide2 = keyframes`
    0% {
        margin-left: -40px;
        opacity: 0;
    };
`

const Pointer = styled.img`
    height: 20px;
    margin-top: 12px;
    margin-left: calc(${props => (props.$lux / 500) * 100 + "%"} - 12px);
    animation: ${slide1} 1s ease forwards;
    opacity: 1;
`

const MyLux = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin-left: calc(${props => (props.$lux / 500) * 100 + "%"} - 40px);
    animation: ${slide2} 1s ease forwards;
    opacity: 1;
`

const AList = styled.div`
    display: flex;
    height: fit-content;
    flex-direction: column;
    padding: 60px;
    border: 1px solid black;
    border-radius: 0 20px 20px 0;
    width: 60%;
    gap: 28px;
    @media (max-width: 750px) {
        width: auto;
        border-radius: 0 0 20px 20px;
    }
`

const TypeList = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    @media (max-width: 750px) {
        width: auto;
    }
`

const Type = styled.div`
    width: auto;
    background-color: ${(props) => props.$select};
    padding: 20px 40px;
    font-size: 20px;
    word-break: keep-all;
    line-height: 40px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    border-radius: ${(props) => props.$round === "top" ? "20px 0 0 0" : props.$round === "bottom" ? "0 0 0 20px" : ""};
    @media (max-width: 750px) {
        border-radius: ${(props) => props.$round === "top" ? "20px 20px 0 0" : "0"}
    }
    transition: 0.1s;
    &:hover {
        padding: 24px 40px;
        background-color: #FFEEE8;
    };
`

const Span = styled.span`
`

const NoData = styled.p`
    font-size: 20px;
    line-height: 12px;
`

const SLink = styled.div`
    width: fit-content;
    margin: 0 5% 0 auto;
    font-size: 20px;
    text-align: right;
    cursor: pointer;
    color: #9A9A9A;
`;