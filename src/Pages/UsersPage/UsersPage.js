import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../Components/Config/Config";
import "./UsersPage.scss"

import { Link } from "react-router-dom"
import styled from "styled-components";
import { toast } from "react-toastify";

const UsersPage = () => {

  const Button = styled.button`
  color: green;
  cursor: pointer;
  &:hover{
    color: red;
  }
  `
  // const LinkButton = styled(Link)`
  //   appearance: auto;
  //   padding: 1px 6px;
  //   text-rendering: auto;
  //   color: ${props => props.defaultColor};
  //   text-align: center;
  //   background-color: buttonface;
  //   margin: 0em;
  //   border-width: 1px;
  //   border-style: outset;
  //   border-color: buttonborder;
  //   border-image: initial;
  //   border-radius: 3px;
  //   font-size: 14px;
  //   cursor: pointer;
  //   line-height: normal;
  //   &:hover{
  //       color: red;
  //   }
  //   `

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
      <Button onClick={() => deleteHandler(user.id)}>Delete</Button>
      <Link className="button" to={`/UserForm/${user.id}`}>Edit</Link>
    </li>
  ))

  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/users/${id}`)
      .then(() => {
        toast.info("User Deleted")
        setUsers(prevState => {
          let newState = [...prevState]
          return newState.filter(((user) => user.id !== id))
        })
      })
      .catch(res => toast.error(res.message))

  }
  return (
    <div id="users-list">
      <Link className="user-form-link" to="/UserForm">Create new user</Link>
      <ul>{usersList}</ul>
    </div>
  )
}

export default UsersPage