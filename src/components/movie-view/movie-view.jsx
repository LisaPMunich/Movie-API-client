import React from 'react';
import {Card, Button} from "react-bootstrap";


export class MovieView extends React.Component {

    render(){
        const {movie, onClickBack}=this.props;
        return (
            <Card className="card">
                <Card.Img variant="top" src={movie.ImageURL}/>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button variant="primary" onClick={() => { onClickBack(); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}