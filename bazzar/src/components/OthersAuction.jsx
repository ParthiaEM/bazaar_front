import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import { customAxios } from "../customAxios"
import BlindSVG from "../images/blind.svg"
import DarkerBulb from '../images/bulbmeter/darker.svg'
import DarkBulb from '../images/bulbmeter/dark.svg'
import NormalBulb from '../images/bulbmeter/normal.svg'
import LightBulb from '../images/bulbmeter/light.svg'
import LighterBulb from '../images/bulbmeter/lighter.svg'
import AppIcon from '../images/type/app.svg'
import GameIcon from '../images/type/game.svg'
import IoTIcon from '../images/type/iot.svg'
import WebIcon from '../images/type/web.svg'
import CoinSVG from '../images/coin.svg'
import { getCookie } from "../cookies"

export default function OthersAuction({isLoggedIn, userInfo}) {
    const {id} = useParams()
    const [ideaData, setIdeaData] = useState({})
    const [postedUser, setPostedUser] = useState({})
    const [lastUser, setLastUser] = useState({})

    async function getUser() {
        await customAxios
        .get('/user/' + parseInt(ideaData.postedUserId))
        .then(function (response) {
            setPostedUser(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })

        if (ideaData.bidUserId === 0) return
        await customAxios
        .get('/user/' + parseInt(ideaData.bidUserId))
        .then(function (response) {
            setLastUser(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    async function getIdeaDetails() {
        await customAxios
        .get('/idea/' + id)
        .then(function (response) {
            setIdeaData(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        getIdeaDetails()
    }, [])

    useEffect(() => {
        if (ideaData.ideaId !== undefined) getUser()
    }, [ideaData])

    function toIcon(field) {
        if (field === "웹") return WebIcon
        if (field === "앱") return AppIcon
        if (field === "게임") return GameIcon
        if (field === "IoT") return IoTIcon
    }

    function toBulb(bulbmeter) {
        if(bulbmeter <= 100) return DarkerBulb;
        if(bulbmeter <= 200) return DarkBulb;
        if(bulbmeter <= 300) return NormalBulb;
        if(bulbmeter <= 400) return LightBulb;
        return LighterBulb;
    }

    function toPrice(price) {
        try {return price.toLocaleString('ko-KR')}
        catch {return}
    }

    function placeCoins() {
        let coins = []
        for (let i=0; i<ideaData.count && i<10; i++) coins.push(i)
        return coins
    }

    async function bid() {
        const DTO = {
            "token": getCookie("token"),
            "ideaInfo": {
                "price": ideaData.price + 500,
            },
        }

        await customAxios
        .put('/idea/' + id,
            DTO
        )
        .then(function (response) {
            console.log(response)
            window.location.reload()
        })
        .catch(function (error) {
            console.log(error)
        })
    }


    return (
        <SAuction>
            <Column>
                <Back>
                    <Link to="/" style={{color: "#9A9A9A", textDecoration: "none"}}>
                        {"<"} 다른 경매 보기
                    </Link>
                </Back>
                <Wrap>
                    <Side>
                        <Line>
                            <Span>{postedUser.userId}</Span>
                            <Span>{postedUser.lux} lux<Bulb src={toBulb(postedUser.lux)} /></Span>
                            <Field src={toIcon(ideaData.ideaField)} />
                        </Line>
                        <Title>{ideaData.ideaName}</Title>
                        <Blind $image={BlindSVG}>
                            낙찰 받으면<br />
                            세부 아이디어를<br />
                            볼 수 있어요
                        </Blind>
                    </Side>
                    <Side1>
                        <Bid>
                            {ideaData.bidUserId !== 0 ? <Span>마지막 입찰자 : {lastUser.userId}</Span> : <Empty />}
                            <Coins>
                                {placeCoins().map((_, k) =>
                                    <Coin src={CoinSVG} key={k} />
                                )}
                            </Coins>
                            <Span>{toPrice(ideaData.price)} ₩</Span>
                            {!isLoggedIn ?
                                <Block>로그인이 필요한 기능입니다</Block> :
                                userInfo.userUniqueId !== ideaData.bidUserId ?
                                (<Line1>
                                    <Empty1 />
                                    <Button onClick={() => bid()}>입찰하기</Button>
                                    <Plus>+ 500 ₩</Plus>
                                </Line1>) :
                                <Block1>입찰했어요</Block1>
                            }
                        </Bid>
                    </Side1>
                </Wrap>
            </Column>
        </SAuction>
    )
}

const SAuction = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'pretendard';
    cursor: default;
`

const Column = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 20px;
    margin-bottom: 40px;
`

const Back = styled.div`
    width: fit-content;
    font-size: 20px;
    line-height: 8px;
    @media (max-width: 1000px) {
        line-height: 32px;
    }
`

const Wrap = styled.div`
    width: 100%;
    display: flex;
    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 40px;
    }
`

const Side = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    @media (max-width: 1000px) {
        width: 100%;
    }
`

const Side1 = styled(Side)`
    align-items: flex-end;
    justify-content: end;
    @media (max-width: 1000px) {
        align-items: center;
        justify-content: center;
    }
`

const Line = styled.div`
    width: calc(100% - 16px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
`

const Span = styled.span`
    font-size: 20px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Bulb = styled.img`
    height: 40px;
    margin-left: 16px;
`
const Field = styled.img`
    height: 60px;
`

const Title = styled.div`
    width: calc(100% - 16px);
    text-align: left;
    font-size: 28px;
    padding: 0 8px;
`

const Blind = styled.div`
    width: 100%;
    height: 420px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    background-image: url(${(props) => props.$image});
    background-repeat : no-repeat;
    background-size : contain;
    border: 1px solid black;
    margin-top: 20px;
`

const Bid = styled.div`
    width: 70%;
    height: 500px;
    border: 1px solid black;
    border-radius: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (max-width: 1000px) {
        width: 70%;
    }
`

const Empty = styled.div`
    height: 40px;
`

const Coins = styled.div`
    width: 60%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
`

const Coin = styled.img`
    width: 80px;
    margin-top: -24px;
`

const Line1 = styled.div`
    width: 80%;
    display: flex;
    justify-content: end;
    align-items: center;
`

const Empty1 = styled.div`
    width: 25%;
`

const Button = styled.div`
    width: 50%;
    background-color: #FFEEE8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 48px;
    border-radius: 24px;
    cursor: pointer;
`

const Plus = styled.div`
    width: calc(25% - 8px);
    padding-left: 8px;
`

const Block = styled.div`
    width: 70%;
    background-color: #FDF7F5;
    color: #9A9A9A;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 24px;
    line-height: 48px;
    border-radius: 24px;
    word-break: keep-all;
`

const Block1 = styled(Block)`
    width: 40%;
`