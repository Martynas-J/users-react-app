
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_URL } from "../../Components/Config/Config"
import axios from "axios"


const AlbumPage = () => {
  const [album, setAlbum] = useState("")
  const id = useParams().id
  useEffect(() => {
    axios.get(`${API_URL}/albums?id=${id}&_embed=photos&_expand=user`)
      .then(res => setAlbum(res.data[0]))
  }, [id])

  if (!album) {
    return ""
  }
  const albumTitle = <h3>{album.title}</h3>
  const albumUser = <div><Link to={`../UsersPage/:${album.userId}`}>Author: {album.user.name}</Link></div>
  const photos = album.photos.map(element => (
    <Link key={element.id} to={element.url}><img src={element.thumbnailUrl} /></Link>
  ))

  return (
    <div id="album">
      <div>
        {albumTitle}
        {albumUser}
        <div>{photos}</div>
      </div>
    </div>
  )
}

export default AlbumPage