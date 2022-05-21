import axios from "axios";

export const registerUser = (name, password, email, birthday) => {
    return axios
        .post('https://young-fjord-17804.herokuapp.com/users', {
            Name: name,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(response => {
            const data = response.data;
            return {
                registered: true
            };
        })
        .catch(error => {
            const errorData = error.response.data;
            if (!errorData.success)
                return {
                    registered: false,
                    errors: errorData.errors
                };
            throw error
        });

};

export const loginUser = (name, password, onLoggedIn) => {
    return axios
        .post('https://young-fjord-17804.herokuapp.com/login', {
            Name: name,
            Password: password
        })
        .then(response => {
            const data = response.data;
            onLoggedIn(data);
        })
        .catch(e => {
            console.error(e);
            console.log('no such user')
        });

}