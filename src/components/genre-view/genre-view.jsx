import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./genre-view.scss"
import CenteredLayout from "../centered-layout/centered-layout";


export class GenreView extends React.Component {
    render() {
        const {movie} = this.props;
        return (
            <CenteredLayout>
                <Card>
                    <Card.Body>
                        <Card.Title>{movie.Genre.Name}</Card.Title>
                        <Card.Text>{movie.Genre.Description}</Card.Text>
                        <Link to={`/movies/${movie.Title}`}>
                            <Button variant="outline-info">Back to movie</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </CenteredLayout>
        );
    }
}

GenreView.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.number.isRequired,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
    }).isRequired
}
