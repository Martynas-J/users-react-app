import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../Config/Config";
import axios from "axios";


const AddPhoto = ({ onAddPhoto }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    const [buttonText, setButtonText] = useState("Add new Photo");

    const albumId = useParams().id

    const titleHandler = event => setTitle(event.target.value);
    const urlHandler = event => setUrl(event.target.value);
    const thumbnailUrlHandler = event => setThumbnailUrl(event.target.value);

    const newPhotoHandler = (event) => {
        event.preventDefault();
        const newPhoto = {
            albumId: Number(albumId),
            title,
            url,
            thumbnailUrl
        }
        onAddPhoto(newPhoto)
        setTitle("")
        setUrl("")
        setThumbnailUrl("")
    }
    return (
        <div className="photo-form-wrapper">
            <form className="photo-form" onSubmit={newPhotoHandler}>
                <div className="form-control">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={title} onChange={titleHandler} />
                </div>
                <div className="form-control">
                    <label htmlFor="url">url:</label>
                    <input type="text" id="url" name="url" value={url} onChange={urlHandler} />
                </div>
                <div className="form-control">
                    <label htmlFor="thumbnailUrl">ThumbnailUrl:</label>
                    <input type="text" id="thumbnailUrl" name="thumbnailUrl" value={thumbnailUrl} onChange={thumbnailUrlHandler} />
                </div>
                <input type="submit" value={buttonText} />
            </form>
        </div>
    )
}
// "albumId": 2,
// "id": 79,
// "title": "est vel et laboriosam quo aspernatur distinctio molestiae",
// "url": "https://via.placeholder.com/600/c611a9",
// "thumbnailUrl": "https://via.placeholder.com/150/c611a9"
export default AddPhoto