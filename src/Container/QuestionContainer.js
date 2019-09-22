import React from 'react';
import QuestionPresentational from '../Presentational/QuestionPresentational';
import QuestionError from '../Presentational/QuestionError';
import QuestionLoading from '../Presentational/QuestionLoading';
import axios from 'axios';

class QuestionContainer extends React.Component {
    constructor() {
      super();
      this.state = {
        question: "",
        id: "",
        choices: [],
        isLoading: true,
        errorFlag: false
      };
    }
  
    componentDidMount() {
      // AJAX using Axios
      // the origin of this data is very likely going to change at some point.
      axios.get('https://raw.githubusercontent.com/AubreySLavigne/expungement-backend/develop/real-questions.json')
      .then(res => res.data)
      .then((data) => {
        this.setState(() => {
          return {
            question: data[0].question,
            isLoading: false
          }
        })
        
      }).catch((err) => {
        console.log(err);
        this.setState(() => {
          return {
            errorFlag: true
          };
        })
      });
    }
  
    render() {
      const errorFlag = this.state.errorFlag;
      let isLoading = this.state.isLoading;
      let QuestionRender;
      isLoading ? QuestionRender = <QuestionLoading /> : QuestionRender = <QuestionPresentational question={ this.state.question } />;

      if(errorFlag) QuestionRender = <QuestionError /> ;
    
      return QuestionRender;
    }
  }

  export default QuestionContainer;