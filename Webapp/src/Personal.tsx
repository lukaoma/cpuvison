import React, {createRef, useRef} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {newUser} from "./Where";

const MAX_QUESTIONS = 8;

export interface PersonalInformation {
    [x: string]: any;
}

export default function Personal(props: any) {
    let router = useHistory();

    const FormChoices: any = useRef([...Array(MAX_QUESTIONS)].map(() => createRef()));
    let refIndex: number = 0;

    function getElementYES() {
        const element =
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label column={false}>{labels[refIndex]}</Form.Label>
                <Form.Control as="select" defaultValue={"N/A"} ref={FormChoices.current[refIndex]}>
                    <option>Yes</option>
                    <option>No</option>
                    <option>Not Sure</option>
                    <option>N/A</option>
                </Form.Control></Form.Group>;
        refIndex++;
        return element;
    }

    function allYesNoQuestions() {
        const elements: JSX.Element[] = [];
        let yesAndNo = 5;
        while (yesAndNo) {
            elements.push(getElementYES());
            yesAndNo--;
        }
        return elements;
    }

    function getElementText() {
        const element =
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label column={false}>{labels[refIndex]}</Form.Label>
                <Form.Control as="textarea" rows="1" ref={FormChoices.current[refIndex]} defaultValue={""}
                              placeholder="Type Here"/>
            </Form.Group>;
        refIndex++;
        return element;
    }

    function textAreaQuestions() {
        const elements: JSX.Element[] = [];
        let areaText = 3;
        while (areaText) {
            elements.push(getElementText());
            areaText--;
        }
        return elements;
    }

    let moveON = (e: { preventDefault: () => void; }) => {
        const myInfo: PersonalInformation = {};
        for (let index = 0; index < MAX_QUESTIONS; index++) {
            const name = labels[index];
            myInfo[name] = FormChoices.current[index].current.value === "" ? "N/A" : FormChoices.current[index].current.value;
        }
        newUser.Personal = myInfo;
        router.push("/app");
    };

    const labels: string[] = ["Are you a self-conscious person?",
        "Are you experimental with what you wear?", "Do you wear Jewelery?", "Are you a frequent art museum goer?",
        "Do you wear makeup?", "Who is your favorite artist?",
        "What is your favorite song?", "Name one hobby of yours."];

    return (
        <div className="formBody">
            <h1>Personal Form</h1>
            <Form className="justForm">
                {allYesNoQuestions()}
                {textAreaQuestions()}
                <Button variant="primary" type="button" onClick={moveON}>
                    Submit
                </Button>
            </Form>
        </div>);
}

