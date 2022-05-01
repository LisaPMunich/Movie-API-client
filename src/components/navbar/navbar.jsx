import React from 'react';
import {Navbar, Container, Row, Col, Nav, Button, Form, FormControl}  from "react-bootstrap";
import './navbar.scss';
import Bear from './icons8-bär-50.png'

export default function NavBar (){
    return(
        <Container fluid className="navbar-container p-0 pb-5 mb-5">
            <Row >
                <Col>
                    <Navbar className="navbar py-3 shadow-lg p-3 mb-5 bg-body rounded" expand="lg" bg="dark" variant="dark" fixed="top">
                        <Navbar.Brand className="nav--brand ms-auto text-uppercase" style={{color: "#66FCF1"}} href="#home"><span className="brandName-firstWord">Green</span>
                            <img
                                src={Bear}
                                width="35"
                                height="35"
                                className="nav--brand-image"
                                alt="Bär icon by Icons8"
                            /><span className="brandName-lastWord">Screen</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                            <Nav className="navLink-list">
                                <Nav.Link href="#movies">Movies</Nav.Link>
                                <Nav.Link href="#myprofile">My Profile</Nav.Link>
                                <Nav.Link href="#logout">Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    )
}