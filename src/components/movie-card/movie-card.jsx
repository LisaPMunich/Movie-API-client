import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./movie-card.scss"


export class MovieCard extends React.Component {
    render(){
        const {movie}=this.props;
        let badgeText
        if(movie.Genre.Name){
            badgeText = `${movie.Genre.Name}`
        }
        return (
            <Card className="card">
                {movie.Genre.Name && <div className="card-badge">{badgeText}</div>}
                <Card.Img variant="top" src={movie.ImageURL} style={{ height: "300px" }}/>
                <Card.Body className="py-0">
                    <Card.Title className="movie-card__title">{movie.Title}</Card.Title>
                    <Card.Text className="movie-card__text">{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie.Title}`}>
                        <Button variant="outline-info">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name:PropTypes.string.isRequired,
            Description:PropTypes.string.isRequired
        }),
        Director:PropTypes.shape({
            Name:PropTypes.string.isRequired,
            Bio:PropTypes.string.isRequired,
            Birth:PropTypes.string.isRequired,
            Death:PropTypes.string
        }),
        ImageURL: PropTypes.string.isRequired,
        Featured:PropTypes.bool
    }).isRequired
};