import React from 'react';
import axios from 'axios';

import {BrowserRouter as Router, Navigate, Route, Routes, useNavigate, useParams} from 'react-router-dom';

import Navbar from '../navbar/navbar';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {RegistrationView} from '../registration-view/registration-view';
import {GenreView} from "../genre-view/genre-view";
import {DirectorView} from "../director-view/director-view";

import {ProfileView} from '../profile-view/profile-view';

import {Col, Container, Row} from 'react-bootstrap';
import './main-view.scss'
import CenteredLayout from "../centered-layout/centered-layout";


const registerUser = (name, password, email, birthday) => {
    return axios
        .post('https://young-fjord-17804.herokuapp.com/users', {
            Name: name,
            Password: password,
            Email: email,
            Birthday: birthday
        })
        .then(response => {
            const data = response.data;
            return true;
        })
        .catch(e => {
            console.log('error registering the user')
            return false;
        });

};
const loginUser = (name, password, onLoggedIn) => {
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


export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            user: null,
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://young-fjord-17804.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
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

        return <Navigate to="/"/>
    }


    render() {
        const {movies, user} = this.state;
        let accessToken = localStorage.getItem('token');

        let LoginRouteView = () => {
            if (user) {
                return <Navigate to="/"/>
            }
            return <LoginView
                onLogin={(name, password) => {
                    return loginUser(name, password, this.onLoggedIn.bind(this));
                }}/>;
        };
        let HomeView = () => {
            if (!user) {
                return (
                    <Navigate to="/login"/>
                );
            }

            if (movies.length === 0) {
                return <div className="main-view"/>;
            }

            return movies.map(movie => (
                <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="movie-card mb-4">
                    <MovieCard movie={movie}/>
                </Col>
            ))
        };
        let RegisterRouteView = () => {
            // if (user) return <Navigate to="/"/>

            return <CenteredLayout>
                <RegistrationView onSubmitRegistration={(name, password, email, birthday) => {
                    registerUser(name, password, email, birthday)
                        .then(registered => {
                            if (registered) {
                                return <Navigate to="/"/>
                            }
                            return <Navigate to="/register"/>
                        })
                }}/>
            </CenteredLayout>
        };
        let MovieDetailRouteView = () => {
            if (!user) return <Navigate to="/"/>

            if (movies.length === 0) {
                return <div className="main-view"/>;
            }

            const routeParams = useParams();
            const navigate = useNavigate();

            return (
                <MovieView className="mx-auto"
                           movie={movies.find(movie => movie._id === routeParams.movieId)}
                           onBackClick={() => navigate("/")}/>
            );
        };
        let GenreDetailRouteView = () => {
            if (!user) return <Navigate to="/"/>

            if (movies.length === 0) {
                return <div className="main-view"/>
            }

            const routeParams = useParams();
            const navigate = useNavigate();
            return <GenreView
                movie={movies.find(movie => movie.Genre.Name === routeParams.name)}
                onBackClick={() => navigate(-1)}/>
        };
        let DirectorRouteView = () => {
            if (!user) return <Navigate to="/"/>

            if (movies.length === 0) {
                return <div className="main-view"/>;
            }

            const routeParams = useParams();
            const navigate = useNavigate();
            return (
                <DirectorView
                    Director={movies.find(movie => movie.Director.Name === routeParams.name).Director}
                    onBackClick={() => navigate(-1)}/>
            );
        };
        let ProfileRouteView = () => {
            if (!user) return <Navigate to="/"/>
            return <Col>
                <ProfileView movies={movies}
                             username={user}
                             accessToken={accessToken}
                />
            </Col>
        };

        return (
            <>
                <Navbar user={user}/>
                <Container fluid>
                    <Row className="mt-3">
                        <Router>
                            <Routes>
                                <Route path="/login" element={<LoginRouteView/>}/>
                                <Route exact path="/" element={<HomeView/>}/>
                                <Route path="/register" element={<RegisterRouteView/>}/>
                                <Route path="/movies/:movieId" element={<MovieDetailRouteView/>}/>
                                <Route path="/genres/:name" element={<GenreDetailRouteView/>}/>
                                <Route path="/directors/:name" element={<DirectorRouteView/>}/>
                                <Route path={`/users/${user}`} element={<ProfileRouteView/>}/>
                            </Routes>
                        </Router>
                    </Row>
                </Container>
            </>
        );
    }
}
