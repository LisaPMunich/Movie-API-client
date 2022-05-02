import React from 'react';
import axios from 'axios';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';

import {Row, Col} from 'react-bootstrap';
import './main-view.scss'


export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            user: null
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null){
            this.setState({
                    user: localStorage.getItem('user')
                });
                this.getMovies(accessToken);
        }
    }

    getMovies(token){
        axios.get('https://young-fjord-17804.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}`}
        })
            .then(response=>{
                this.setState({
                    movies: response.data
                });
            })
            .catch(function(error){
                console.log(error);
            });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Name
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Name);
        this.getMovies(authData.token);
    }



    render(){
        const {movies, user} = this.state;

        if (!user) return (
            <>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
            </>
        )

        if (movies.length === 0) {
            return <div className="main-view"/>
        }
        return (
            <Router>
                <Row className="rounded mt-4 mx-3">
                    <Route exact path="/" render={()=>{
                        movies.map(movie => (
                            <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="movie-card mb-4">
                                <MovieCard movie={movie} />
                            </Col>
                        ))
                    }} />
                    <Route path="/movies/:movieId" render={({match, history})=>{
                        return <Col md={12}>
                            <MovieView className="mx-auto" movie={movies.find(movie=>movie._id=== match.params.movieId)} onBackClick={()=>history.goBack()}/>
                        </Col>
                    }} />

                    <Route exact path="/genres/:name" render={({match, history})=>{
                        if(movies.length === 0) return <div className="main-view"/>;
                        return <Col md={12}>
                            <GenreView genre={movies.find(movie =>movie.Genre.Name === match.params.name).Genre} on BackClick={()=>history.goBack()}/>
                        </Col>
                    }}/>

                    <Route exact path="/directors/:name" render={({match, history})=>{
                        if(movies.length === 0) return <div className="main-view"/>;
                        return <Col md={12}>
                            <DirectorView director={movies.find(movie =>movie.Director.Name === match.params.name).Director} on BackClick={()=>history.goBack()}/>
                        </Col>
                    }}/>
                </Row>
            </Router>
        );
    }
}
