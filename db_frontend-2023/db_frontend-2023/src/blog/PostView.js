import React from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { TextArea } from 'semantic-ui-react';

export default function PostView(props) {
    // This is a Presentational Layer component
    // It is used by the UpdatePostContainer component
    // which is known as a Container component
    // This can also be used anywhere this Form is required
    // such as in CreatePost.js

    const { title, postID, btnText, hide } = props; // destructuring some of the passed props for demo purposes
    return (
        <div>
            <div className="Body">
                <p>&nbsp;</p>
                <Form inline="false" onSubmit={props.handleSubmit}>
                    {!hide &&
                        <FormGroup controlId="postid">
                            <FormControl type="label" htmlFor="postid" value="Post ID" readOnly tabIndex="-1" />
                            <FormControl type="text" readOnly value={postID} placeholder="Post ID"
                                name="postid" />
                        </FormGroup>
                    }
                    <FormGroup controlId="title">
                        <FormControl type="label" htmlFor="title" value="Title" readOnly tabIndex="-1" />
                        <FormControl type="text" value={title} placeholder="Title"
                            name="title"
                            onChange={props.handleChangeTitle} /></FormGroup>
                    <FormGroup controlId="contentLabel">
                        <FormControl type="label" htmlFor="content" value="Content" readOnly tabIndex="-1" className="contentLabel" />

                        <TextArea name="content" placeholder="Post Content" rows="7" columns="100"
                            value={props.content}
                            onChange={props.handleChangeContent} ></TextArea>
                    </FormGroup>
                    <p>&nbsp;</p>
                    <Button type="submit">{btnText}</Button>
                    <p>&nbsp;</p>
                </Form>
            </div>
        </div>
    );
}

