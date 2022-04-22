import React from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [
                {
                    _id: 1,
                    Title: "Chasing Ice",
                    Description: "Chasing Coral tracks the worldwide disappearance of coral, a crucial ecosystem for sustaining marine life. It’s another inconvenient truth that coral could be completely wiped out in 30 years by climate change. Chasing Coral is a journey taken by a team of researchers trying to document the bleaching of coral in warming seas.",
                    ImageURL: "https://picsum.photos/200/300"
                },
                {
                    _id: 2,
                    Title: "This Changes Everything",
                    Description: "This documentary is based on Naomi Klein's international non-fiction bestseller This Changes Everything. This film surveys a number of environmental activists and communities around the world - from Montana's Powder River Basin to the Alberta Tar Sands, from the coast of South India to Beijing and beyond.",
                    ImageURL: "https://i.picsum.photos/id/1015/200/300.jpg?hmac=Rx9zhHRx_cf574gBuoMH5d7HlhZitGMA81AgPmhJDSI"
                },
                {
                    _id: 3,
                    Title: "Merchants Of Doubt",
                    Description: "Merchants of Doubt is a 2014 American documentary film directed by Robert Kenner and inspired by the 2010 book of the same name by Naomi Oreskes and Erik M. Conway. The film traces the use of public relations tactics that were originally developed by the tobacco industry to protect their business from research indicating health risks from smoking. The central concern of the film is the ongoing use of these tactics to forestall governmental action to regulate greenhouse gas emissions in response to the risk of global climate change.",
                    ImageURL: "https://i.picsum.photos/id/310/200/300.jpg?hmac=Zuza6ZJ8P0eOEJ3TsGuBoFjarwaO7vlgyNr9UVx1low"
                },
            ],
            selectedMovie: null,
        }
    }

    selectMovie(newSelectedMovie) {
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
            return <div className="main-view">The list is empty!</div>
        }
        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onClickBack={() => { this.unselectMovie()}}/>
                    : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.selectMovie(movie) }}/>
                    )}
            </div>
        );
    }
}
