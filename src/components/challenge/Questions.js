import React, { Component } from 'react';
import generateQuestion from './MathQuestionGenerator'
import Label from 'react-bootstrap/lib/Label';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import {Button} from 'react-bootstrap';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

class Questions extends Component {
    state = {
        question: generateQuestion(this.props.quizType),
        questionAnswered: false,
        chosenAnswerIndex: 0
    } 
    render() {
        let {questionAnswered, chosenAnswerIndex} = this.state;
        let {num1, num2, operation, answer} = this.state.question;
        let {correctAnswerPosition} = answer;
        const listStyle = {
            outline: 'none'
        }
        return (
            <div>
                <form>
                    <div>
                        <div className="questionGrid">
                            <div></div>
                            <div><h1><Label>{num1}</Label></h1></div>
                            <div><h1>{operation}</h1></div>
                            <div><h1><Label>{num2}</Label></h1></div>
                            <div><h1>=</h1></div>
                            <div><h1><Label>?</Label></h1></div>
                            <div></div>
                        </div>
                        <div className="answerGrid">
                            <ListGroup>
                                {answer.answerArray.map((item, index) => 
                                <ListGroupItem 
                                style= {listStyle}
                                onClick={(event)=> this.updateResults(index, event)} 
                                bsStyle={this.getAnswerDisplay(index, correctAnswerPosition)} 
                                key={index}>
                                    {questionAnswered&&index===chosenAnswerIndex?'*':''}{item}
                                </ListGroupItem>)}
                            </ListGroup>
                        </div>
                    </div>
                    <Button bsStyle="primary" onClick={this.showNextQuestion}>Next</Button>
                </form>
            </div>
        );
    }

    disableEnableAnswer = () => {
        if(this.state.questionAnswered) {
            return "pointer-events:none;"
        } else
            return "";
    }

    showNextQuestion = (event) => {
        event.preventDefault();
        this.setState({
            question: generateQuestion(this.props.quizType),
            questionAnswered: false
        });
    }

    updateAnswer = (event) => {
        this.setState({answer:event.target.value})
    }

    updateResults = (optionClicked, event) => {
        event.preventDefault();
        if(!this.state.questionAnswered) {
        this.props.updateQuizResults(optionClicked===this.state.question.answer.correctAnswerPosition);
        this.setState({
            questionAnswered:true,
            chosenAnswerIndex:optionClicked
        })}
    }

    getAnswerDisplay = (index, correctAnswerPosition) => {
        if(this.state.questionAnswered) {
            if(index===correctAnswerPosition) {
                return "success";
            } else {
                return "danger";
            }
        } else {
            return "warning";
        }
    }

}

export default Questions;
