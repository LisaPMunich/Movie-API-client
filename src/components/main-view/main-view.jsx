import React from 'react';
import Axios from 'axios';

import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import ChasingIceImage from '../../images/ChasingIce.jpg';


export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
        }
    }

    componentDidMount() {
        axios.get('https://young-fjord-17804.herokuapp.com/movies')
            .then(response =>{
                this.setState({
                    movies: response.data
                });
            })
            .catch(error =>{
            console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    unselectMovie(){
        this.setState({
            selectedMovie: null,
        })
    }



    render() {
        const {movies, selectedMovie} = this.state;

        if (movies.length === 0) {
            return <div className="main-view"/>
        }
        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onClickBack={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie);}}/>
                    : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}/>
                    )
                }
            </div>
        );
    }
}
