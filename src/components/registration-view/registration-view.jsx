import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Button, Form} from 'react-bootstrap';
import './registration-view.scss'
import {FormLayout} from "../form-layout/form-layout";
import {registerUser} from "../services/api-services";


export function RegistrationView({onSubmitRegistration}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [nameErr, setNameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!name) {
            setNameErr('Username is required.');
            isReq = false;
        } else if (name.length < 5) {
            setNameErr('Username has to contain at least 5 characters.');
            isReq = false;
        } else {
            setNameErr('')
        }

        if (!password) {
            setPasswordErr('Password is required.');
            isReq = false;
        } else if (password.length < 5) {
            setPasswordErr('Password has to contain at least 5 characters.');
            isReq = false;
        } else {
            setPasswordErr('')
        }

        if (!email) {
            setEmailErr('An email address is required.');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('The email is missing the @ sign.');
            isReq = false;
        } else {
            setEmailErr('')
        }

        if (!birthday) {
            setBirthdayErr('A birthday is required.');
            isReq = false;
        } else {
            setBirthdayErr('')
        }
        return isReq;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const formIsValid = validate();

        if (!formIsValid) {
            return;
        }

        registerUser(name, password, email, birthday)
            .then(data => {
                if (data.registered === true) {
                    onSubmitRegistration()
                } else {
                    const nameErr = data.errors.filter(item => item.param === "Name");
                    const passwordErr = data.errors.filter(item => item.param === "Password");
                    const emailErr = data.errors.filter(item => item.param === 'Email');
                    const birthdayErr = data.errors.filter(item => item.param === 'Birthday');

                    if(nameErr.length) {
                        setNameErr(nameErr[0].msg);
                    }

                    if(passwordErr.length) {
                        setPasswordErr(passwordErr[0].msg);
                    }

                    if(emailErr.length) {
                        setEmailErr(emailErr[0].msg);
                    }

                    if(birthdayErr.length) {
                        setBirthdayErr(birthdayErr[0].msg);
                    }
                }
            })
    };

    return (
        <FormLayout title="Register">
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                {birthdayErr && <p>{birthdayErr}</p>}
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