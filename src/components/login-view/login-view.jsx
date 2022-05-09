import React, {useState} from 'react';
import {Button, Form, NavLink} from 'react-bootstrap';
import './login-view.scss';
import PropTypes from "prop-types";
import {FormLayout} from "../form-layout/form-layout";
import {Link} from "react-router-dom";

export function LoginView({onLogin}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(name, password);
    };

    return (
        <FormLayout title="Login">
            <Form.Group controlId="formUsername">
                <Form.Control className="mt-4" type="text" placeholder="Username"
                              onChange={e => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Control className="mt-4" type="password" placeholder="Password"
                              onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <div className="text-center">
                <Button className="mt-4" variant="info" type="submit" onClick={handleSubmit}>SIGN IN</Button>
            </div>

            <p className="pt-3 text-center">
                <span>Don't have an account?&nbsp;
                    <Link to="/register" className="form-link" type="submit">Sign up</Link>
                </span>
            </p>
        </FormLayout>
    );
}

LoginView.propTypes = {
    onLogin: PropTypes.func.isRequired,
};