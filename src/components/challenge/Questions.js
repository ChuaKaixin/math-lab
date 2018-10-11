import React, { Component } from 'react';
import generateQuestion from './MathQuestionGenerator'
class Questions extends Component {
    state = {
        question: generateQuestion(this.props.quizType),
        questionAnswered: false
    }
    render() {
        let {questionAnswered} = this.state;
        let {num1, num2, operation, answer} = this.state.question;
        let {correctAnswerPosition} = answer;
        return (
            <div>
                <form>
                    <div>
                        <p>{num1} {operation} {num2} = ?</p>
                        <ol>
                            {answer.answerArray.map((item, index) => <ul key={index} className={this.generateAnswerDisplay(index, correctAnswerPosition)} onClick={(event)=> this.updateResults(index, event)}>{item}</ul>)}
                        </ol>
                    </div>
                    {questionAnswered && 
                        <button onClick={this.showNextQuestion}>Next</button>
                    }
                </form>
                <button onClick={this.props.goBackToMainMenu}>Menu</button>
            </div>
        );
    }

    showNextQuestion = (event) => {
        event.preventDefault();
        this.setState({question: generateQuestion(this.props.quizType)});
    }

    updateAnswer = (event) => {
        this.setState({answer:event.target.value})
    }

    updateResults = (optionClicked, event) => {
        event.preventDefault();
        this.props.updateQuizResults(optionClicked===this.state.question.answer.correctAnswerPosition);
        this.setState({questionAnswered:true})
    }

    generateAnswerDisplay = (index, correctAnswerPosition) => {
        if(this.state.questionAnswered) {
            if(index===correctAnswerPosition) {
                return "optionDisplayCorrect";
            } else {
                return "optionDisplayInCorrect";
            }
        } else {
            return "optionDisplayNotAnswered";
        }
    }
}

export default Questions;
