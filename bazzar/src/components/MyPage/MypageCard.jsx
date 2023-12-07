import styled from 'styled-components'
import { Link } from 'react-router-dom'

export default function AuctionCard({data}) {
    
    return (
        <Link to={"/auction/"+data.ideaId} style={{color: "black", textDecoration: "none"}}>
            <SAuction>
                <Title>{data.ideaName}</Title>
            </SAuction>
        </Link>
    )
}

const SAuction = styled.div`
    width: calc(100% - 40px);
    background-color: #FDF7F5;
    padding: 0 20px;
    font-size: 20px;
    line-height: 52px;
    border-radius: 12px;
    cursor: pointer;
    transition: 0.1s;
    &:hover {
        margin: 0 -8px 0 8px;
        background-color: #FFEEE8;
        border-radius: 30px;
    };
`

const Title = styled.div`
    transition: 0.1s;
    width: 500px;
    @media (max-width: 1200px) { width: 400px }
    @media (max-width: 1100px) { width: 350px }
    @media (max-width: 1000px) { width: 300px }
    @media (max-width: 950px) { width: 250px }
    @media (max-width: 900px) { width: 200px }
    @media (max-width: 850px) { width: 150px }
    @media (max-width: 800px) { width: 100px }
    @media (max-width: 750px) { width: 300px }
    @media (max-width: 700px) { width: 250px }
    @media (max-width: 650px) { width: 200px }
    @media (max-width: 600px) { width: 150px }
`