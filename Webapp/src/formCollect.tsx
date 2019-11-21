import React from 'react';
import {Button, Form} from "react-bootstrap";

export default function FormCollect(props: any) {
    const element = <Form.Control as="select">
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

    return (
        <div className="formBody">
            <h1>Please Fill out this Form</h1>
            <Form className="justForm">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Purpose</Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        {element}
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Please Fill all boxes
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Challenge</Form.Label>
                    {element}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Immerse</Form.Label>
                    {element}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Rewards</Form.Label>
                    {element}
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Feedback</Form.Label>
                    {element}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

