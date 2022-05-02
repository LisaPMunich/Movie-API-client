import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import axios from 'axios';
import './login-view.scss';

export function LoginView(props) {
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://young-fjord-17804.herokuapp.com/login',{
            Name: name,
            Password: password
            })
            .then(response=>{
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e=>{
                console.log('no such user')
            });
    };

    return (
    <div className="login--form-container">
        <Form className="login--form">
            <h2 className="login--form-title">Login</h2>
            <Form.Group className="form--group"controlId="formUsername">
                <Form.Control className="form--input-field" type="text" placeholder="Username" onChange={e=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="form--group" controlId="formPassword">
                <Form.Control className="form--input-field" type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
            </Form.Group>
            <div className="form--button-container">
                <Button className="form--button-login" variant="info" type="submit" onClick={handleSubmit}>SIGN IN</Button>
            </div>
            <p className="register-call">
                <span className="register-text">Don't have an account?&nbsp;
                    <a className="register-link" type="submit">Sign up</a>
                </span>
            </p>
        </Form>
    </div>
    );
}