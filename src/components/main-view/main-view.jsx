import React from 'react';
import axios from 'axios';

import {BrowserRouter as Router, Navigate, Route, Routes, useNavigate, useParams} from 'react-router-dom';

import Navbar from '../navbar/navbar';
import {LoginView} from '../login-view/login-view';
import {MovieView} from '../movie-view/movie-view';
import {RegistrationView} from '../registration-view/registration-view';
import {GenreView} from "../genre-view/genre-view";
import {DirectorView} from "../director-view/director-view";

import {ProfileView} from '../profile-view/profile-view';

import {Col, Container, Row} from 'react-bootstrap';
import './main-view.scss'
import CenteredLayout from "../centered-layout/centered-layout";
import {store} from "../../store/store";
import {setMovies} from "../../store/features/moviesSlice";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list";
import {loginUser, registerUser} from "../services/api-services";


class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            user: localStorage.getItem('user'),
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user'),
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

                store.dispatch(setMovies(response.data));
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

            return <MoviesList/>

        };
        let RegisterRouteView = () => {
            const navigate = useNavigate();
            if (user) return navigate("/")

            return <CenteredLayout>
                <RegistrationView onSubmitRegistration={(name, password, email, birthday) => {
                    registerUser(name, password, email, birthday)
                        .then(registered => {
                            if (registered) {
                                return navigate("/")
                            }
                            return navigate("/register")
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
                           movie={movies.find(movie => movie.Title === routeParams.movieTitle)}
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
            const navigate = useNavigate();
            if (!user){
                return navigate("/")
            }
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
                                <Route path="/movies/:movieTitle" element={<MovieDetailRouteView/>}/>
                                <Route path="/genres/:name" element={<GenreDetailRouteView/>}/>
                                <Route path="/directors/:name" element={<DirectorRouteView/>}/>
                                <Route path="/users/me" element={<ProfileRouteView/>}/>
                            </Routes>
                        </Router>
                    </Row>
                </Container>
            </>
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);