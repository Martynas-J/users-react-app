import axios from "axios";
import { useState } from "react";
import { API_URL } from "../Config/Config";
import { useParams } from "react-router-dom";


const CreateComment = ({onCommentCreated}) => {
    const id = useParams().id
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const [email, setEmail] = useState('');
  
    const nameHandler = event => setName(event.target.value);
    const bodyHandler = event => setBody(event.target.value);
    const emailHandler = event => setEmail(event.target.value);
  
    const newCommentHandler = (event) => {
      event.preventDefault();
  
      const newComment = {
        name: name,
        body: body,
        email: email,
        postId: Number(id)
      };
      axios.post(`${API_URL}/comments`, newComment)
      onCommentCreated(true)
      setName("")
      setBody("")
      setEmail("")
    }
  
    return (
        <form onSubmit={newCommentHandler}>
          <div className="form-control">
            <label htmlFor="name">Name:</label>
            <input type="name" id="name" name="name" value={name} onChange={nameHandler} />
          </div>
  
          <div className="form-control">
            <label htmlFor="body">Body:</label>
            <textarea id="body" name="body" rows="5" cols="30" value={body} onChange={bodyHandler}></textarea>
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={emailHandler} />
          </div>
          <input type="submit" value="Create new comment" />
        </form>
    )
}

export default CreateComment