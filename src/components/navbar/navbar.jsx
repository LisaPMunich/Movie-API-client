import React from 'react';
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import './navbar.scss';
import Bear from './icons8-bear-50.png'

export default function NavBar ({ user }){

    const onLoggedOut = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open("/", "_self");
    }

    const isAuth=()=>{
        if(typeof window == "undefined"){
            return false
        }
        if (localStorage.getItem("token")){
            return localStorage.getItem("token");
        } else{
            return false;
        }
    };

    return(
        <Container fluid className="navbar-container p-0 pb-5 mb-5">
            <Row >
                <Col>
                    <Navbar className="navbar shadow-lg p-3 mb-3 bg-body rounded" expand="lg" bg="dark" variant="dark" fixed="top">
                        <Navbar.Brand className="nav--brand ms-auto text-uppercase" style={{color: "#66FCF1"}} href="/"><span className="brandName-firstWord">Green</span>
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
                                {isAuth() && (<Nav.Link className="pr-5" href="/" style={{color: "#66FCF1"}} >Movies</Nav.Link>)}
                                {isAuth() && (<Nav.Link className="pr-5" href={`/users/me`} style={{color: "#66FCF1"}} >{user}'s Profile</Nav.Link>)}
                                {!isAuth() && (<Nav.Link className="pr-5" href="/register" style={{color: "#66FCF1"}} >Sign up</Nav.Link>)}
                                {!isAuth() && (<Nav.Link className="pr-5" href="/" >Login</Nav.Link>)}
                                {isAuth() && (<Button variant="secondary" onClick={()=>{onLoggedOut() }}>Logout</Button>)}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    )
}