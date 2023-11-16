import DarkerBulb from '../images/bulbmeter/darker.svg'
import DarkBulb from '../images/bulbmeter/dark.svg'
import NormalBulb from '../images/bulbmeter/normal.svg'
import LightBulb from '../images/bulbmeter/light.svg'
import LighterBulb from '../images/bulbmeter/lighter.svg'
import AppIcon from '../images/type/app.svg'
import GameIcon from '../images/type/game.svg'
import IoTIcon from '../images/type/iot.svg'
import WebIcon from '../images/type/web.svg'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { customAxios } from '../customAxios'

export default function Auction({data}) {
    const [postedUser, setPostedUser] = useState({})

    async function getUser() {
        await customAxios
        .get('/user/' + data.postedUserId)
        .then(function (response) {
            setPostedUser(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        getUser()
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
        <SAuction>
            <Span>{data.ideaName}</Span>
            <Span>{postedUser.lux} lux<SImg src={toBulb(postedUser.lux)} /></Span>
            <Span>₩ {toPrice(data.price)}</Span>
            <SImg src={toIcon(data.ideaField)} />
        </SAuction>
    )
}

const SAuction = styled.div`
    background-color: #FDF7F5;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 20px;
    line-height: 52px;
    border-radius: 12px;
    gap: 20px;
    @media (max-width: 900px) {
        flex-direction: column;
        gap: 10px;
        line-height: 32px;
        align-items: center;
        padding: 20px;
    }
    cursor: pointer;
`

const Span = styled.span`
    display: flex;
    gap: 20px;
    max-width: 30vw;
    min-width: 20%;
`

const SImg = styled.img`
    width: fit-content;
    height: 40px;
    margin: auto 0;
    @media (max-width: 900px) {
        height: 28px;
    }
`