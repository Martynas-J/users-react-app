
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_URL } from "../../Components/Config/Config"
import axios from "axios"
import "react-image-gallery/styles/css/image-gallery.css"
import ReactImageGallery from "react-image-gallery";


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
  let images = []
  const albumTitle = <h3>{album.title}</h3>
  const albumUser = <div><Link to={`../UsersPage/${album.userId}`}>Author: {album.user.name}</Link></div>
  album.photos.map(element => images.push({original: element.url, thumbnail: element.thumbnailUrl, description: element.title}))

const addPhotoHandler = () => {
  console.log("veikia")
}

  return (
    <div id="album">
      <div>
        {albumTitle}
        <button onClick={addPhotoHandler}>Add Photo</button>
        {albumUser}
        <ReactImageGallery items={images} />
      </div>
    </div>
  )
}

export default AlbumPage