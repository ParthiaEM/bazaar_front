import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { customAxios } from "../customAxios"
import OthersAuction from "./OthersAuction"

export default function Auction({isLoggedIn, userInfo}) {
    const {id} = useParams()
    const [ideaData, setIdeaData] = useState({})

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

    return (
        <>
        {
            ideaData.postedUserId !== userInfo.userUniqueId ?
                <OthersAuction isLoggedIn={isLoggedIn} userInfo={userInfo} /> :
                <></>
        }
        </>
    )
}