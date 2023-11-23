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
import Payment from "./Payment"
import Evaluate from "./Evaluate"

export default function OthersAuction({isLoggedIn, userInfo}) {
    const {id} = useParams()
    const [ideaData, setIdeaData] = useState({})
    const [postedUser, setPostedUser] = useState({})
    const [lastUser, setLastUser] = useState({})
    const [purchasedUser, setPurchasedUser] = useState({})
    const [show, setShow] = useState(false)
    const [evaluate, setEvaluate] = useState(0)

    async function getUser(IdeaData) {
        await customAxios
        .get('/user/' + parseInt(IdeaData.postedUserId))
        .then(function (response) {
            setPostedUser(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })

        if (IdeaData.bidUserId !== 0) {
            await customAxios
            .get('/user/' + parseInt(IdeaData.bidUserId))
            .then(function (response) {
                setLastUser(response.data)
            })
            .catch(function (error) {
                console.log(error)
        })}

        if (IdeaData.purchasedUserId !== 0) {
        await customAxios
        .get('/user/' + parseInt(IdeaData.purchasedUserId))
        .then(function (response) {
            setPurchasedUser(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })}
    }

    useEffect(() => {
        if (ideaData.ideaId !== undefined) getUser(ideaData)
    }, [ideaData])

    async function getIdeaDetails(ID) {
        await customAxios
        .get('/idea/' + ID)
        .then(function (response) {
            setIdeaData(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        getIdeaDetails(id)
    }, [id])

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

    function setDesc() {
        if (ideaData.count > 0 && !ideaData.isTrading && userInfo.userUniqueId === ideaData.bidUserId)
            return "결제를 완료하고 확인이 되면 아이디어를 볼 수 있어요"
        if (ideaData.count > 0 && !ideaData.isTrading && userInfo.userUniqueId !== ideaData.bidUserId)
            return "아쉽게도 낙찰받지 못했어요... 다른 경매에 도전할까요?"
        return "낙찰 받으면 세부 아이디어를 볼 수 있어요"
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
                        {ideaData.purchasedUserId === userInfo.userUniqueId && evaluate === 0 ?
                            <Line2>
                                <Span1 onClick={() => setEvaluate(1)}>판매자 평가하기</Span1>
                            </Line2> :
                        ideaData.purchasedUserId === userInfo.userUniqueId ?
                            <Line2>
                                <Span1>판매자 평가 완료</Span1>
                            </Line2> :
                            <Empty3 />
                        }
                        {ideaData.purchasedUserId !== userInfo.userUniqueId ?
                            <Blind $image={BlindSVG}>
                                <Desc>{setDesc()}</Desc>
                                {userInfo.userUniqueId !== ideaData.bidUserId && !ideaData.isTrading && ideaData.count > 0 &&
                                <Button1><Link to='/' style={{color: 'black', textDecoration: 'none'}}>새로운 경매 찾기</Link></Button1>}
                            </Blind> :
                            <Textarea
                                defaultValue={ideaData.ideaDetail}
                                readOnly={true}
                            />
                        }
                    </Side>
                    <Side1>
                        <Bid>
                            {ideaData.bidUserId !== 0 ?
                                <Span>마지막 입찰자 : {lastUser.userId}</Span> :
                            ideaData.purchasedUserId !== 0 ?
                                <Span>낙찰자 : {purchasedUser.userId}</Span> :
                                <Empty />}
                            <Coins>
                                {placeCoins().map((_, k) =>
                                    <Coin src={CoinSVG} key={k} />
                                )}
                            </Coins>
                            <Span>{toPrice(ideaData.price)} ₩</Span>
                            {!isLoggedIn ?
                                <Block>로그인이 필요한 기능입니다</Block> :
                            ideaData.bidUserId !== userInfo.userUniqueId && (ideaData.isTrading || ideaData.count === 0) ?
                                (<Line1>
                                    <Empty1 />
                                    <Button onClick={() => bid()}>입찰하기</Button>
                                    <Plus>+ 500 ₩</Plus>
                                </Line1>) :
                            ideaData.bidUserId === userInfo.userUniqueId && ideaData.isTrading ?
                                <Block1>입찰했어요</Block1> :
                            ideaData.purchasedUserId === userInfo.userUniqueId ?
                                <Block2>낙찰받았어요</Block2> :
                            ideaData.bidUserId === userInfo.userUniqueId ?
                                <Button onClick={() => setShow(true)}>결제 완료하기</Button> :
                                <Block2>경매가 끝났어요</Block2>
                            }
                        </Bid>
                    </Side1>
                </Wrap>
            </Column>
            {show && <Payment close={setShow} userUniqueId={ideaData.postedUserId} price={ideaData.price} />}
            {evaluate === 1 && <Evaluate close={setEvaluate} id={ideaData.postedUserId} />}
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
    flex-direction: column;
    gap: 12px;
    justify-content: center;
    align-items: center;
    background-image: url(${(props) => props.$image});
    background-repeat : no-repeat;
    background-size : contain;
    border: 1px solid black;
`

const Textarea = styled.textarea`
    width: calc(100% - 24px);
    height: 396px;
    font-family: 'pretendard';
    font-size: 20px;
    border: 1px solid black;
    padding: 12px;
    resize: none;
`

const Line2 = styled(Line)`
    justify-content: right;
    gap: 16px;
`

const Empty3 = styled.div`
    height: 40px;
`

const Span1 = styled.span`
    color: #9A9A9A;
    cursor: pointer;
`

const Desc = styled.div`
    width: 60%;
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    word-break: keep-all;
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

const Button1 = styled(Button)`
    width: 40%;
    background-color: #FDF7F5;
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

const Block2 = styled(Block)`
    width: 50%;
`