import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./director-view.scss"
import CenteredLayout from "../centered-layout/centered-layout";


export class DirectorView extends React.Component {
    render() {
        const {Director, onBackClick} = this.props;

        const hasDeathDate = Director.Death && (Director.Death.trim().length > 0);
        const hasBirthDate = Director.Birth.trim().length > 0;

        return (
            <CenteredLayout>
                <Card>
                    <Card.Body>
                        <Card.Title className="director-view__title">{Director.Name}</Card.Title>
                        <Card.Text className="director-view__text">{Director.Bio}</Card.Text>
                        { hasBirthDate && (
                            <Card.Text className="director-view__text">Birth: {Director.Birth}</Card.Text>
                        )}
                        { hasDeathDate && (
                            <Card.Text className="director-view__text">Death: {Director.Death}</Card.Text>
                        )}

                        <Button onClick={onBackClick} variant="outline-info">Back to movie</Button>
                    </Card.Body>
                </Card>
            </CenteredLayout>
        );
    }
}

DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string,
        Death: PropTypes.string
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};