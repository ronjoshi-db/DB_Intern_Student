import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import PostView from "./PostView";
import Cookies from "js-cookie";
import BlogDataService from '../services/blog_service';
import SuccessMessage from "./SuccessMessage";

export default function DeletePost(props) {

    const [postID, setPostID] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [success, setSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    let { post_id } = useParams();

    useEffect(() => {
        getPostByID(post_id);
    }, [post_id]);

    function handleSubmit(e) {
        e.preventDefault();
        deletePost();
    }

    function getPostByID(postID) {
        BlogDataService.get(postID)
            .then(res => {
                setPostID(postID);
                setTitle(res.data.post[3]);
                setContent(res.data.post[4]);
                setSuccess(true);
            })
            .catch(err => {
                setPostID(postID);
                setTitle('');
                setContent('');
                setSuccess(false);
                console.log(err);
            });
    }

    function deletePost() {
        BlogDataService.delete(postID)
            .then(res => {
                setPostID(postID);
                setTitle('');
                setContent('');
                setDeleteSuccess(true);
            })
            .catch(err => {
                setPostID(postID);
                setTitle('');
                setContent('');
                setDeleteSuccess(false);
                console.log(err);
            })
            ;
    }
    return (
        <div>
            {!success && !deleteSuccess &&
                <PostView content={content} title={title} postID={postID} btnText={`Confirm Delete Post`} hide={true} handleSubmit={handleSubmit} />
            }
            {deleteSuccess &&
                <SuccessMessage postID={postID} action={`delete`} link={`/`} link_text={`Show all posts`}></SuccessMessage>
            }
        </div>
    );
}