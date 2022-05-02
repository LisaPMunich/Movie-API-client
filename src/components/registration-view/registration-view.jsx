import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import {Form, Button, Container, Col, Row} from 'react-bootstrap';
// import {Link} from 'react-router-dom';
import './registration-view.scss'


export function RegistrationView({ onRegistered }) {
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const[nameErr,setNameErr] = useState('');
    const[passwordErr, setPasswordErr] = useState('');
    const[emailErr, setEmailErr]= useState('');
    const[birthdayErr, setBirthdayErr]= useState('');

    const validate =() =>{
        let isReq = true;
        if(!name){
            setNameErr('Username is required.');
            isReq =false;
        } else if(name.length<5){
            setNameErr('Username has to contain at least 5 characters.');
            isReq=false;
        }
        if(!password){
            setPasswordErr('Password is required.');
            isReq= false;
        } else if(password.length <5){
            setPasswordErr('Password must be at least 5 characters long.');
            isReq = false;
        }
        if(!email){
            setEmailErr('An email address is required.');
            isReq = false;
        }
        if(email.indexOf('@') === -1){
            setEmailErr('That is not a valid email address.');
            isReq = false;
        }
        return isReq;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
            axios.post('https://young-fjord-17804.herokuapp.com/registration',{
                Name: name,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response =>{
                    const data =response.data;
                    props.onRegistered(data)
                    alert('Registration successful, please login!');
                })
                .catch(e=>{
                    console.log('no such user');
                    alert('unable to register');
                });
        }
    };

    return (
        <Container>
            <Row className="mt-5">
                <Col md={12}>
                    <Form>
                        <h3>Sign up</h3>
                        <p></p>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Enter a username"
                            />
                            {nameErr && <p>{nameErr}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Your password must be 5 or more characters"
                            />
                            {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                            />
                            {emailErr && <p>{emailErr}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={e => setBirthday(e.target.value)}
                                placeholder="Enter your birthday (YYYY-MM-DD)"
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handleSubmit}>Submit</Button>
                    </Form>

                </Col>
            </Row>
        </Container>

    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    })
};