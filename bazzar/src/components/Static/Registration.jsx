import { useState } from 'react';
import styled from 'styled-components';
import Reveal from '../../images/password/reveal.svg';
import Hide from '../../images/password/hide.svg';
import Close from '../../images/icon/close.svg';
import { customAxios } from '../../customAxios';

export default function Registration(props) {
    const [isHide, setIsHide] = useState(true)
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [account, setAccount] = useState("")
    const [bank, setBank] = useState("none")
    const [alert, setAlert] = useState(0)

    function registration(e) {
        e.preventDefault()

        if (id.length === 0) {
            setAlert(1)
            return
        } if (password.length === 0) {
            setAlert(2)
            return
        } if (account.length === 0) {
            setAlert(3)
            return
        } if (bank === 'none') {
            setAlert(4)
            return
        }

        const userInfo = {
            "userId" : id,
            "userPassword" : password,
            "userAccount" : bank+' '+account,
            "lux" : 250,
        }
        postUserInfo(userInfo)
    }

    async function postUserInfo(userInfo) {
        await customAxios
            .post("/user/register",
                new URLSearchParams(userInfo)
            )
            .then(function () {
                setId("")
                setPassword("")
                setAccount("")
                setBank("none")
                setAlert(0)
                props.close(false)
            })
            .catch(function (error) {
                if (error.response.request.status === 409) {
                    setId("")
                    setAlert(5)
                }
            })
    }

    function change() {
        props.close(false)
        props.change(true)
    }

    return (
        <SRegist>
            <Empty />
            <SBox>
                <BoxHeader>
                    회원 가입 / 로그인
                </BoxHeader>
                <Switch>
                    <Selected>가입</Selected>
                    <Unselected onClick={() => change()}>로그인</Unselected>
                </Switch>
                <SForm>
                    <Form>
                        <Legend>아이디</Legend>
                        <Input
                            name='id'
                            value={id}
                            placeholder='아이디'
                            onChange={e => setId(e.target.value)}
                            autoComplete='off'
                        />
                        {alert === 1 && <Alert>아이디를 작성해주세요.</Alert>}
                        {alert === 5 && <Alert>중복된 아이디입니다.</Alert>}
                    </Form>
                    <Form>
                        <Legend>패스워드</Legend>
                        <Wrap>
                            <Input
                                id='password'
                                value={password}
                                type={isHide ? 'password' : 'text'}
                                autoComplete='off'
                                onChange={e => setPassword(e.target.value)}
                            />
                            <HideButton
                                src={isHide ? Hide : Reveal}
                                onClick={() => setIsHide(!isHide)}
                            />
                        </Wrap>
                        {alert === 2 && <Alert>패스워드를 작성해주세요.</Alert>}
                    </Form>
                    <Form>
                        <Legend>계좌번호</Legend>
                        <Input
                            name='account'
                            value={account}
                            placeholder='계좌번호'
                            onChange={e => setAccount(e.target.value)}
                            autoComplete='off'
                        />
                        <ToRight>
                            <SelectBank name='bank' value={bank} onChange={e => setBank(e.target.value)}>
                                <option value='none'>--- 은행명 ---</option>
                                <option value='NH농협'>NH농협</option>
                                <option value='카카오뱅크'>카카오뱅크</option>
                                <option value='KB국민은행'>KB국민</option>
                                <option value='신한은행'>신한</option>
                                <option value='토스뱅크'>토스뱅크</option>
                                <option value='우리은행'>우리</option>
                                <option value='IBK기업은행'>IBK기업</option>
                                <option value='하나은행'>하나</option>
                                <option value='MG새마을금고'>새마을</option>
                                <option value='부산은행'>부산</option>
                                <option value='대구은행'>대구</option>
                                <option value='케이뱅크'>케이뱅크</option>
                                <option value='신협'>신협</option>
                                <option value='우체국'>우체국</option>
                                <option value='SC제일은행'>SC제일</option>
                                <option value='경남은행'>경남</option>
                                <option value='광주은행'>광주</option>
                                <option value='수협은행'>수협</option>
                                <option value='전북은행'>전북</option>
                                <option value='저축은행'>저축은행</option>
                                <option value='제주은행'>제주</option>
                                <option value='씨티은행'>씨티</option>
                                <option value='KDB산업은행'>KDB산업</option>
                                <option value='산림조합'>산림조합</option>
                                <option value='SBI저축은행'>SBI저축은행</option>
                                <option value='BOA은행'>BOA</option>
                                <option value='중국은행'>중국</option>
                                <option value='HSBC은행'>HSBC</option>
                                <option value='중국공상은행'>중국공상</option>
                                <option value='도이치은행'>도이치</option>
                                <option value='JP모건체이스은행'>JP모건</option>
                                <option value='BNP파리바은행'>BNP파리바</option>
                                <option value='중국건설은행'>중국건설</option>
                            </SelectBank>
                            {alert === 4 && <Alert1>은행을 선택해주세요</Alert1>}
                        </ToRight>
                        {alert === 3 && <Alert>계좌번호를 작성해주세요.</Alert>}
                    </Form>
                    <Submit
                        type='submit'
                        onClick={e => registration(e)}
                    >가입</Submit>
                </SForm>
            </SBox>
            <Empty>
                <CloseButton
                    src={Close}
                    onClick={() => props.close(false)}
                />
            </Empty>
        </SRegist>
    )
}

