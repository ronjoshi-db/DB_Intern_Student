import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function Logout(props) {

   const [logout_success, setLogoutSuccess] = useState(false);

  useEffect(() => {
    setCookieDataAndSetState();
  },[]);

  const setCookieDataAndSetState = () => {
    let today = new Date().getDate(); //Current Date
    let yesterday = new Date();
    yesterday.setDate(today - 1);

    Cookies.set('userid', '', { expires: yesterday });
    Cookies.set('username', '', { expires: yesterday });

    setLogoutSuccess(true);
    props.handleLoggedIn(false);
  };

  return (

    <div>
      { !logout_success &&
        <div>
          There was a problem logging you out.
      </div>
      }
      { logout_success &&
        <div>
          <h3 className="logout">Logout successful</h3>
          <p></p>
          <p></p>
          <div>
            <Link to={`/`}>Show All Posts</Link>
          </div>
          <div>
            <Link to={`/user/login`}>Login</Link>
          </div>
          <p>&nbsp;</p>
        </div>
      }
    </div>
  );
}

