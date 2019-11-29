import React, {createRef, useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import firebase from "firebase";
import {newUser} from "./Where";

export interface WorkerFeedback {
    [x: string]: any;
}

const MAX_QUESTIONS = 5;
const feedback: WorkerFeedback = {};
let refIndex = 0;
const labels: string[] = ["Purpose", "Challenge", "Immerse", "Rewards", "Feedback"];

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

    const FormChoices: any = useRef([...Array(MAX_QUESTIONS)].map(() => createRef()));

    function getElement() {
        const element =
            <Form.Control as="select" multiple
                          defaultValue={""} ref={FormChoices.current[refIndex]}>
                <option>5 Felt More {labels[refIndex]}</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1 Felt Less {labels[refIndex]}</option>
            </Form.Control>;
        refIndex++;
        return element;
    }

    function doneFeedBack() {
        for (let index = 0; index < MAX_QUESTIONS; index++) {
            const name: string = labels[index];
            feedback[name] = FormChoices.current[index].current.value === "" ? "No Answer" : FormChoices.current[index].current.value;
        }
        newUser.Feedback = feedback;
        addUser();
    }

    const addUser = () => {
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("CrowdWorkers2").add(newUser).then(r => {
            router.push("/");
        });
    };

    return (
        <div className="formBody">
            <h1>Please, Make an evaluation of the overall interface design.</h1>
            <Form className="justForm">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label column={false}>{labels[0]}</Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        {getElement()}
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Please Fill all boxes
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label column={false}>{labels[1]}</Form.Label>
                    {getElement()}                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label column={false}>{labels[2]}</Form.Label>
                    {getElement()}                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label column={false}>{labels[3]}</Form.Label>
                    {getElement()}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label column={false}>{labels[4]}</Form.Label>
                    {getElement()}
                </Form.Group>
                <Button variant="primary" type="button" onClick={doneFeedBack}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

