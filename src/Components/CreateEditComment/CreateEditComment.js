import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../Config/Config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateEditComment = ({ onCommentCreated, comment }) => {
  const id = useParams().id;
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Create new comment");
  const [localComment, setLocalComment] = useState(comment);

  useEffect(() => {
    if (comment) {
      setButtonText("Save");
      const { name, body, email } = comment;
      setName(name);
      setBody(body);
      setEmail(email);
      setLocalComment(comment);
    }
  }, [comment]);

  const nameHandler = (event) => setName(event.target.value);
  const bodyHandler = (event) => setBody(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);

  const newCommentHandler = (event) => {
    event.preventDefault();
    const newComment = {
      name: name,
      body: body,
      email: email,
      postId: Number(id),
    };
    if (localComment) {
      axios
        .patch(`${API_URL}/comments/${localComment.id}`, newComment)
        .then(() => {
          toast.success("Comment Edited");
          setButtonText("Create new comment");
          setLocalComment(null);
        })
        .catch((res) => toast.error(res.message));
    } else {
      axios
        .post(`${API_URL}/comments`, newComment)
        .then(() => {
          toast.success("Comment Created");
        })
        .catch((res) => toast.error(res.message));
    }
    onCommentCreated(true);
    setName("");
    setBody("");
    setEmail("");
  }
  return (
    <form className="comment-form" onSubmit={newCommentHandler}>
      <div className="form-control">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={nameHandler} />
      </div>

      <div className="form-control">
        <label htmlFor="body">Comment:</label>
        <textarea id="body" name="body" rows="5" cols="21" value={body} onChange={bodyHandler}></textarea>
      </div>
      <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={emailHandler} />
      </div>
      <input type="submit" value={buttonText} />
    </form>
  )
}

export default CreateEditComment