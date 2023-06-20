import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_URL } from "../../Components/Config/Config"
import axios from "axios"
import { firstLetterUpperCase } from "../../Components/Functions/Functions"
import CreateComment from "../../Components/CreateEditComment/CreateEditComment"

const PostPage = () => {
    const [post, setPost] = useState([])
    const [comment, setComment] = useState("")
    const id = useParams().id
    const [isChanged, setIsChanged] = useState(false)

    useEffect(() => {
        axios.get(`${API_URL}/posts/${id}/?_embed=comments&_expand=user`)
            .then(res => setPost(res.data))
        setIsChanged(false)
    }, [id, isChanged])

    if (post.length === 0) {
        return ""
    }

    const postTitle = <h2>{post.title}</h2>
    const postAuthor = <div>
        <Link to={`../UsersPage/${post.userId}`}>Author: {post.user.name}</Link></div>
    const postContent = <p>{firstLetterUpperCase(post.body)}</p>
    const allUserPosts = <span><Link to={`../PostsPage/${post.userId}`}>Other posts by {post.user.name}</Link></span>
    const commentsTitle = <h3>Comments:</h3>
    const allComments = post.comments.map(element => (
        <Fragment key={element.id}>
            <h4>{firstLetterUpperCase(element.name)}</h4>
            <p>{firstLetterUpperCase(element.body)}</p>
            <span>
                {`Email: ${element.email}`}
                <button onClick={() => deleteHandler(element.id)}>Delete</button>
                <button onClick={() => editHandler(element.id)}>Edit</button>
                </span>

        </Fragment>
    ))
    const CommentCreatedHandler = () => {
        setIsChanged(true)
    }
    const deleteHandler = (id) => {
        axios.delete(`${API_URL}/comments/${id}`)
        setIsChanged(true)
    }
    const editHandler = (id) => {
        const editComment = post.comments.find(((post) => post.id === id))
        setComment(editComment)
    }
    return (
        <div id="post">
            <div>
                {postTitle}
                {postAuthor}
                {postContent}
                {allUserPosts}
                {commentsTitle}
                {allComments}
                <CreateComment comment ={comment}  onCommentCreated={CommentCreatedHandler} />
            </div>
        </div>
    )
}

export default PostPage