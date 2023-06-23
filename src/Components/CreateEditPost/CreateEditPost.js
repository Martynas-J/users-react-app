import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../Config/Config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEditPost = ({ onPostCreated, postToEdit }) => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [user, setUser] = useState("");
  const [buttonText, setButtonText] = useState("Create new comment");
  const [localPostToEdit, setLocalPostToEdit] = useState(postToEdit);
  const [inputTitleErr, setInputTitleErr] = useState(false);
  const [inputBodyErr, setInputBodyErr] = useState(false);

  let inputTitleClass = ""
  let titleTextClass = ""
  let inputBodyClass = ""
  let bodyTextClass = ""

  useEffect(() => {
    axios.get(`${API_URL}/users`).then((res) => {
      setUser(res.data[0].id);
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    if (postToEdit) {
      setButtonText("Save");
      const { title, body, userId } = postToEdit;
      setTitle(title);
      setBody(body);
      setUser(userId);
      setLocalPostToEdit(postToEdit);
    }
  }, [postToEdit]);

  const titleHandler = (event) => {
    const value = event.target.value;
    setTitle(value);
    setInputTitleErr(value === "" || value[0] === " ");
  };
  const bodyHandler = (event) => {
    const value = event.target.value;
    setBody(value);
    setInputBodyErr(value === "" || value[0] === " ");
  };
  const userHandler = (event) => setUser(event.target.value);

  const newPostHandler = (event) => {
    event.preventDefault();
    const newPost = {
      title,
      body,
      userId: Number(user),
    };

    if (title[0] === " " || title === "") {
      setInputTitleErr(true)
      toast.error("Title is Empty or incorrect", { autoClose: 5000 })
      return ""
    }
    if (body[0] === " " || body === "") {
      setInputBodyErr(true)
      toast.error("Body is Empty or incorrect", { autoClose: 5000 })
      return ""
    }

    if (localPostToEdit) {
      setButtonText("Create new comment");
      axios
        .patch(`${API_URL}/posts/${localPostToEdit.id}`, newPost)
        .then(() => {
          toast.success("Post Edited");
          setLocalPostToEdit("");
        })
        .catch((res) => toast.error(res.messages));
    } else {
      axios
        .post(`${API_URL}/posts`, newPost)
        .then(() => toast.success("Post Created"))
        .catch((res) => toast.error(res.message));
    }
    onPostCreated(true);
    setTitle("");
    setBody("");
  }
  if (inputTitleErr) {
    titleTextClass = "text-err"
    inputTitleClass = "input-err"
  }
  if (inputBodyErr) {
    bodyTextClass = "text-err"
    inputBodyClass = "input-err"
  }
  return (
    <form className="post-form" onSubmit={newPostHandler}>
      <div className="form-control">
        <label className={titleTextClass} htmlFor="title">Title:</label>
        <input className={inputTitleClass} type="text" id="title" name="title" value={title} onChange={titleHandler} />
      </div>

      <div className="form-control">
        <label className={bodyTextClass} htmlFor="body">Body:</label>
        <textarea className={inputBodyClass} id="body" name="body" rows="5" cols="21" value={body} onChange={bodyHandler}></textarea>
      </div>

      <div className="form-control">
        <label htmlFor="user">User:</label>
        <select className="user-select" id="user" name="user" value={user} onChange={userHandler}>
          {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
        </select>
      </div>

      <input type="submit" value={buttonText} />

    </form>
  )
}

export default CreateEditPost; 