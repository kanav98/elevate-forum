import { useEffect } from "react"
import { useParams } from "react-router-dom"
import BackToAllPosts from "../../components/BackToAllPosts"
import UserInfo from "../../components/UserInfo"
import useFetch from "../../hooks/useFetch"
import { endpoints } from "../../shared/constants"

const Users = () => {
    const { userId } = useParams()
    const { callApi, data } = useFetch()

    useEffect(() => {
        if (!!userId)
            callApi(endpoints.users + `/${userId}`)
    }, [callApi, userId])

    return (
        <div>
            <BackToAllPosts />
            <UserInfo
                fullName={data?.name}
                userName={data?.username}
                email={data?.email}
                address={data?.address}
                phoneNo={data?.phone}
                website={data?.website}
                companyDetails={data?.company}
            />
        </div>
    )

}

export default Users