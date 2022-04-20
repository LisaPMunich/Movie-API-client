import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import './index.scss';

const container = document.getElementsByClassName('app-container')[0];

// create root
const root = ReactDOMClient.createRoot(container);

class MovieApplication extends React.Component {
    render(){
        return(
            <div className="movieAPI">
                <div>Good morning</div>
            </div>
        );
    }
}

root.render(<MovieApplication/>);