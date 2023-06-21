import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../Components/Config/Config";
import "./UsersPage.css"

import { Link } from "react-router-dom"

const UsersPage = () => {

  const [users, setUsers] = useState("")

  useEffect(() => {
    axios.get(`${API_URL}/users?_embed=posts`)
      .then(res => setUsers(res.data))
  }, [])

  if (!users) {
    return ""
  }
  let usersList = users.map(user => (
    <li key={user.id}>
      <Link to={`./${user.id}`} > {user.name} ({user.posts.length} posts) </Link>
      <button onClick={() => deleteHandler(user.id)}>Delete</button>
      <Link to={`../UserForm/${user.id}`}><button >Edit</button></Link>
    </li>
  ))

  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/users/${id}`)
    setUsers(prevState => {
      let newState = [...prevState]
      return newState.filter(((user) => user.id !== id))
    })
  }
  return (
    <div id="users-list">
      <Link className="user-form-link" to="../UserForm">Create new user</Link>
      <ul>{usersList}</ul>
    </div>
  )
}

export default UsersPage