import { Link, Route, Routes } from "react-router-dom";
import MainNavBar from "./Components/MainNavBar/MainNavBar";
import UsersPage from "./Pages/UsersPage/UsersPage";
import PostsPage from "./Pages/PostsPage/PostsPage";
import AlbumsPage from "./Pages/AlbumsPage/AlbumsPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import UserPage from "./Pages/UserPage/UserPage";
import AlbumPage from "./Pages/AlbumPage/AlbumPage";
import PostPage from "./Pages/PostPage/PostPage";
import HomePage from "./Pages/HomePage/HomePage";
import UserForm from "./Pages/UserForm/UserForm";
import AlbumForm from "./Pages/AlbumForm/AlbumForm";


function App() {
  return (
    <div className="body">
      <MainNavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/UsersPage' element={<UsersPage />} />
        <Route path='/UsersPage/:id' element={<UserPage />} />
        <Route path='/UserForm' element={<UserForm />} />
        <Route path='/UserForm/:id' element={<UserForm />} />
        <Route path='/PostsPage' element={<PostsPage />} />
        <Route path='/PostsPage/:id' element={<PostsPage />} />
        <Route path='/PostPage/:id' element={<PostPage />} />
        <Route path='/AlbumsPage' element={<AlbumsPage />} />
        <Route path='/AlbumsPage/:id' element={<AlbumPage />} />
        <Route path='/AlbumForm' element={<AlbumForm />} />
        <Route path='/AlbumForm/:id' element={<AlbumForm />} />
        <Route path='/SearchPage/' element={<SearchPage />} />
        <Route path='/SearchPage//:category' element={<SearchPage />} />
        <Route path='/SearchPage/:text' element={<SearchPage />} />
        <Route path='/SearchPage/:category' element={<SearchPage />} />
        <Route path='/SearchPage/:text/:category' element={<SearchPage />} />
        <Route path='*' element={
          <div>
            <h1>Page not found</h1>
            <span><Link to='/'>Back To Home Page</Link></span>
          </div>
        } />
      </Routes>
    </div >
  )
}

export default App;
