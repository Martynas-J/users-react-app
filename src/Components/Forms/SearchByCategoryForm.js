import { useState } from "react";
import { Link } from "react-router-dom";
import { firstLetterUpperCase } from "../Functions/Functions";
import { categoriesArr } from "../Config/Config";


const SearchByCategoryForm = () => {
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("")

    const resetFormHandler = () => {
        setSearchText("")
    }
  return (
    <form>
    <input value={searchText}
        onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Write text'></input>
    <select className="category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
        {categoriesArr.map((item, index) => <option key={index} value={item}>{firstLetterUpperCase(item)}</option>)}
    </select>
    <Link to={`/SearchPage/${searchText}/${category}`}><button onClick={resetFormHandler}>Search</button> </Link>
</form>
  )
}

export default SearchByCategoryForm