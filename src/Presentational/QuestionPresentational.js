import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const QuestionPresentational = (props) => {
    return (
        <Jumbotron><h1>{props.question}</h1></Jumbotron>
    )
}

export default QuestionPresentational;