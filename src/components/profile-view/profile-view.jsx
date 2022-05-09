import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import {UserInfo} from './user-info';
import {FavoriteMovies} from './favorite-movies';
import "./profile-view.scss"
import {FormLayout} from "../form-layout/form-layout";


export function ProfileView({username, movies, accessToken}) {
    const [user, setUser] = useState(null)
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        axios.get('https://young-fjord-17804.herokuapp.com/users/' + username, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
            .then(response => {
                const favoriteMovieIds = response.data.FavoriteMovies;

                setUser({
                    Name: response.data.Name,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: favoriteMovieIds,
                });

                setFavoriteMovies(movies.filter(movie => favoriteMovieIds.includes(movie._id)));
                console.log('fav', favoriteMovies);
            })

    }, [username])

    return !user ? (<div>Loading...</div>) : (
        <FormLayout title="Profile">
            <UserInfo user={user} accessToken={accessToken}/>
            <FavoriteMovies favoriteMovies={favoriteMovies}/>
        </FormLayout>
    )
}

ProfileView.propTypes = {
    username: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired
};