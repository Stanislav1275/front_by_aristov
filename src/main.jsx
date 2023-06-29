import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App.jsx'
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/arya-orange/theme.css";
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import './app/index.scss'
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)