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
  const [nameError, setNameError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [emailError, setEmailError] = useState(false);

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

  const nameHandler = (event) => {
    const value = event.target.value;
    setName(value);
    setNameError(value === "" || value[0] === " ");
  };

  const bodyHandler = (event) => {
    const value = event.target.value;
    setBody(value);
    setBodyError(value === "" || value[0] === " ");
  };

  const emailHandler = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(value === "" || value[0] === " ");
  };

  const newCommentHandler = (event) => {
    event.preventDefault();
    const newComment = {
      name: name,
      body: body,
      email: email,
      postId: Number(id),
    };
    if (name === "" || name[0] === " ") {
      setNameError(true);
      toast.error("Name is Empty or incorrect", { autoClose: 5000 })
      return "";
    }

    if (body === "" || body[0] === " ") {
      setBodyError(true);
      toast.error("Body is Empty or incorrect", { autoClose: 5000 })
      return "";
    }

    if (email === "" || email[0] === " ") {
      setEmailError(true);
      toast.error("Email is Empty or incorrect", { autoClose: 5000 })
      return "";
    }
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
        <label className={`${nameError ? "text-err" : ""}`} htmlFor="name">Name:</label>
        <input className={`${nameError ? "input-err" : ""}`} type="text" id="name" name="name" value={name} onChange={nameHandler} />
      </div>

      <div className="form-control">
        <label className={`${bodyError ? "text-err" : ""}`} htmlFor="body">Comment:</label>
        <textarea className={`${bodyError ? "input-err" : ""}`} id="body" name="body" rows="5" cols="21" value={body} onChange={bodyHandler}></textarea>
      </div>
      <div className="form-control">
        <label className={`${emailError ? "text-err" : ""}`} htmlFor="email">Email:</label>
        <input className={`${emailError ? "input-err" : ""}`} type="email" id="email" name="email" value={email} onChange={emailHandler} />
      </div>
      <input type="submit" value={buttonText} />
    </form>
  )
}

export default CreateEditComment