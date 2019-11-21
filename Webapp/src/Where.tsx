import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import App from "./App";
import formCollect from "./formCollect";


function Where(props: any) {
    return (
        <Router>
            <Route path='/' exact component={App}/>
            <Route path='/form' exact component={formCollect}/>
        </Router>
    );
}

export default Where;


