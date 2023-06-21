import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../../Components/Config/Config";
import axios from "axios";

const AlbumForm = () => {

  const [user, setUser] = useState('');
  const [album, setAlbum] = useState('');
  const [title, setTitle] = useState('');
  const [users, setUsers] = useState([]);
  const [buttonText, setButtonText] = useState("Create new album");

  const albumId = useParams().id
  const navigate = useNavigate();

  useEffect(() => {
    if (albumId) {
      axios.get(`${API_URL}/albums/${albumId}`)
        .then(res => setAlbum(res.data))
    }
  }, [albumId])

  const titleHandler = event => setTitle(event.target.value);


  const userHandler = event => setUser(event.target.value);

  useEffect(() => {
    axios.get(`${API_URL}/users`)
      .then(res => {
        setUser(res.data[0].id);
        setUsers(res.data);
      });
  }, []);

  useEffect(() => {
    if (album) {
      setButtonText("Save")
      const { userId, title } = album
      setTitle(title)
      setUser(userId);
    }
  }, [user])

  const newAlbumHandler = (event) => {
    event.preventDefault();
    const newAlbum = {
      userId: Number(user),
      title
    }
    if (album) {
      axios.put(`${API_URL}/albums/${albumId}`, newAlbum)
      navigate('../AlbumsPage');
    } else {
      axios.post(`${API_URL}/albums?_embed=photos&_expand=user`, newAlbum)
    }
    setTitle("")
    setUser("");
  }

  return (
    <div className="album-form-wrapper">
      <h1 className="album-data-form">Album Form</h1>
      <form className="album-form" onSubmit={newAlbumHandler}>
        <div className="form-control">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={title} onChange={titleHandler} />
        </div>
        <div className="form-control">
          <label htmlFor="user">User:</label>
          <select className="user-select" id="user" name="user" value={user} onChange={userHandler}>
            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
          </select>
        </div>
        <input type="submit" value={buttonText} />
      </form>
      <Link className="album-form-link" to="../AlbumsPage">Back to albums</Link>
    </div>
  )
}

export default AlbumForm