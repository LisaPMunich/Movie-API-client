import React from 'react';
import {Card, Button, Container, Row, Col} from "react-bootstrap";
import './movie-view.scss'
import Bear from "../navbar/icons8-bär-50.png";


export class MovieView extends React.Component {

    render(){
        const {movie, onClickBack}=this.props;

        const hasBirth=movie.Director.Birth.toString().trim();

        return (
            <Card className="movie-view">
                    <Row >
                        <Col xs={12} s={12} md={12} lg={6}>
                            <Card.Img variant="top" src={movie.ImageURL}/>
                        </Col>
                        <Col className="card-body--container">
                            <Card.Body className="card-body">
                                <Card.Title>{movie.Title}</Card.Title>
                                <Card.Text>{movie.Description}</Card.Text>
                                <Card.Text><span className="bold">Genre: </span>{movie.Genre.Name}</Card.Text>
                                <Card.Text>
                                    <span className="bold">Director: </span> {movie.Director.Name} {hasBirth && `(born: ${movie.Director.Birth})`}
                                </Card.Text>
                                <Card.Text><span className="bold">Biography: </span>{movie.Director.Bio}</Card.Text>
                                <Button variant="outline-info" onClick={() => { onClickBack(); }}>Back</Button>
                            </Card.Body>
                        </Col>
                    </Row>

            </Card>
        );
    }
}