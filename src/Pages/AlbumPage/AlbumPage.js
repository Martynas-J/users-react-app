
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { API_URL } from "../../Components/Config/Config"
import axios from "axios"
import "react-image-gallery/styles/css/image-gallery.css"
import ReactImageGallery from "react-image-gallery";
import AddPhoto from "../../Components/AddPhoto/AddPhoto"
import classes from "./AlbumPage.module.scss"
import { toast } from "react-toastify"


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
  const albumUser = <div><Link to={`/UsersPage/${album.userId}`}>Author: {album.user.name}</Link></div>
  photos.map(photo => images.push({
    original: photo.url, thumbnail: photo.thumbnailUrl,
    description: <>{photo.title}
      <button onClick={() => deleteHandler(photo.id)}> Delete</button></>
  }))

  const addFormHandler = () => {
    setAddPhoto(prevState => !prevState)

  }
  const addPhotoHandler = (newPhoto) => {

    axios.post(`${API_URL}/photos`, newPhoto)
      .then(() => {
        toast.success("Photo Added")
        setPhotos(prevState => {
          let newState = [...prevState]
          newState.unshift(newPhoto)
          return newState
        })
      })
      .catch(res => toast.error(res.message))
  }

  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/photos/${id}`)
      .then(() => {
        toast.info("Photo Deleted")
        setPhotos(prevState => {
          let newState = [...prevState]
          return newState.filter(((photo) => photo.id !== id))
        })
      })
      .catch(res => toast.error(res.message))
  }
  return (
    <div id="album">
      <div>
        {albumTitle}
        {addPhoto ? <AddPhoto onAddPhoto={addPhotoHandler} /> : ""}
        <button className={classes.addPhotoButton} onClick={addFormHandler}>{addPhoto ? "Hide form" : "Photo input form"}</button>
        {albumUser}
        <ReactImageGallery items={images} />
      </div>
    </div>
  )
}

export default AlbumPage