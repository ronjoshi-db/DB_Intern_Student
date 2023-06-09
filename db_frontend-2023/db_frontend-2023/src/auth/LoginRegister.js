import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import BlogDataService from '../services/blog_service';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';


export default function LoginRegister(props) {

    let isRegister = props.is_register;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [register_success, setRegisterSuccess] = useState(false);
    const [login_success, setLoginSuccess] = useState(false);
    const [login_error, setLoginError] = useState(false);
    const [register_error, setRegisterError] = useState(false);

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        setLoginError(false);
        setRegisterError(false);
        setIsLoading(true);
        if (isRegister) {
            register();
        }
        else {

            login();

        }
    }

    function register() {
        console.log("The start of the REGISTER function");

        BlogDataService.register({ 'username': username, 'password': password })
            .then(res => {

                setIsLoading(false);
                // setUsername(res.data.user);
                setRegisterSuccess(true);
                setRegisterError(false);
                login();

            })
            .catch(err => {
                setUsername('');
                setPassword('');
                setIsLoading(false);
                setRegisterSuccess(false);
                setRegisterError(true);
                console.log(err);
            })
            ;
    }

    function login() {
        console.log("The start of the LOGIN function");
        BlogDataService.login({ 'username': username, 'password': password })
            .then(res => {

                Cookies.set('userid', res.data.id);
                Cookies.set('username', res.data.username);
                setLoginError(false);
                setUsername(res.data.username);
                setIsLoading(false);
                setLoginSuccess(true);
                props.handleLoggedIn(true);
            })
            .catch(err => {
                setUsername('');
                setPassword('');
                setIsLoading(false);
                setLoginSuccess(false);
                setLoginError(true);
            })
    }

    return (
        <div>
            {isRegister ? <h1>Register</h1> : <h1>Login</h1>}
            {!register_success &&
                <div className="Body">
                    <p>&nbsp;</p>
                    <Form inline="false" onSubmit={handleSubmit}>

                        <FormGroup>
                            <FormControl type="label" htmlFor="username" value="User name" readOnly tabIndex="-1" />
                            <FormControl type="text" value={username} placeholder="Username" name="username"
                                onChange={e => setUsername(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <FormControl type="label" htmlFor="password" value="Password" className="labelTop" readOnly tabIndex="-1" />
                            <FormControl type="password" value={password} placeholder="Password" name="password"
                                onChange={e => setPassword(e.target.value)} />
                        </FormGroup>
                        <p>&nbsp;</p>
                        {isRegister ? <Button type="submit">Register</Button> : <Button type="submit">Login</Button>}
                        <p>&nbsp;</p>
                    </Form>
                </div>}
            {isLoading &&
                <ReactLoading type="spinningBubbles" color="#444" />}

            {isRegister && register_error &&
                <div className="danger">
                    <p>There was a problem registering.</p><p>Please supply both a username and a password.</p>
                    <p>The username you supplied may already be in use.</p>
                    <p>&nbsp;</p>
                </div>}

            {!isRegister && login_error &&
                <div className="danger">
                    <p>There was a problem logging in.</p><p>Please try again.</p>
                    <p>&nbsp;</p>
                </div>}
            {login_success && navigate('/')}

        </div>
    );
}

