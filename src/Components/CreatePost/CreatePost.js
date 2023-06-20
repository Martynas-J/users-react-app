
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../Config/Config";

const CreatePost = ({onPostCreated}) => {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/users`)
      .then(res => {
        setUser(res.data[0].id);
        setUsers(res.data);
      });
  }, [title, body]);

  const titleHandler = event => setTitle(event.target.value);
  const bodyHandler = event => setBody(event.target.value);
  const userHandler = event => setUser(event.target.value);

  const newPostHandler = (event) => {
    event.preventDefault();
    const newPost = {
      title: title,
      body: body,
      userId: Number(user)
    };
    axios.post(`${API_URL}/posts`, newPost)
    onPostCreated(true)
    setTitle("")
    setBody("")
  }

  return (
    <form onSubmit={newPostHandler}>
      <div className="form-control">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={titleHandler} />
      </div>

      <div className="form-control">
        <label htmlFor="body">Body:</label>
        <textarea id="body" name="body" rows="5" cols="30" value={body} onChange={bodyHandler}></textarea>
      </div>

      <div className="form-control">
        <label htmlFor="user">User:</label>
        <select id="user" name="user" value={user} onChange={userHandler}>
          {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
        </select>
      </div>

      <input type="submit" value="Create new post" />
    </form>
  )
}

export default CreatePost;