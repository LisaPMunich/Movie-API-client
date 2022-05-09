import React, {useState} from 'react'
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const updateUser = (username, password, email, birthday, accessToken) => {
    axios
        .put(`https://young-fjord-17804.herokuapp.com/users/${username}`,
            {
                Name: username,
                Password: password,
                Email: email,
                Birthday: birthday
            },
            {
                headers: {Authorization: `Bearer ${accessToken}`}
            }
        )
        .then((response) => {
            alert('User updated.');
            localStorage.setItem('user', response.data.Name);
        });
}

const deleteUser = (username, accessToken, navigate) => {
    axios
        .delete(`https://young-fjord-17804.herokuapp.com/users/${username}`,
            {
                headers: {Authorization: `Bearer ${accessToken}`}
            }
        )
        .then((response) => {
            localStorage.setItem('user', null);
            navigate("/register")
        });
}

export function UserInfo({user, accessToken}) {
    const [username, setUsername] = useState(user.Name)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState(user.Email)
    const [birthday, setBirthday] = useState(user.Birthday)

    const navigate = useNavigate();
    const birthdayDate = new Date(Date.parse(user.Birthday));
    // Kudos go to https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
    // Using "ko-KR" because it has the correct order yyyy-mm-dd I needed for Bootstrap Datepicker..
    const birthdayString = birthdayDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).replaceAll('. ', '-').replace('.', '');

    return (
                <Form
                    className="update-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateUser(
                            username,
                            password,
                            email,
                            birthday,
                            accessToken
                        );
                    }
                    }
                >
                    <FormGroup className="mt-3">
                        <Form.Label>Username</Form.Label>
                        <FormControl
                            type="text"
                            name="Username"
                            placeholder="New Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <FormControl
                            type="password"
                            name="Password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <FormControl
                            type="email"
                            name="Email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mt-3">
                        <Form.Label>Birthday</Form.Label>
                        <FormControl
                            type="date"
                            name="Birthday"
                            value={birthdayString}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <div className="mt-5 text-center">
                        <Button variant="info" type="submit" onClick={() => updateUser(
                            username,
                            password,
                            email,
                            birthday,
                            accessToken
                        )}>Update Info</Button>
                        <Button variant="danger ml-2" onClick={() => deleteUser(username, accessToken, navigate)}>Delete
                            Profile</Button>
                    </div>
                </Form>
    )
}

UserInfo.propTypes = {
    user: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }).isRequired,
    accessToken: PropTypes.string.isRequired
};