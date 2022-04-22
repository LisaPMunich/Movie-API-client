import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import './index.scss';
import {MainView} from "./components/main-view/main-view";



class MovieApplication extends React.Component {
    render() {
        return (
            <MainView/>
        );
    }
}

// finds root of app
const container = document.getElementsByClassName('app-container')[0];

// create root
const root = ReactDOMClient.createRoot(container);

root.render(<MovieApplication/>);