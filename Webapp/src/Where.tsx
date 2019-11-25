import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "./App";
import formCollect from "./formCollect";
import Favicon from "react-favicon";
import fav from "./images/icon.png";


function Where(props: any) {
    return (
        <Router>
            <Favicon url={fav}/>
            <Route path='/' exact component={formCollect}/>
            <Route path='/app' exact component={App}/>
        </Router>
    );
}

export default Where;


