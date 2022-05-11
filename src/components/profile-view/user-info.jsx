import React, {useState} from 'react'
import {Button, Form, FormControl, FormGroup} from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

const updateUser = (name, password, email, birthday, navigate, accessToken) => {
    axios
        .put(`https://young-fjord-17804.herokuapp.com/users/${name}`,

            {
                Name: name,
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
            navigate("/")
        });
}

const deleteUser = (name, accessToken, navigate) => {
    axios
        .delete(`https://young-fjord-17804.herokuapp.com/users/${name}`,
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
    const [name, setName] = useState(user.Name)
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

    const [passwordErr, setPasswordErr] = useState('');
    const validate = () => {
        let isReq = true;
        if (!password) {
            setPasswordErr('Password is required.');
            isReq = false;
        } else if (password.length < 5) {
            setPasswordErr('Password must be at least 5 characters long.');
            isReq = false;
        }
        return isReq;
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const formIsValid = validate();

        if (!formIsValid) {
            return;
        }

        updateUser(
            name,
            password,
            email,
            birthday,
            navigate,
            accessToken);
    };

    return (
                <>
                    <FormGroup className="mt-3">
                        <Form.Label>Name</Form.Label>
                        <FormControl
                            type="text"
                            name="Name"
                            placeholder="New Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormGroup>

                    <FormGroup className="mt-3">
                        <Form.Label>Password</Form.Label>
                        <FormControl
                            type="password"
                            aria-autocomplete="current-password"
                            name="Password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordErr && <p>{passwordErr}</p>}
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
                        <Button
                            variant="info"
                            type="button"
                            onClick={handleUpdate}>Update Info
                        </Button>
                        <Button variant="danger ml-2" onClick={() => deleteUser(name, accessToken, navigate)}>Delete
                            Profile</Button>
                    </div>
                </>
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