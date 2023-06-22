import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../Components/Config/Config"
import { Link } from "react-router-dom"
import classes from "./AlbumsPage.module.scss"
import { toast } from "react-toastify"


const AlbumsPage = () => {

  const [albums, setAlbums] = useState([])
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

    const albumUser = <Link to={`/UsersPage/${album.userId}`}> Author: {album.user.name}</Link>
    const albumPicturesNr = album.photos.length > 0 && `Picture number: ${album.photos.length}`
    const albumTitle = <Link to={`./${album.id}`}>{index} Album name: {album.title}</Link>
    return (
      <div key={album.id}>
        <h3>{albumTitle}</h3>
        <div>{albumUser}</div>
        <div>{albumPicturesNr}</div>
        {albumPicture}
        <div className={classes.albumsButton}>
          <button onClick={() => deleteHandler(album.id)}>Delete</button>
          <Link className="button" to={`/AlbumForm/${album.id}`}>Edit</Link>
        </div>

      </div>
    )
  })
  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/albums/${id}`)
      .then(() => {
        toast.info("Album Deleted")
        setAlbums(prevState => {
          let newState = [...prevState]
          return newState.filter(((albums) => albums.id !== id))
        })
      })
      .catch(res => toast.error(res.message))
  }
  return (
    <div id="albums-list">
      <Link className="album-form-link" to="/AlbumForm">Create new album</Link>
      <div>{allAlbums}</div>
    </div>
  )
}

export default AlbumsPage 