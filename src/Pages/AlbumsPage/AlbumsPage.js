import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../Components/Config/Config"
import { Link } from "react-router-dom"


const AlbumsPage = () => {

  const [albums, setAlbums] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  let allAlbums = ""

  useEffect(() => {
    axios.get(API_URL + `/albums?_embed=photos&_expand=user`)
      .then(res => setAlbums(res.data))
  }, [])

  if (!albums) {
    return ""
  }
  allAlbums = albums.map((album, index) => {
    const albumPicture = album.photos.length > 0 && <Link to={`./${album.id}`}><img src={album.photos[0].thumbnailUrl} /></Link>

    const albumUser = <Link to={`../UsersPage/${album.userId}`}> Author: {album.user.name}</Link>
    const albumPicturesNr = album.photos.length > 0 && `Picture number: ${album.photos.length}`
    const albumTitle = <Link to={`./${album.id}`}>{index} Album name: {album.title}</Link>
    return (
      <div key={album.id}>
        <h3>{albumTitle}</h3>
        <div>{albumUser}</div>
        <div>{albumPicturesNr}</div>
        {albumPicture}
        <button onClick={() => deleteHandler(album.id)}>Delete</button>
        <Link to={`../AlbumForm/${album.id}`}><button >Edit</button></Link>
      </div>
    )
  })
  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/albums/${id}`)
    .catch(err => setErrorMessage(err.message))
    setAlbums(prevState => {
      let newState = [...prevState]
      return newState.filter(((albums) => albums.id !== id))
    })
  }
  return (
    <div id="albums-list">
      {errorMessage}
      <Link className="album-form-link" to="../AlbumForm">Create new album</Link>
      <div>{allAlbums}</div>
    </div>
  )
}

export default AlbumsPage