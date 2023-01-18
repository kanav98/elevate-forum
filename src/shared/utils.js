export const getPostsWithAuthorInfo = (posts, users) => {
    return posts?.map(post => {
        const filteredUser = users?.filter(user => user.id === post.userId)
        return { ...post, author: filteredUser?.length > 0 ? filteredUser[0]?.name : '' }
    })
}

export const getCommentsWithUsers = (comments, users) => {
    return comments?.map(comment => {
        const filteredUser = users?.filter(user => user.email === comment.email)
        return { ...comment, userId: filteredUser?.length > 0 ? filteredUser[0]?.id : '' }
    })
}

export const getElementsPageWise = (data, page = 1) => data?.slice((page - 1) * 10, ((page - 1) * 10) + 10)