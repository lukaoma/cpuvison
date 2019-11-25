import React, {createRef, useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import firebase from "firebase";

export default function FormCollect(props: any) {
    let router = useHistory();

    const firebaseConfig = {
        apiKey: "AIzaSyA2esu3mSMUd7eP6cI1CgJqqiaACiCBxoQ",
        authDomain: "computervision-b2ffc.firebaseapp.com",
        databaseURL: "https://computervision-b2ffc.firebaseio.com",
        projectId: "computervision-b2ffc",
        storageBucket: "computervision-b2ffc.appspot.com",
        messagingSenderId: "1014927434821",
        appId: "1:1014927434821:web:9d088eab92a4d0401aaf2c"
    };

    let refIndex = 0;
    const FormChoices: any = useRef([...Array(6)].map(() => createRef()));


    function getElement() {
        const element = <Form.Control as="select" ref={FormChoices.current[refIndex]}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </Form.Control>;
        refIndex++;
        return element;
    }

    interface worker {
        Purpose: number
        Challenge: number
        Immerse: number
        Rewards: number
        Feedback: number
        Name: string
    }

    let addUser = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const sendData: worker = {
            Purpose: FormChoices.current[0].current.value,
            Challenge: FormChoices.current[1].current.value,
            Immerse: FormChoices.current[2].current.value,
            Rewards: FormChoices.current[3].current.value,
            Feedback: FormChoices.current[4].current.value,
            Name: FormChoices.current[5].current.value,
        };
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("CrowdWorkers").add(sendData).then(r => {
            router.push("/app");
        });
    };
    const labels: string[] = ["Purpose", "Challenge", "Immerse", "Rewards", "Feedback", "Name"];
    return (
        <div className="formBody">
            <h1>Please Fill out this Form</h1>
            <Form className="justForm">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label column={false}>{labels[0]}</Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        {getElement()}
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Please Fill all boxes
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label column={false}>{labels[1]}</Form.Label>
                    {getElement()}                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label column={false}>{labels[2]}</Form.Label>
                    {getElement()}                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label column={false}>{labels[3]}</Form.Label>
                    {getElement()}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label column={false}>{labels[4]}</Form.Label>
                    {getElement()}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label column={false}>{labels[5]}</Form.Label>
                    <Form.Control as="textarea" rows="1" ref={FormChoices.current[5]} placeholder="Name"/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={addUser}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

