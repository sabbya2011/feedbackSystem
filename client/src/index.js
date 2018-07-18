import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {store} from './store'
// import axios from 'axios';

import App from './components/App/App';

// window.axios = axios;

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
);
