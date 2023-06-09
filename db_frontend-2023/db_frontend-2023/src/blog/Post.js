import React from 'react';
import Moment from 'react-moment';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';

export default function Post(props) {
  const navigate = useNavigate();

  // Add handlers to execute the edit/delete button actions
  
  return (
    <>
      <article className="post">
        <header>
          <div>
            <h3 key={props.post[0]}>Post ID: {props.post[0]}</h3>
            <h1 className="body">{props.post[3]}</h1>
            <div className="about">by <strong>{props.post[5]}</strong> on <Moment>{props.post[2]}</Moment></div>
          </div>
          {Cookies.get('userid') === String(props.post[1]) &&
            <div>
              {/* Add some functionality here to handle a post being updated or deleted, buttons would useful */}
            </div>
          }
        </header>
        <p className="body postBody">{props.post[4]}</p>
        <hr />
      </article>
    </>
  );
}
