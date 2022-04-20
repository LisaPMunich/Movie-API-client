import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class movieAPIApplication extends React.Component {
    render(){
        return(
            <div className="movieAPI">
                <div>Good morning</div>
            </div>
        );
    }
}

const container = document.getElementbyClassName('app-container')[0];

ReactDOM.render(React.createElement(movieApplication), container);