import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../Components/Config/Config";
import { firstLetterUpperCase } from "../../Components/Functions/Functions"

const UserPage = () => {

    const [user, setUser] = useState([])
    const id = useParams().id
    let posts = ""
    let albums = ""

    useEffect(() => {
        axios.get(`${API_URL}/users/${id}/?_embed=posts&_embed=albums`)
            .then(res => setUser(res.data))
    }, [id])

    if (user.length === 0) {
        return ""
    }
    const name = <li><b>Name:</b> {user.name}</li>
    const nick = <li><b>Nick:</b> {user.username}</li>
    const email = <li><b>Email:</b> {user.email}</li>

    const addressText = <>{user.address.street} St., {user.address.suite}, {user.address.city}, {user.address.zipcode}</>
    const addressLink = <Link to={`https://www.google.com/maps/place/37%C2%B018'57.2%22S+81%C2%B008'58.6%22E/@${user.address.geo.lat},${user.address.geo.lng},17z/data=!4m4!3m3!8m2!3d-37.3159!4d81.1496`}>{addressText}</Link>
    const address = <li><b> Address: </b>{addressLink}</li>

    const phone = <li><b>Phone:</b> {user.phone}</li>
    const website = <li><b>Website:</b> {user.website}</li>
    const company = <li><b>Company:</b> {user.company.name}</li>
    const userData = <ul>{name}{nick}{email}{address}{phone}{website}{company}</ul>

    if (user.posts.length > 0) {
        posts = user.posts.map(element => <h4 key={element.id}><Link to={`../PostPage/${element.id}`} >Title: {firstLetterUpperCase(element.title)}</Link></h4>
        );
    } else {
        posts = "Empty"
    }
    if (user.albums.length > 0) {
        albums = user.albums.map(element => <h4 key={element.id}><Link to={`../AlbumsPage/${element.id}`}>Title: {firstLetterUpperCase(element.title)}</Link></h4>
        );
    } else {
        albums = "Empty"
    }
    return (
        <>
            <h1>Single user </h1>
            <div id="user-data">
                {userData}
                <div>
                    <h2>Posts:</h2>
                    {posts}
                </div>
                <div>
                    <h2>Albums:</h2>
                    {albums}
                </div>
            </div>
        </>
    )
}

export default UserPage