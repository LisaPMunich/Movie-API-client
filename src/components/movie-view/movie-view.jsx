import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import './movie-view.scss'
import StarEmpty from '../../images/star-empty.png'
import StarFilled from '../../images/star-filled.png'
import PropTypes from "prop-types";
import CenteredLayout from "../centered-layout/centered-layout";
import axios from "axios";

export function MovieView({movie, onBackClick}) {
    const [isFavorite, setIsFavorite] = useState(false);

    const username = localStorage.getItem('user');
    const accessToken = localStorage.getItem('token');

    let starIcon = isFavorite ? StarFilled : StarEmpty;

    useEffect(() => {
        axios
            .get('https://young-fjord-17804.herokuapp.com/users/' + username, {
                headers: {Authorization: `Bearer ${accessToken}`}
            })
            .then(response => {
                setIsFavorite(response.data.FavoriteMovies.includes(movie._id));
            });
    }, [username]);

    const toggleFavorite = () => {
        const url = `https://young-fjord-17804.herokuapp.com/users/${username}/movies/${movie.Title}`;
        if (isFavorite) {
            axios
                .delete(url, {headers: {Authorization: `Bearer ${accessToken}`}})
                .then(() => {
                    setIsFavorite(false);
                })
        } else {
            axios
                .post(url, {}, {headers: {Authorization: `Bearer ${accessToken}`}})
                .then(() => {
                    setIsFavorite(true);
                })
        }
    }

    return (
        <CenteredLayout>
            <Card className="movie-view">
                <Row>
                    <Col>
                        <Card.Img variant="top" src={movie.ImageURL}/>
                    </Col>
                    <Col className="card-body--container">
                        <Card.Body className="card-body">
                            <Card.Title>
                                <img
                                    src={starIcon}
                                    className="movie-view__star"
                                    onClick={toggleFavorite}
                                />&nbsp;
                                {movie.Title}
                            </Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <Button variant="link">Director</Button>
                            </Link>
                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <Button variant="link">Genre</Button>
                            </Link>

                            <Button variant="outline-info" onClick={() => {
                                onBackClick();
                            }}>Back</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </CenteredLayout>
    );
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string
        }),
        ImageURL: PropTypes.string.isRequired,
        Featured: PropTypes.bool
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};