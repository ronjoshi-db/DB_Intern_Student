import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import Post from './Post';
import NoPosts from './NoPosts';
import BlogDataService from '../services/blog_service';
import { Outlet } from 'react-router-dom';

export default function PostsByTitle(props) {

    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        getPostsByTitle(searchText);
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchText]
    );

    function getPostsByTitle(searchText) {
        BlogDataService.findByTitle(searchText)
            .then(res => {
                setAllPosts(res.data.posts);
                setIsLoading(false);
                setError('');
            })
            .catch(err => {
                setIsLoading(false);
                setAllPosts([]);
                setError(err);
            });

    }

    let listPosts = null;

    if (allPosts.length !== 0) {
        listPosts = allPosts.map(post =>
            <div key={post[0]}>
                <Post post={post} />
            </div>)
    }

    return (
        <div className="Body">
            <p>&nbsp;</p>
            <p>Should display something</p>
            <Form inline="true">
                <FormGroup controlId="formInlineName">
                    <FormControl type="text" value={searchText} placeholder="Enter Title Text to SEARCH"
                        onChange={e => setSearchText(e.target.value)} />
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

            {listPosts}
        </div>
    );
}
