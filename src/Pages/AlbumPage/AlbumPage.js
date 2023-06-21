
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { API_URL } from "../../Components/Config/Config"
import axios from "axios"
import "react-image-gallery/styles/css/image-gallery.css"
import ReactImageGallery from "react-image-gallery";


const AlbumPage = () => {

  const [album, setAlbum] = useState("")
  const [photos, setPhotos] = useState("")
  const id = useParams().id
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/albums?id=${id}&_embed=photos&_expand=user`)
      .then(res => {
        setAlbum(res.data[0])
        setPhotos(res.data[0].photos)
      })
  }, [id])

  if (!album && !photos) {
    return ""
  }
  let images = []
  const albumTitle = <h3>{album.title}</h3>
  const albumUser = <div><Link to={`../UsersPage/${album.userId}`}>Author: {album.user.name}</Link></div>
  photos.map(photo => images.push({
    original: photo.url, thumbnail: photo.thumbnailUrl,
    description: <>{photo.title}
      <button onClick={() => deleteHandler(photo.id)}> Delete</button></>
  }))

  const addPhotoHandler = () => {
    console.log("veikia")
  }
  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/photos/${id}`)
    setPhotos(prevState => {
      let newState = [...prevState]
      return newState.filter(((photo) => photo.id !== id))
    })
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