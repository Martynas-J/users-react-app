import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export const SearchAllForm = () => {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate()

  const resetFormHandler = (e) => {
    e.preventDefault()
    setSearchText("")
    navigate(`/SearchPage/${searchText}`);
  }
  return (
    <form>
      <input value={searchText}
        onChange={(event) => setSearchText(event.target.value)} type='text' placeholder='Write text'></input>
      <button onClick={resetFormHandler}>Search</button>
    </form>
  )
}
