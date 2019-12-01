import React, {useEffect, useState} from 'react';
import firebase from "firebase";
import {allWorkerData} from "./Where";
import JSONViewer from 'react-json-view';
// @ts-ignore
import JSONView from 'react-json-viewer';

export default function DataViews(props: any) {
    const [data, setData] = useState(Array<allWorkerData>());

    const firebaseConfig = {
        apiKey: "AIzaSyA2esu3mSMUd7eP6cI1CgJqqiaACiCBxoQ",
        authDomain: "computervision-b2ffc.firebaseapp.com",
        databaseURL: "https://computervision-b2ffc.firebaseio.com",
        projectId: "computervision-b2ffc",
        storageBucket: "computervision-b2ffc.appspot.com",
        messagingSenderId: "1014927434821",
        appId: "1:1014927434821:web:9d088eab92a4d0401aaf2c"
    };
    const getUsers = () => {
        console.log("we made it in ");
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        const db = firebase.firestore();
        const newData: allWorkerData[] = [];
        db.collection("CrowdWorkers2").get().then(r => {
            r.docs.forEach(r => {
                newData.push(r.data());
            });
            setData(old => {
                return [...newData]
            });
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const products = [...data];
    const columns = [{
        dataField: 'id',
        text: 'Product ID'
    }, {
        dataField: 'name',
        text: 'Product Name'
    }, {
        dataField: 'price',
        text: 'Product Price'
    }];

    return (
        <div><h1>ALL Current Data in two forms</h1>
            <JSONView json={data}/>
            <JSONViewer src={data}/>
        </div>
    );
}

