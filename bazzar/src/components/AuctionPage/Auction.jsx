import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { customAxios } from "../../customAxios"
import MyAuction from "./MyAuction"
import NoAuction from "./NoAuction"
import OthersAuction from "./OthersAuction"

export default function Auction({isLoggedIn, userInfo}) {
    const {id} = useParams()
    const [ideaData, setIdeaData] = useState({})

    async function getIdeaDetails(ID) {
        await customAxios
        .get('/idea/' + ID)
        .then(function (response) {
            setIdeaData(response.data)
        })
        .catch()
    }

    useEffect(() => {
        getIdeaDetails(id)
    }, [id])

    return (
        <>
        {
            ideaData.ideaId === undefined || id === undefined ?
                <NoAuction /> :
            ideaData.postedUserId !== userInfo.userUniqueId ?
                <OthersAuction isLoggedIn={isLoggedIn} userInfo={userInfo} /> :
                <MyAuction />
        }
        </>
    )
}