import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../Components/Config/Config"
import { Link } from "react-router-dom"


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
    const albumPicture = <Link to={`./${album.id}`}><img src={album.photos[0].thumbnailUrl} /></Link>

    const albumUser = <Link to={`../UsersPage/${album.userId}`}> Author: {album.user.name}</Link>
    const albumPicturesNr = `Picture number: ${album.photos.length}`
    const albumTitle = `${index} Album name: ${album.title}`
    return (
      <div key={album.id}>
        <h3>{albumTitle}</h3>
        <div>{albumUser}</div>
        <div>{albumPicturesNr}</div>
        {albumPicture}
      </div>
    )
  });

  return (
    <div id="albums-list">
      <div>{allAlbums}</div>
    </div>
  )
}

export default AlbumsPage