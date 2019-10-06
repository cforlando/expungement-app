import React from 'react';

const QuestionPrevButton = (props) => {
    return (
        <button onClick={ props.prevButtonClick } disabled={ props.isDisabled }>
            PREV
        </button>
    );
};

export default QuestionPrevButton;