const SRegist = styled.div`
    width: 100vw;
    max-height: max-content;
    min-height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    background-color: #00000030;
    display: flex;
    justify-content: center;
    font-family: "Pretendard";
    cursor: default;
    z-index: 10;
`;

const SBox = styled.div`
    width: 500px;
    height: 620px;
    margin: auto 0;
    background-color: #ffffff;
`;

const BoxHeader = styled.div`
    width: 100%;
    height: 60px;
    background-color: #FDF7F5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`;

const Switch = styled.div`
    display: flex;
    width: 60%;
    margin: auto;
    margin-top: 32px;
    align-items: center;
    justify-content: space-evenly;
    gap: 8px;
    cursor: pointer;
`;

const Selected = styled.div`
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    line-height: 44px;
    border-bottom: 1px solid black;
    transition: 0.1s;
    &:hover {
        margin-top: -6px;
        line-height: 50px;
    }
`;

const Unselected = styled.div`
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    line-height: 44px;
    color: #9a9a9a;
    transition: 0.1s;
    &:hover {
        margin-top: -6px;
        line-height: 50px;
    }
`;

const SForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 50%;
    margin: 28px auto;
    gap: 32px;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Legend = styled.div`
    font-size: 17px;
`;

const Input = styled.input`
    width: calc(100% - 24px);
    height: 24px;
    padding: 8px 12px;
    font-size: 15px;
    border: 1px solid #9a9a9a;
`;

const Wrap = styled.div`
    display: flex;
    position: relative;
`;

const HideButton = styled.img`
    position: absolute;
    right: 12px;
    top: 14px;
    cursor: pointer;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
`;

const ToRight = styled.div`
    display: flex;
    justify-content: right;
`;

const SelectBank = styled.select`
    width: 40%;
    height: 40px;
    padding: 4px;
    margin-right: 0;
    font-size: 15px;
    border: 1px solid #9a9a9a;
    cursor: pointer;
`;

const Submit = styled.button`
    background-color: white;
    border: 1px solid black;
    border-radius: 30px;
    font-size: 20px;
    padding: 8px;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        background-color: #FDF8F5;
    }
`;

const Empty = styled.div`
    width: 20px;
    margin: 20px;
`;

const CloseButton = styled.img`
    width: 20px;
    margin-top: 50px;
    @media (max-height: 618px) {
        margin-top: 0;
    }
    cursor: pointer;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
`;

const Alert = styled.div`
    position: absolute;
    width: 300px;
    text-align: right;
    color: red;
    font-size: 12px;
    font-weight: bold;
    line-height: 16px;
`;

const Alert1 = styled.div`
    position: absolute;
    width: 220px;
    text-align: left;
    color: red;
    font-size: 12px;
    font-weight: bold;
    line-height: 16px;
`;