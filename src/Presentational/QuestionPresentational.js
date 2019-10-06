import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

const QuestionPresentational = (props) => {
    // form type will be dependent on the object being passed down from props

    const choices = [];
    if(props.choices) { // choices have to actually exist to be populated
        for(let el in props.choices) {
            choices.push(
                <div key={`ques_${el}`} >
                    <input type="radio" key={el} name={props.id} value={props.choices[el]}></input>
                    <label>{ props.choices[el] }</label>
                </div>
            );
        }
    }

    let QuestionForm = 
        <form>
            { props.question }
            <div id="choiceSelect">
                { choices }
            </div>
        </form>
        
    return (
        <Jumbotron>
            { QuestionForm }
        </Jumbotron>
    )
}

export default QuestionPresentational;