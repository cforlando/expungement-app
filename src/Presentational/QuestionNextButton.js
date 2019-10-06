import React from 'react';

const QuestionNextButton = (props) => {
    return (
        <button onClick={ props.nextButtonClick } disabled={ props.isDisabled }>
            >
        </button>
    );
};

export default QuestionNextButton;