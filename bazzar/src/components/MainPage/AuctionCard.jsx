import DarkerBulb from '../../images/bulbmeter/darker.svg'
import DarkBulb from '../../images/bulbmeter/dark.svg'
import NormalBulb from '../../images/bulbmeter/normal.svg'
import LightBulb from '../../images/bulbmeter/light.svg'
import LighterBulb from '../../images/bulbmeter/lighter.svg'
import AppIcon from '../../images/type/app.svg'
import GameIcon from '../../images/type/game.svg'
import IoTIcon from '../../images/type/iot.svg'
import WebIcon from '../../images/type/web.svg'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { customAxios } from '../../customAxios'
import { Link } from 'react-router-dom'

export default function AuctionCard({data}) {
    const [postedUser, setPostedUser] = useState({})

    async function getUser(Data) {
        await customAxios
        .get('/user/' + Data.postedUserId)
        .then(function (response) {
            setPostedUser(response.data)
        })
        .catch()
    }

    useEffect(() => {
        getUser(data)
    }, [data])

    function toIcon(field) {
        if (field === "웹") return WebIcon
        if (field === "앱") return AppIcon
        if (field === "게임") return GameIcon
        if (field === "IoT") return IoTIcon
    }

    function toPrice(price) {
        return price.toLocaleString('ko-KR')
    }

    function toBulb(bulbmeter) {
        if(bulbmeter <= 100) return DarkerBulb;
        if(bulbmeter <= 200) return DarkBulb;
        if(bulbmeter <= 300) return NormalBulb;
        if(bulbmeter <= 400) return LightBulb;
        return LighterBulb;
    }

    return (
        <Link to={"/auction/"+data.ideaId} style={{color: "black", textDecoration: "none"}}>
            <SAuction>
                <Title>{data.ideaName}</Title>
                <Wrap>
                    <Span>{postedUser.lux} lux</Span>
                    <Span><SImg src={toBulb(postedUser.lux)} /></Span>
                    <Span>₩ {toPrice(data.price)}</Span>
                    <SImg src={toIcon(data.ideaField)} />
                </Wrap>
            </SAuction>
        </Link>
    )
}

const SAuction = styled.div`
    width: calc(100% - 40px);
    background-color: #FDF7F5;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 20px;
    line-height: 52px;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        margin: 0 -4px 0 4px;
        background-color: #FFEEE8;
        border-radius: 50px;
    };
    @media (max-width: 1110px) {
        flex-direction: column;
        gap: 10px;
        line-height: 32px;
        align-items: center;
        padding: 20px;
    }
`

const Title = styled.div`
    width: 45%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 1110px) {
        width: 80%;
        justify-content: center;
    }
`

const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    @media (max-width: 1110px) {
        width: 90%;
    }
    @media (max-width: 620px) {
        display: none;
    }
`

const Span = styled.div`
    display: flex;
    align-items: center;
    &:nth-child(3) {
        width: 100px;
    }
`

const SImg = styled.img`
    height: 40px;
    margin: auto 0;
    @media (max-width: 1110px) {
        height: 28px;
    }
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
`