import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Container from 'react-bootstrap/Container';

import './index.scss';
import {MainView} from "./components/main-view/main-view";
import Navbar from "./components/navbar/navbar.jsx"


class MovieApplication extends React.Component {
    render() {
        return (
            <Container className="app">
                <Navbar/>
                <MainView/>
            </Container>
        );
    }
}

// finds root of app
const container = document.getElementsByClassName('app-container')[0];

// create root
const root = ReactDOMClient.createRoot(container);

root.render(<MovieApplication/>);