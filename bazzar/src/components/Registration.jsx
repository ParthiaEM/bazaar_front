import { useState } from 'react';
import styled from 'styled-components';
import Reveal from '../images/password/reveal.svg';
import Hide from '../images/password/hide.svg';
import Close from '../images/close.svg';

export default function Registration(props) {
    const [isHide, setIsHide] = useState(false)

    return (
        <SRegist>
            <Empty />
            <SBox>
                <BoxHeader>
                    회원 가입 / 로그인
                </BoxHeader>
                <Switch>
                    <Selected>가입</Selected>
                    <Unselected>로그인</Unselected>
                </Switch>
                <SForm>
                    <Form>
                        <Legend>아이디</Legend>
                        <Input placeholder='아이디' />
                    </Form>
                    <Form>
                        <Legend>패스워드</Legend>
                        <Wrap>
                            <Input
                                type={isHide ? 'password' : 'text'}
                                autoComplete='off'
                            />
                            <HideButton
                                src={isHide ? Hide : Reveal}
                                onClick={() => setIsHide(!isHide)}
                            />
                        </Wrap>
                    </Form>
                    <Form>
                        <Legend>계좌번호</Legend>
                        <Input placeholder='계좌번호' />
                        <ToRight>
                            <SelectBank>
                                <option>은행명</option>
                            </SelectBank>
                        </ToRight>
                    </Form>
                    <Submit>가입</Submit>
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
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    background-color: #00000030;
    display: flex;
    justify-content: center;
    font-family: "Pretendard";
    cursor: default;
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
`;

const Unselected = styled.div`
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    line-height: 44px;
    color: #9a9a9a;
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
`;

const ToRight = styled.div`
    display: flex;
    justify-content: right;
`;

const SelectBank = styled.select`
    width: 30%;
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
`;