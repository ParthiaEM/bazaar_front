import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { getCookie } from "../../cookies"
import { customAxios } from "../../customAxios"
import Complete from "../Modals/Complete"

export default function CreateAuction({isLoggedIn}) {
    const [detail, setDetail] = useState("")
    const [sum, setSum] = useState("")
    const [startBid, setStartBid] = useState(0)
    const [field, setField] = useState("none")
    const [alert, setAlert] = useState(0)
    const [show, setShow] = useState(false)

    function By500(s) {
        s = parseInt(s)
        if (s <= 499) return 0
        s += 500 - s%500
        s -= 500
        return s
    }

    function change(e) {
        e.target.value = startBid
    }

    async function postIdea(DTO) {
        await customAxios
            .post("/idea",
                DTO
            )
            .then(function () {
                setShow(true)
            })
            .catch(function () {
                setAlert(2)
            })
    }

    function createAuction(e) {
        e.preventDefault()

        if (detail.length === 0 || sum.length === 0 || startBid === 0 || field === "none") {
            setAlert(1)
            return
        }

        const createIdeaDTO = {
            "token" : getCookie("token"),
            "ideaInfo" : {
                "ideaField" : field,
                "ideaName" : sum,
                "ideaDetail" : detail,
                "price" : startBid,
            },
        }

        postIdea(createIdeaDTO)
    }

    return (
        <Box>
            <SForm>
                <Column>
                    <Legend>아이디어 세부 사항</Legend>
                    <IdeaDetail
                        name="ideaDetail"
                        placeholder="낙찰자에게 공개되는 정보입니다.&#13;&#10;가능한 구체적으로 작성해주세요."
                        onChange={e => setDetail(e.target.value)}
                    />
                </Column>
                <Column>
                    <Legend>아이디어 제목</Legend>
                    <AuctionSetting
                        name="ideaTitle"
                        placeholder="아이디어를 어필할 한 마디를 작성해주세요."
                        type="text"
                        onChange={e => setSum(e.target.value)}
                    />
                    <Legend>경매 시작가 설정</Legend>
                    <AuctionSetting
                        name="startPrice"
                        placeholder="500원 단위로 작성해주세요."
                        type="number"
                        step="500"
                        onChange={e => (setStartBid(By500(e.target.value)))}
                        onBlur={e => change(e)}
                    />
                    <Legend>아이디어 주제 설정</Legend>
                    <SelectTopic
                        name="ideaField"
                        onChange={e => setField(e.target.value)}
                    >
                        <option value="none">--- 주제 선택 ---</option>
                        <option value="웹">웹</option>
                        <option value="앱">앱</option>
                        <option value="게임">게임</option>
                        <option value="IoT">IoT</option>
                    </SelectTopic>
                    <Buttons>
                        {alert === 1 && <Alert>모든 입력란을 채워주세요</Alert>}
                        {alert === 2 && <Alert>잠시 문제가 발생했어요</Alert>}
                        <Link to="/" style={{color: "black", textDecoration: "none"}}>
                            <Button>등록 취소</Button>
                        </Link>
                        {isLoggedIn ? <Button onClick={e => createAuction(e)}>경매 올리기</Button> : <Button2>로그인이 필요합니다</Button2>}
                    </Buttons>
                </Column>
            </SForm>
            {show && <Complete say="경매가 등록되었습니다!" />}
        </Box>  
    )
}

const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'pretendard';
    height: 70vh;
    padding: 60px 140px;
    @media (max-width: 950px) {
        height: 150vh;
        padding: 80px 0;
    }
`

const SForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2vw;
    width: 100%;
    height: 100%;
    @media (max-width: 950px) {
        flex-direction: column;
    }
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: space-between;
    width: 50%;
    height: 100%;
`

const Legend = styled.div`
    font-size: 32px;
    font-weight: bold;
    word-break: keep-all;
    cursor: default;
`

const IdeaDetail = styled.textarea`
    resize: none;
    height: 100%;
    padding: 20px;
    font-size: 20px;
    font-family: 'pretendard';
`

const AuctionSetting = styled.input`
    height: 13%;
    padding: 0 20px;
    font-size: 20px;
    font-family: 'pretendard';
`

const SelectTopic = styled.select`
    height: 13%;
    padding: 0 20px;
    font-size: 20px;
    font-family: 'pretendard';
    cursor: pointer;    
`

const Buttons = styled.div`
    display: flex;
    width: 100%;
    justify-content: right;
    gap: 20px;
`

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 16px 32px;
    background-color: #FDF8F5;
    font-size: 20px;
    border-radius: 30px;
    cursor: pointer;
    word-break: keep-all;
    transition: 0.1s;
    &:hover {
        background-color: #FFEEE8;
    }
`

const Button2 = styled(Button)`
    color: lightgray;
    cursor: default;
`

const Alert = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    color: red;
`