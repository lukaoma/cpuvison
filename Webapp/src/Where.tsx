import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import App, {workInformation} from "./App";
import formCollect, {WorkerFeedback} from "./formCollect";
import Favicon from "react-favicon";
import fav from "./images/icon.png";
import Personal, {PersonalInformation} from "./Personal";
import DataViews from "./DataViews";

export interface allWorkerData {
    Personal?: PersonalInformation
    Work?: workInformation
    Feedback?: WorkerFeedback
}

export const newUser: allWorkerData = {};

function Where(props: any) {

    return (
        <Router>
            <Favicon url={fav}/>
            <Route path='/' exact component={Personal}/>
            <Route path='/app' component={App}/>
            <Route path='/feedback' exact component={formCollect}/>
            <Route path='/data' exact component={DataViews}/>
        </Router>
    );
}

export default Where;


