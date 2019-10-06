import React from 'react';
import QuestionPresentational from '../Presentational/QuestionPresentational';
import QuestionError from '../Presentational/QuestionError';
import QuestionLoading from '../Presentational/QuestionLoading';
import QuestionNextButton from '../Presentational/QuestionNextButton';
import QuestionPrevButton from '../Presentational/QuestionPrevButton';
import axios from 'axios';

class QuestionContainer extends React.Component {
    constructor() {
      super();
      this.state = {
        questions: [],
        currentQuesNum: 0,
        prevQuesNum: 0,
        isLoading: true,
        nextEnabled: "",
        prevEnabled: "",
        errorFlag: false
      };

      this.handleNextClick = this.handleNextClick.bind(this);
      this.handlePrevClick = this.handlePrevClick.bind(this);
      this.checkButtonStatus = this.checkButtonStatus.bind(this);
    }

    handleNextClick() {
      this.setState(state => ({
        prevQuesNum: state.currentQuesNum,
        currentQuesNum: state.currentQuesNum + 1,
      }));
      this.checkButtonStatus();
    }

    handlePrevClick() {
      this.setState(state => ({
        prevQuesNum: state.currentQuesNum,
        currentQuesNum: state.currentQuesNum - 1,
      }));
      this.checkButtonStatus();
    }

    // if the question sequence is at initial position (0)
    // the previous question button should be disabled.
    // also checks if it is at the last question and disables
    // the next button if so
    checkButtonStatus() {
      this.state.currentQuesNum === 0 ? 
          this.setState({ prevEnabled: "disabled" }) 
        : this.setState({ prevEnabled: "" });
      this.state.currentQuesNum === (this.state.questions.length - 1) ?
          this.setState({ nextEnabled: "disabled" })
        : this.setState({ nextEnabled: "" })
    }
  
    componentDidMount() {
      this.checkButtonStatus();
      // AJAX using Axios
      // the origin of this data is very likely going to change at some point.
      axios.get('https://raw.githubusercontent.com/AubreySLavigne/expungement-backend/develop/real-questions.json')
      .then(res => res.data)
      .then((data) => {
        let questionsData = [];
        for(let obj in data) {
          // console.log(data[obj]);
          questionsData.push(data[obj]);
        }
        this.setState(() => {
          return {
            questions: questionsData,
            isLoading: false
          }
        });
      }).catch((err) => {
        console.log(err);
        this.setState(() => {
          return {
            errorFlag: true
          };
        })
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevState.currentQuesNum !== this.state.currentQuesNum) {
        this.checkButtonStatus();
        console.log(prevProps, prevState);
      }
    }

    render() {
      const errorFlag = this.state.errorFlag;
      
      let isLoading = this.state.isLoading;
      
      let QuestionRender;
      isLoading ? QuestionRender = <QuestionLoading /> : 
      QuestionRender = 
      <div>
        <QuestionPresentational 
          question={ this.state.questions[this.state.currentQuesNum].question} 
          id={ this.state.questions[this.state.currentQuesNum].id }
          choices = { this.state.questions[this.state.currentQuesNum].choices }
          settings = { this.state.questions[this.state.currentQuesNum].settings }
        />
        <QuestionPrevButton prevButtonClick={ this.handlePrevClick } isDisabled={ this.state.prevEnabled } />
        <QuestionNextButton nextButtonClick={ this.handleNextClick } isDisabled={ this.state.nextEnabled } />
      </div>;
      if(errorFlag) QuestionRender = <QuestionError /> ;
    
      return QuestionRender;
    }
  }

  export default QuestionContainer;