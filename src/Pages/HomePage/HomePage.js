import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../Components/Config/Config"
import { Link } from "react-router-dom"
import { firstLetterUpperCase } from "../../Components/Functions/Functions"


const HomePage = () => {
    const [posts, setPosts] = useState("")
    const [albums, setAlbums] = useState("")
    const [users, setUsers] = useState("")
    const postsNr = 5
    const albumsNr = 5
    const usersNr = 5

    useEffect(() => {
        axios.get(API_URL + `/posts?_embed=comments&_expand=user`)
            .then(res => setPosts(res.data.slice(-5)))
        axios.get(`${API_URL}/albums?_embed=photos&_expand=user`)
            .then(res => setAlbums(res.data.slice(-albumsNr)))
        axios.get(`${API_URL}/users?_embed=posts&_embed=albums`)
            .then(res => setUsers(res.data.slice(-usersNr)))
    }, [])

    if (!posts || !albums || !users) {
        return ""
    }
    console.log(users)
    const postsList = posts.map(element => (
        <div key={element.id} className="posts-content">
            <h2><Link to={`./PostsPage/${element.id}`}>Title: {firstLetterUpperCase(element.title)}</Link></h2>
            <div><Link to={`./UsersPage/${element.userId}`}>Author: {element.user.name}</Link></div>
            <p>{firstLetterUpperCase(element.body)}</p>
        </div>
    ))
    const albumsList = albums.map(element => (
        <div key={element.id} className="albums-content">
            <h2><Link to={`./AlbumsPage/${element.id}`}>Title: {firstLetterUpperCase(element.title)}</Link></h2>
            <div><Link to={`./UsersPage/${element.userId}`}>Author: {element.user.name}</Link></div>
            <p>
                {firstLetterUpperCase(element.photos[0].title)}
                <Link key={element.id} to={element.photos[0].url}><img src={element.photos[0].thumbnailUrl} /></Link>
            </p>
        </div>
    ))
    const usersList = users.map(element => (
        <div key={element.id} className="albums-content">
            <h2>{element.name}</h2>
            <p>
                Nick: {element.username} is from {element.address.city} city. Has {element.posts.length} posts and {element.albums.length} albums
            </p>
            <span><Link to={`./UsersPage/${element.id}`}> Other about {element.name}</Link></span>
        </div>
    ))

    return (
        <div id="home">
            <h1>API Project Data Introduction</h1>
            <div className="posts-wrap">
                <h1>Last {postsNr} posts</h1>
                {postsList}
            </div>
            <div className="albums-wrap">
                <h1>Last {albumsNr} albums</h1>
                {albumsList}
            </div>
            <div className="users-wrap">
                <h1>Last {usersNr} users</h1>
                {usersList}
            </div>

        </div>
    )
}

export default HomePage