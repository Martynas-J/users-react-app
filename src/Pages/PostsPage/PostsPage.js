import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { API_URL } from "../../Components/Config/Config"
import { Link, useParams } from "react-router-dom"
import { firstLetterUpperCase } from "../../Components/Functions/Functions"

const PostsPage = () => {

  const [posts, setPosts] = useState("")
  let id = useParams().id

  let text = ""
  if (id) {
    text = `?userId=${id}&`

  } else {
    text = "?"
  }

  useEffect(() => {
    axios.get(API_URL + `/posts${text}_embed=comments&_expand=user`)
      .then(res => setPosts(res.data))
  }, [id])

  if (!posts) {
    return ""
  }
  const allPosts = posts.map(element => {
    const postTitle = <Link to={`../PostPage/${element.id}`}>Title: {firstLetterUpperCase(element.title)}</Link>
    const postUser = <Link to={`../UsersPage/${element.userId}`}>Author: {element.user.name}</Link>
    const postComments = <span>({element.comments.length} Comments)</span>
    return (
      <Fragment key={element.id}>
        <h4>{postTitle}{postComments}</h4>
        <span>{postUser}</span>
      </Fragment>
    )
  });

  return (
    <div id="posts-list">
      <div className="posts">{allPosts}</div>
    </div>
  )
}

export default PostsPage