import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Container from 'react-bootstrap/Container';
import {Provider} from "react-redux";
import MainView from "./components/main-view/main-view";
import Footer from "./components/footer/footer";
import './index.scss';
import {store} from "./store/store";

class MovieApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container className="flex-wrapper app p-0" fluid>
                    <MainView/>
                    <Footer className="footer"/>
                </Container>
            </Provider>
        );
    }
}

// finds root of app
const container = document.getElementsByClassName('app-container')[0];

// create root
const root = ReactDOMClient.createRoot(container);

root.render(<MovieApplication/>);