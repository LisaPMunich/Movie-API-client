import React from 'react';
import {Card, Button, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './movie-view.scss'


export class MovieView extends React.Component {

    render(){
        const {movie, onClickBack}=this.props;


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
                                <Link to={`/directors/${movie.Director.Name}`}>
                                    <Button variant="link">Director</Button>
                                </Link>
                                <Link to={`/genres/${movie.Genre.Name}`}>
                                    <Button variant="link">Genre</Button>
                                </Link>

                                <Button variant="outline-info" onClick={() => { onClickBack(); }}>Back</Button>
                            </Card.Body>
                        </Col>
                    </Row>

            </Card>
        );
    }
}