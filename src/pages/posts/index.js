import { useEffect, useMemo, useState } from "react";
import AutoCompleteSearchbar from "../../components/Autocomplete/AutoCompleteSearchbar";
import PostCard from "../../components/PostCard";
import useFetch from "../../hooks/useFetch";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { endpoints, PAGES } from "../../shared/constants";
import { getElementsPageWise, getPostsWithAuthorInfo } from "../../shared/utils";
import './styles.css'

const Posts = () => {
    const { callApi: callPostsApi, data: fetchedPosts } = useFetch();
    const { callApi: callUserApi, data: fetchedUsers } = useFetch();
    const { elementRef, currentPage } = useInfiniteScroll();
    const [postInfo, setPostInfo] = useState([])
    const [searchedValue, setSearchedValue] = useState('')


    useEffect(() => {
        callPostsApi(endpoints.posts)
        callUserApi(endpoints.users)
    }, [callPostsApi, callUserApi])

    const postsWithAuthorName = useMemo(() => {
        if (fetchedPosts?.length > 0 && fetchedUsers?.length > 0) {
            const data = getPostsWithAuthorInfo(fetchedPosts, fetchedUsers)
            setPostInfo(data)
            return data
        }
        return []
    }, [fetchedPosts, fetchedUsers])

    useEffect(() => {
        if (searchedValue === '')
            setPostInfo(postsWithAuthorName)
    }, [searchedValue])

    const currentPagePosts = useMemo(() =>
        getElementsPageWise(postsWithAuthorName, currentPage), [postsWithAuthorName, currentPage])


    const getPostsOrAuthors = (value) => {
        setSearchedValue(value)
        let suggestions = []
        if (value) {
            for (let i = 0; i < fetchedUsers?.length; i++) {
                if (fetchedUsers[i].name.toLowerCase().includes(value.toLowerCase()))
                    suggestions.push(fetchedUsers[i])
            }

            for (let i = 0; i < fetchedPosts?.length; i++) {
                if (fetchedPosts[i].title.toLowerCase().includes(value.toLowerCase()) || fetchedPosts[i].body.toLowerCase().includes(value.toLowerCase()))
                    suggestions.push(fetchedPosts[i])
            }
        }

        return suggestions
    }

    const handleOptionSelect = (value, id, type) => {
        setSearchedValue(value)
        if (type === 'post') {
            setPostInfo(postsWithAuthorName?.filter(item => item.id === id))
        }
        else {
            setPostInfo(postsWithAuthorName?.filter(item => item.userId === id))
        }
    }

    return (
        <>
            <AutoCompleteSearchbar
                getPostsOrAuthors={getPostsOrAuthors}
                handleOptionSelect={handleOptionSelect}
                searchedValue={searchedValue}
            />
            <div className="container">
                {postInfo?.map((post, index) => {
                    if (index === postInfo?.length - 1)
                        return (
                            <div ref={elementRef} key={post.id}>
                                <PostCard
                                    title={post.title}
                                    body={post.body}
                                    author={post.author}
                                    authorId={post.userId}
                                    postId={post.id}
                                    renderedFrom={PAGES.POSTS}
                                />
                            </div>
                        )
                    else
                        return (
                            <PostCard
                                key={post.id}
                                title={post.title}
                                body={post.body}
                                author={post.author}
                                authorId={post.userId}
                                postId={post.id}
                                renderedFrom={PAGES.POSTS}
                            />
                        )
                })}
            </div>
        </>
    )
}

export default Posts