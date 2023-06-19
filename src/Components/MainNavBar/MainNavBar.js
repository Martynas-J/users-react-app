import { Link, NavLink, useLocation } from 'react-router-dom';
import "./MainNavBar.css"
import { useState } from 'react';
import { categoriesArr } from '../Config/Config';
import { firstLetterUpperCase } from '../Functions/Functions';

const MainNavBar = () => {

    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("")

    const resetFormHandler = () => {
        setSearchText("")
    }

    const searchAll =
        <form>
            <input value={searchText}
                onChange={(event) => setSearchText(event.target.value)} type='text' placeholder='Write text'></input>
            <Link to={`/SearchPage/${searchText}`}><button onClick={resetFormHandler}>Search</button> </Link>
        </form>
    const searchByCategory =
        <form>
            <input value={searchText}
                onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Write text'></input>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categoriesArr.map((item, index) => <option key={index} value={item}>{firstLetterUpperCase(item)}</option>)}
            </select>
            <Link to={`/SearchPage/${searchText}/${category}`}><button onClick={resetFormHandler}>Search</button> </Link>
        </form>

    return (
        <nav className='main-navigation'>
            <ul className='nav-list'>
                <li className='navigation-item'>
                    <NavLink to='/' className='navigation-link'>Home</NavLink>
                </li>
                <li className='navigation-item'>
                    <NavLink to='/UsersPage' className='navigation-link'>Users Page</NavLink>
                </li>
                <li className='navigation-item'>
                    <NavLink to='/PostsPage' className='navigation-link'>Posts Page</NavLink>
                </li>
                <li className='navigation-item'>
                    <NavLink to='/AlbumsPage' className='navigation-link'>Albums Page</NavLink>
                </li>
            </ul>
            {!useLocation().pathname.includes("SearchPage") ?
                searchAll : searchByCategory}
        </nav>
    )
}

export default MainNavBar