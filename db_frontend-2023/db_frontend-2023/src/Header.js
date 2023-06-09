import React, { useEffect, useState } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Route, Link, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import CreatePost from './blog/CreatePost';
import Posts from './blog/Posts';
import Logout from './auth/Logout';
import Cookies from 'js-cookie';
import PostsByTitle from './blog/PostsByTitle';
import LoginRegister from './auth/LoginRegister';

export default function Header() {

  const [logged_in, setLoggedIn] = useState(false);
  const [cookie_name, setCookieName] = useState('Guest');

  useEffect(() => {
    getCookieDataAndSetState();
    handleLoggedIn(logged_in);
  }, [logged_in]);

  const getCookieDataAndSetState = () => {
    let id = Cookies.get('userid');
    let name = Cookies.get('username');

    if (id !== undefined && name !== undefined) {
      setCookieName(name);
    }
    else {
      setCookieName('Guest');
    }
  };

  function handleLoggedIn(signedIn) {
    setLoggedIn(signedIn);
  };

  return (
    <div>
      <div>
        <h3 className="username">USER: {cookie_name}</h3>
        <hr></hr>
      </div>
    
        <div>
          <Navbar bg="dark" variant="dark">
            <Nav>
              {!logged_in ?
                <NavItem><Link to="/user/register">Register</Link> / <Link to="/user/login">Login</Link></NavItem>
                : <NavItem><Link to="/user/logout">Logout</Link></NavItem>}
              <NavItem><Link to="/">Display Posts</Link></NavItem>
              <NavItem><Link to="/create">Create Post</Link></NavItem>
              <NavItem><Link to="/searchByTitle">Search By Title</Link></NavItem>

            </Nav>
          </Navbar>
          <Routes>
            <Route path='/' element={<Posts/>}/>
            <Route path="create" element={<CreatePost />} />
            <Route path="searchByTitle" element={<PostsByTitle />} />
            <Route path="user/register" element={<LoginRegister is_register={true} handleLoggedIn={handleLoggedIn} />} />
            <Route path="user/login" element={<LoginRegister is_register={false} handleLoggedIn={handleLoggedIn} />} />
            <Route path="user/logout" element={<Logout handleLoggedIn={handleLoggedIn} />} />
            <Route path="post/:post_id" element={<Posts />} />
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
    
    </div>
  );
}