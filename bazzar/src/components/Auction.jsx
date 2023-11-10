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

export default function Auction() {
    return (
        <SAuction>
            <Span>아이디어 제목</Span>
            <Span>nlux<SImg src={DarkBulb} /></Span>
            <Span>x,xxxx₩</Span>
            <SImg src={WebIcon} />
        </SAuction>
    )
}

const SAuction = styled.div`
    background-color: #FDF7F5;
    display: flex;
    justify-content: space-between;
    padding: 16px 20px;
    font-size: 20px;
    border-radius: 12px;
    gap: 20px;
    @media (max-width: 900px) {
        flex-direction: column;
        gap: 10px;
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
    height: 24px;
`