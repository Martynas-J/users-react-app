import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_URL } from "../../Components/Config/Config"
import axios from "axios"
import { firstLetterUpperCase } from "../../Components/Functions/Functions"


const PostPage = () => {
    const [post, setPost] = useState([])
    const id = useParams().id

    useEffect(() => {
        axios.get(`${API_URL}/posts/${id}/?_embed=comments&_expand=user`)
            .then(res => setPost(res.data))
    }, [id])

    if (post.length === 0) {
        return ""
    }
    
    const postTitle = <h2>{post.title}</h2>
    const postAuthor = <div><Link to={`../UsersPage/${post.userId}`}>Author: {post.user.name}</Link></div>
    const postContent = <p>{firstLetterUpperCase(post.body)}</p>
    const allUserPosts = <span><Link to={`../PostsPage/${post.userId}`}>Other posts by {post.user.name}</Link></span>
    const commentsTitle = <h3>Comments:</h3>
    const allComments = post.comments.map(element => (
        <Fragment key={element.id}>
            <h4>{firstLetterUpperCase(element.name)}</h4>
            <p>{firstLetterUpperCase(element.body)}</p>
            <span>{`Email: ${element.email}`}</span>
        </Fragment>
    ))
    return (
        <div id="post">
            <div>
                {postTitle}
                {postAuthor}
                {postContent}
                {allUserPosts}
                {commentsTitle}
                {allComments}
            </div>
        </div>
    )
}

export default PostPage