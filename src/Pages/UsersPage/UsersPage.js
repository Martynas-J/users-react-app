import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../Components/Config/Config";
import "./UsersPage.css"

import { Link } from "react-router-dom"


const UsersPage = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios.get(`${API_URL}/users?_embed=posts`)
      .then(res => setUsers(res.data))
  }, [])

  let usersList = ""

  if (users) {
    usersList = users.map(user => (
      <li key={user.id}><Link to={`./${user.id}`} > {user.name} ({user.posts.length} posts) </Link></li>
    ))
  }
  return (
    <div id="users-list">
      <ul>{usersList}</ul>

    </div>
  )
}

export default UsersPage