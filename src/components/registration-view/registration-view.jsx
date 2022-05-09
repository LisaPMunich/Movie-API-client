import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Form, Button, Container, Col, Row} from 'react-bootstrap';
import './registration-view.scss'
import {FormLayout} from "../form-layout/form-layout";


export function RegistrationView({onSubmitRegistration}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [nameErr, setNameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!name) {
            setNameErr('Username is required.');
            isReq = false;
        } else if (name.length < 5) {
            setNameErr('Username has to contain at least 5 characters.');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password is required.');
            isReq = false;
        } else if (password.length < 5) {
            setPasswordErr('Password must be at least 5 characters long.');
            isReq = false;
        }
        if (!email) {
            setEmailErr('An email address is required.');
            isReq = false;
        }
        if (email.indexOf('@') === -1) {
            setEmailErr('That is not a valid email address.');
            isReq = false;
        }
        return isReq;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const formIsValid = validate();

        if (!formIsValid) {
            return;
        }

        onSubmitRegistration(name, password, email, birthday);
    };


    return (
        <FormLayout title="Register">
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your Username"
                />
                {nameErr && <p>{nameErr}</p>}
            </Form.Group>

            <Form.Group className="mt-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password (5 or more characters)"
                />
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>

            <Form.Group className="mt-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your E-mail"
                />
                {emailErr && <p>{emailErr}</p>}
            </Form.Group>

            <Form.Group className="mt-3">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={e => setBirthday(e.target.value)}
                />
            </Form.Group>
            <div className="text-center">
                <Button
                    className="mt-4"
                    variant="info"
                    type="submit"
                    onClick={handleRegister}>Sign up</Button>
            </div>
        </FormLayout>
    );
}

RegistrationView.propTypes = {
    onSubmitRegistration: PropTypes.func.isRequired,
};