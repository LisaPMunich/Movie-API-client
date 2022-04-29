import React from 'react';
import {Navbar, Container, Nav, Button, Form, FormControl}  from "react-bootstrap";
import './navbar.scss';

export default function NavBar (){
    return(
        <Navbar className="navbar" expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand className="nav--brand" href="#home">MoviePrime</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#movies">Movies</Nav.Link>
                        <Nav.Link href="#myprofile">My Profile</Nav.Link>
                        <Nav.Link href="#logout">Logout</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}