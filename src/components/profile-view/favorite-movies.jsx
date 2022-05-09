import React from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const removeFavoriteMovie = (movieId) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
        .delete(
            `https://young-fjord-17804.herokuapp.com/users/${user}/favoriteMovies/${movieId}`,
            { headers: { Authorization: `Bearer ${token}` } },
        )
        .then(response => {
            // TODO
        });
}

export function FavoriteMovies({favoriteMovies}) {

    return (
        <>
            <p className="mt-5 mb-2 text-left">Favorite Movies (Links)</p>
            <ul className="list-group">
                {favoriteMovies.map((movie,i) => (
                    <li className="list-group-item bg-white" key={i}><Link className="text-info" to={`/movies/${movie._id}`}>{movie.Title}</Link></li>
                ))}
            </ul>
        </>
    )
}
FavoriteMovies.propTypes = {
    favoriteMovies: PropTypes.array.isRequired,
};