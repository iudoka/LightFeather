import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; // middleware
import register from './store/reducers/register';
import muiTheme from './muiTheme'; // Material UI theme
import { MuiThemeProvider } from '@material-ui/core';

// Make JQuery global
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const app = (
    <MuiThemeProvider theme={muiTheme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MuiThemeProvider>
)

const rootReducer = combineReducers({
    // add more
    register: register,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(< Provider store={store} > {app} </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();