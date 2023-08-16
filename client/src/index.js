import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './redux/store';
import {checkLogin} from "./function/check_login";




checkLogin();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
