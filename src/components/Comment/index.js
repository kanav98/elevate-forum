import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

const Comment = ({ name, body, email, userId }) => {
    const navigate = useNavigate()

    const goToUserView = useCallback(() => {
        if (!!userId)
            navigate(`/users/${userId}`)
        else
            alert('No user found with this id, try another one')
    }, [navigate, userId])

    return (
        <div className="comment">
            <div className="comment_header">
                <h3>{name}</h3>
                <p className='comment_email' onClick={goToUserView}>By - {email}</p>
            </div>
            <p>{body}</p>
        </div>
    )
}

export default Comment