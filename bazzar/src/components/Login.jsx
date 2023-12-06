import { useState } from 'react';
import styled from 'styled-components';
import Reveal from '../images/password/reveal.svg';
import Hide from '../images/password/hide.svg';
import Close from '../images/close.svg';
import { customAxios } from '../customAxios';
import { setCookie } from '../cookies';

export default function Login(props) {
    const [isHide, setIsHide] = useState(true)
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState(0)

    function login(e) {
        e.preventDefault()

        if (id.length === 0) {
            setAlert(1)
            return
        } if (password.length === 0) {
            setAlert(2)
            return
        }

        const userInfo = {
            "userId" : id,
            "userPassword" : password,
        }
        postUserInfo(userInfo)
    }

    async function postUserInfo(userInfo) {
        await customAxios
            .post("/user/login",
                new URLSearchParams(userInfo)
            )
            .then(function (response) {
                if (response.data.login === 'failed') {
                    setAlert(3)
                    return
                }
                props.setUserInfo(response.data.userInfo)
                setCookie('token', response.data.accessToken, {path: '/', httponly: true})
                setId("")
                setPassword("")
                setAlert(0)
                props.setIsLoggedIn(true)
                props.close(false)
            })
            .catch(function () {
                setAlert(3)
            })
    }

    function change() {
        props.close(false)
        props.change(true)
    }

    return (
        <SLogin>
            <Empty />
            <SBox>
                <BoxHeader>
                    회원 가입 / 로그인
                </BoxHeader>
                <Switch>
                    <Unselected onClick={() => change()}>가입</Unselected>
                    <Selected>로그인</Selected>
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
                    </Form>
                    <Form>
                        <Legend>패스워드</Legend>
                        <Wrap>
                            <Input
                                name='password'
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
                    <Submit
                        type='submit'
                        onClick={e => login(e)}
                    >로그인</Submit>
                </SForm>
                {alert === 3 && <Alert1>로그인에 실패했습니다.</Alert1>}
            </SBox>
            <Empty>
                <CloseButton
                    src={Close}
                    onClick={() => props.close(false)}
                />
            </Empty>
        </SLogin>
    )
}

const SLogin = styled.div`
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
    margin: 60px auto;
    gap: 80px;
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
    position: relative;
    width: 100%;
    text-align: center;
    color: red;
    font-size: 12px;
    font-weight: bold;
    line-height: 16px;
`;