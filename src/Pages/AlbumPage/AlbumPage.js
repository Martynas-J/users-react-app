
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_URL } from "../../Components/Config/Config"
import axios from "axios"
import "react-image-gallery/styles/css/image-gallery.css"
import ReactImageGallery from "react-image-gallery";
import AddPhoto from "../../Components/AddPhoto/AddPhoto"


const AlbumPage = () => {

  const [album, setAlbum] = useState("")
  const [photos, setPhotos] = useState("")
  const [addPhoto, setAddPhoto] = useState(false)

  const id = useParams().id

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

  const addFormHandler = () => {
    setAddPhoto(prevState => !prevState)

  }
  const addPhotoHandler = (newPhoto) => {
    setPhotos(prevState => {
      let newState = [...prevState]
      newState.unshift(newPhoto)
      return newState
    })
    axios.post(`${API_URL}/photos`, newPhoto)
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
        {addPhoto ? <AddPhoto onAddPhoto={addPhotoHandler} /> : ""}
        <button onClick={addFormHandler}>{addPhoto ? "Hide form" : "Photo input form"}</button>
        {albumUser}
        <ReactImageGallery items={images} />
      </div>
    </div>
  )
}

export default AlbumPage