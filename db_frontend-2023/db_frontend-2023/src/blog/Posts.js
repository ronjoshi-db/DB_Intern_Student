import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import Post from './Post';
import NoPosts from './NoPosts';
import BlogDataService from '../services/blog_service';
import { useParams } from "react-router-dom";


export default function Posts(props) {

    const [allPosts, setAllPosts] = useState([]);
    const [postID, setPostID] = useState('');
    const [post, setPost] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // used by the links from the SuccessMessage component
    let { post_id } = useParams();


    function getPostUpdatedInfo() {
        // Called when this posts component is rendered
        // Either fetches an individual post

        if (post_id !== undefined) {
            // console.log(post_id);
            getPostByID(post_id);
        }
        // or fetches all the posts as no ID has been entered into the form
        else {
            getPosts();
        }
    }

    useEffect((props) => {
        getPostUpdatedInfo();
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        if (postID === "") {
            setPost('');
            getPosts();
        }
        else {
            getPostByID(postID);
        }
    }

    function getPosts() {
        BlogDataService.getAll()
            .then(res => {
                setAllPosts(res.data.posts);
                setIsLoading(false);
                setPost('');
                setPostID('');
                setError('');
            })
            .catch(err => {
                setPost('');
                setPostID('');
                setIsLoading(false);
                setAllPosts([]);
                setError(err);
                console.log(err);
            });

    }

    function getPostByID(postID) {
        BlogDataService.get(postID)
            .then(res => {
                setPost(res.data.post);
                setPostID(postID);
                setIsLoading(false);
                setError('');
                setAllPosts([]);
            })
            .catch(err => {
                setPost('');
                setPostID('');
                setIsLoading(false);
                setAllPosts([]);
                setError(err);
                console.log(err);
            });
    }

    let listPosts = null;
    let singlePost = null;

    if (allPosts.length !== 0) {
        listPosts = allPosts.map(post =>
            <div key={post[0]}>
                <Post post={post} />
            </div>)
    }

    else if (post !== '') {
        singlePost = <div>
            <Post post={post} />
        </div>;
    }
    return (
        <div className="Body">
            <p>&nbsp;</p>
            <Form inline="true" onSubmit={handleSubmit}>
                <FormGroup controlId="formInlineName">
                    <FormControl type="text" value={postID} placeholder="Enter Post ID"
                        onChange={e => setPostID(e.target.value)} />
                    {' '}
                    <Button type="submit">Search for Posts</Button>
                </FormGroup>
                <p>&nbsp;</p>
            </Form>

            {error &&
                <><h3>No Posts</h3>
                    <NoPosts />
                </>
            }
            {isLoading &&
                <ReactLoading type="spinningBubbles" color="#444" />
            }
            {post && singlePost}
            {!post && listPosts}
        </div>
    );
}
