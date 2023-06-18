import { NavLink, useLocation } from 'react-router-dom';
import "./MainNavBar.css"
import { useState } from 'react';
import { categoriesArr } from '../Config/Config';

const MainNavBar = () => {

    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState("")
    const searchAll =
        <form action={`../SearchPage/${searchText}`}>
            <input value={searchText}
                onChange={(event) => setSearchText(event.target.value)} type='text' placeholder='Write text'></input>
            <input type='submit' value="Search"></input>
        </form>
    const searchByCategory =
        <form action={`../SearchPage/${searchText}`}>
            <input value={searchText}
                onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Write text'></input>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categoriesArr.map((item, index) => <option key={index}>{item}</option>)}
            </select>
            <input type='submit' value="Search"></input>
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