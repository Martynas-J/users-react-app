import { useState } from "react";
import { Link } from "react-router-dom";


export const SearchAllForm = () => {
    const [searchText, setSearchText] = useState("");

    const resetFormHandler = () => {
        setSearchText("")
    }
  return (
    <form>
        <input value={searchText}
            onChange={(event) => setSearchText(event.target.value)} type='text' placeholder='Write text'></input>
        <Link to={`/SearchPage/${searchText}`}><button onClick={resetFormHandler}>Search</button> </Link>
    </form>
  )
}
