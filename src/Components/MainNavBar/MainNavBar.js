import { NavLink, useLocation } from 'react-router-dom';
import "./MainNavBar.css"
import { SearchAllForm } from '../Forms/SearchAllForm';
import SearchByCategoryForm from '../Forms/SearchByCategoryForm';

const MainNavBar = () => {

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
                <SearchAllForm /> : <SearchByCategoryForm />}
        </nav>
    )
}

export default MainNavBar