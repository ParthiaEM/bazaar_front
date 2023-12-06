import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { customAxios } from '../customAxios';

export default function ModInfo({userInfo}) {
    const [id, setId] = useState(userInfo.userId)
    const [account, setAccount] = useState(userInfo.userAccount.split(" ")[1])
    const [bank, setBank] = useState(userInfo.userAccount.split(" ")[0])
    const [alert, setAlert] = useState(0)
    const [isChanged, setIsChanged] = useState(false)

    function modify(e) {
        e.preventDefault()

        if (id.length === 0) {
            setAlert(1)
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
            "userAccount" : bank+' '+account,
        }
        postUserInfo(userInfo)
    }

    async function postUserInfo(newUserInfo) {
        await customAxios
            .put("/user/" + userInfo.userUniqueId,
                new URLSearchParams(newUserInfo)
            )
            .then(function () {
                window.location.reload()
            })
            .catch(function (error) {
                if (error.response.request.status === 409) {
                    setAlert(2)
                }
            })
    }

    useEffect(() => {
        if (id !== userInfo.userId || account !== userInfo.userAccount.split(" ")[1] || bank !== userInfo.userAccount.split(" ")[0]) setIsChanged(true)
        else setIsChanged(false)
    }, [id, account, bank, userInfo])

    useEffect(() => {
        if (alert === 2 || (alert === 1 && id.length !== 0)) setAlert(0)
    }, [id, alert])

    useEffect(() => {
        if (alert === 3 && account.length !== 0) setAlert(0)
    }, [account, alert])

    useEffect(() => {
        if (alert === 4 && bank !== "none") setAlert(0)
    }, [bank, alert])

    return (
        <Border>
            <SForm>
                <Form>
                    <Legend>아이디</Legend>
                    <Input
                        name='id'
                        value={id}
                        placeholder={userInfo.userId}
                        onChange={e => setId(e.target.value)}
                        autoComplete='off'
                    />
                    {alert === 1 && <Alert>아이디를 작성해주세요.</Alert>}
                    {alert === 2 && <Alert>중복된 아이디입니다.</Alert>}
                </Form>
                <Form>
                    <Legend>계좌번호</Legend>
                    <Input
                        name='account'
                        value={account}
                        placeholder={userInfo.userAccount.split(" ")[1]}
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
                {isChanged ?
                    <Submit
                        type='submit'
                        onClick={e => modify(e)}
                    >수정</Submit> :
                    <Block disabled={true}>
                        수정
                    </Block>
                }
            </SForm>
        </Border>
    )
}

const Border = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px 60px;
    border: 1px solid black;
    border-radius: 0 20px 20px 0;
    width: 60%;
    gap: 28px;
    @media (max-width: 750px) {
        width: auto;
        border-radius: 0 0 20px 20px;
    }
`

const SForm = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
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
    background-color: #FDF7F5;
    border: none;
    border-radius: 30px;
    font-size: 20px;
    padding: 8px;
    cursor: pointer;
    &:hover {
        background-color: #FFEEE8;
    }
`;

const Block = styled.button`
    background-color: #FDF7F5;
    border: none;
    border-radius: 30px;
    font-size: 20px;
    padding: 8px;
`;

const Alert = styled.div`
    position: absolute;
    width: 200px;
    text-align: right;
    color: red;
    font-size: 12px;
    font-weight: bold;
    line-height: 20px;
`;

const Alert1 = styled.div`
    right: 40%;
    position: absolute;
    text-align: right;
    color: red;
    font-size: 12px;
    font-weight: bold;
    line-height: 40px;
    @media (max-width: 750px) {
        right: 50%;
    }
`;