import axios from "axios"
import { Fragment, useEffect, useState } from "react"
import { API_URL } from "../../Components/Config/Config"
import { Link, useParams } from "react-router-dom"
import { firstLetterUpperCase } from "../../Components/Functions/Functions"
import Pagination from "rc-pagination"
import '../../assets/index.css';



const PostsPage = () => {
  const [current, setCurrent] = useState(1);

  const [posts, setPosts] = useState("")
  const [length, setLength] = useState("")
  let id = useParams().id

  let text = ""
  if (id) {
    text = `?userId=${id}&`

  } else {
    text = "?"
  }

  useEffect(() => {
    let link = API_URL + `/posts${text}_embed=comments&_expand=user`
    let step = 10
    axios.get(link)
      .then(res => setLength(res.data.length))
    if (current) {
      let start = Math.max((current - 1) * step, 0)
      let end = start + step
      link = API_URL + `/posts${text}_start=${start}&_end=${end}&_embed=comments&_expand=user`
    }
    axios.get(link)
      .then(res => setPosts(res.data))
  }, [current])

  if (!posts) {
    return ""
  }
  console.log(length)
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
  const pageSetHandler = (page) => {
    setCurrent(page);
  }
  return (
    <>
      <Pagination  onChange={pageSetHandler} className="ant-pagination" defaultCurrent={1} total={length} />
      <div id="posts-list">

        <div className="posts">{allPosts}</div>
      </div>
    </>
  )
}

export default PostsPage