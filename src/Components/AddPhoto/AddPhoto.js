import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";



const AddPhoto = ({ onAddPhoto }) => {
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [urlError, setUrlError] = useState(false);
    const [thumbnailUrlError, setThumbnailUrlError] = useState(false);

    const albumId = useParams().id

    const titleHandler = event => {
        const value = event.target.value;
        setTitle(value);
        setTitleError(value === "" || value[0] === " ");
    };
    const urlHandler = event => {
        const value = event.target.value;
        setUrl(value);
        setUrlError(value === "" || value[0] === " ");
    };
    const thumbnailUrlHandler = event => {
        const value = event.target.value;
        setThumbnailUrl(value);
        setThumbnailUrlError(value === "" || value[0] === " ");
    };
    const newPhotoHandler = (event) => {
        event.preventDefault();
        const newPhoto = {
            albumId: Number(albumId),
            title,
            url,
            thumbnailUrl
        }
        const returnData = onAddPhoto(newPhoto)
        if (returnData === "title") {
            toast.error("Title is Empty or incorrect", { autoClose: 5000 })
            setTitleError(true)
        } else if (returnData === "url") {
            toast.error("Url is Empty or incorrect", { autoClose: 5000 })
            setUrlError(true)
        } else if (returnData === "thumbnailUrl") {
            toast.error("ThumbnailUrl is Empty or incorrect", { autoClose: 5000 })
            setThumbnailUrlError(true)
        } else {
            toast.success("Photo Added")
            setTitle("")
            setUrl("")
            setThumbnailUrl("")
        }
    }
    return (
        <div className="photo-form-wrapper">
            <form className="photo-form" onSubmit={newPhotoHandler}>
                <div className="form-control">
                    <label className={`${titleError ? "text-err" : ""}`} htmlFor="title">Title:</label>
                    <input className={`${titleError ? "input-err" : ""}`} type="text" id="title" name="title" value={title} onChange={titleHandler} />
                </div>
                <div className="form-control">
                    <label className={`${urlError ? "text-err" : ""}`} htmlFor="url">Url:</label>
                    <input className={`${urlError ? "input-err" : ""}`} type="url" id="url" name="url" value={url} onChange={urlHandler} />
                </div>
                <div className="form-control">
                    <label className={`${thumbnailUrlError ? "text-err" : ""}`} htmlFor="thumbnailUrl">ThumbnailUrl:</label>
                    <input className={`${thumbnailUrlError ? "input-err" : ""}`} type="url" id="thumbnailUrl" name="thumbnailUrl" value={thumbnailUrl} onChange={thumbnailUrlHandler} />
                </div>
                <input type="submit" value="Add new Photo" />
            </form>
        </div>
    )
}
export default AddPhoto