import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PAGES } from '../../shared/constants'
import './styles.css'

const PostCard = ({ title = 'Title', body = 'body', author = 'author', authorId, postId, renderedFrom }) => {
    const navigate = useNavigate()
    const styleClass = useMemo(() => renderedFrom === PAGES.POSTS ? 'post-card' : 'single-post', [renderedFrom])

    const goToPostView = useCallback(() => {
        navigate(`/posts/${postId}`)
    }, [navigate, postId])

    const goToUserView = useCallback((e) => {
        e.stopPropagation()
        if (!!authorId)
            navigate(`/users/${authorId}`)
        else
            alert('No author could be found with this id.')
    }, [navigate, authorId])

    return (
        <div className={styleClass} onClick={goToPostView}>
            <h2>{title}</h2>
            <p>{body}</p>
            <p className='post-author' onClick={goToUserView}>Author - {author}</p>
        </div>
    )
}

export default PostCard