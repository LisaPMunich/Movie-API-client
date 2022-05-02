import React from 'react';
import axios from 'axios';
import {Row, Col} from 'react-bootstrap';
import './main-view.scss'


import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';


export class MainView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        }
    }

    componentDidMount() {
        console.log(this.name);
        this.name = "Actually Lisa";

        axios.get('https://young-fjord-17804.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }


    render() {
        const {movies, selectedMovie, user} = this.state;

        if (!user) return (
            <>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
            </>
        )

        if (movies.length === 0) {
            return <div className="main-view"/>
        }
        return (
            <Row className="rounded mt-4 mx-3">
                {selectedMovie
                    ? (
                        <Col md={12}>
                            <MovieView className="mx-auto" movie={selectedMovie} onClickBack={newSelectedMovie => {
                                this.setSelectedMovie(newSelectedMovie);
                            }}/>
                        </Col>
                    )
                    : movies.map(movie => (
                        <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="movie-card mb-4">
                            <MovieCard
                                className="movie-card"
                                key={movie._id}
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    this.setSelectedMovie(newSelectedMovie);
                                }}/>
                        </Col>
                        ))
                }
            </Row>
        );
    }
}
