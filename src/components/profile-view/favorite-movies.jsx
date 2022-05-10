import React from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

import PropTypes from "prop-types";

const removeFavoriteMovie = (movieTitle) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    axios
        .delete(
            `https://young-fjord-17804.herokuapp.com/users/${user}/movies/${movieTitle}`,
            { headers: { Authorization: `Bearer ${token}` } },
        )
        .then(response => {
            navigate("/users")
        });
}

export function FavoriteMovies({favoriteMovies}) {

    return (
        <>
            <p className="mt-5 mb-2 text-left">Favorite Movies (Links)</p>
            <ul className="list-group">
                {favoriteMovies.map((movie,i) => (
                    <li className="list-group-item bg-white" key={i}><Link to={`/movies/${movie.Title}`} className="text-info" >{movie.Title}</Link></li>
                ))}
            </ul>
        </>
    )
}

FavoriteMovies.propTypes = {
    favoriteMovies: PropTypes.array.isRequired,
};