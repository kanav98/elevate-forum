import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import BackToAllPosts from "../../components/BackToAllPosts";
import Comment from "../../components/Comment";
import PostCard from "../../components/PostCard"
import useFetch from "../../hooks/useFetch";
import { endpoints, PAGES } from "../../shared/constants"
import { getCommentsWithUsers } from "../../shared/utils";

const PostView = () => {
    const { postId } = useParams();
    const { callApi: callCommentsApi, data: commentsOnPost } = useFetch()
    const { callApi: getPostFromId, data: postInfo } = useFetch()
    const { callApi: callUserApi, data: fetchedUsers } = useFetch();

    useEffect(() => {
        if (postId)
            getPostFromId(endpoints.posts, `/${postId}`)
    }, [getPostFromId, postId])

    useEffect(() => {
        if (postId)
            callCommentsApi(endpoints.comments, `?postId=${postId}`)

    }, [callCommentsApi, postId, callUserApi])

    useEffect(() => {
        callUserApi(endpoints.users)
    }, [callUserApi])

    const postWithUserInfo = useMemo(() => {
        if (fetchedUsers?.length > 0 && postInfo) {
            const filtereduser = fetchedUsers?.filter(user => user.id === postInfo?.userId)
            return { ...postInfo, author: filtereduser?.length > 0 ? filtereduser[0].name : '' }
        }
        return {}
    }, [fetchedUsers, postInfo])

    const commentsWithUserInfo = useMemo(() => {
        if (commentsOnPost?.length > 0 && fetchedUsers?.length > 0)
            return getCommentsWithUsers(commentsOnPost, fetchedUsers)
        return []
    }, [commentsOnPost, fetchedUsers])

    return (
        <div>
            <BackToAllPosts />
            <PostCard
                title={postWithUserInfo?.title}
                body={postWithUserInfo?.body}
                postId={postWithUserInfo?.id}
                authorId={postWithUserInfo?.userId}
                author={postWithUserInfo?.author}
                renderedFrom={PAGES.POSTVIEW}
            />
            <div>
                {commentsWithUserInfo?.map(comment =>
                    <Comment
                        key={comment?.id}
                        name={comment?.name}
                        body={comment?.body}
                        email={comment?.email}
                        userId={comment?.userId}
                    />
                )}
            </div>
        </div>
    )
}

export default PostView