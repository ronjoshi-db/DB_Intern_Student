import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import PostView from "./PostView";
import Cookies from "js-cookie";
import BlogDataService from '../services/blog_service';

export default function CreatePost(props) {

    const [post, setPost] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [success, setSuccess] = useState(false);
    const [author_id, setAuthorID] = useState(Cookies.get('userid'));

    function handleSubmit(e) {
        e.preventDefault();
        createPost();
    }

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeContent(e) {
        setContent(e.target.value);
    }

    function createPost() {

        BlogDataService.create({ 'title': title, 'content': content, 'userid': Cookies.get('userid') })
            .then(res => {
                setPost(res.data.post);
                setTitle(res.data.post[3]);
                setContent(res.data.post[4]);
                setAuthorID(res.data.post[1]);
                setSuccess(true);
            })
            .catch(err => {
                setPost([]);
                setTitle('');
                setContent('');
                setSuccess(false);
                console.log(err);
            })
            ;
    }
    return (
        <div>
            {!success &&
                <PostView btnText={`Create Post`} hide={true} handleSubmit={handleSubmit} handleChangeTitle={handleChangeTitle} handleChangeContent={handleChangeContent} />
            }
            {success &&
                <div>
                    <p>Post created successfully by Author ID: {author_id}</p>
                    <p></p>
                    <div>
                        <Link to={`/post/${post[0]}`}>Show Post</Link>
                    </div>
                    <p>&nbsp;</p>
                </div>
            }
        </div>
    );
}