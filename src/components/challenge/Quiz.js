import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import Result from './Result';
import Questions from './Questions';
import {Label, Well, ProgressBar} from 'react-bootstrap';
import Constants from '../utilities/Constants';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state= {
            correctAnswers: 0,
            wrongAnswers: 0
        }
        this.timeAllowedInSeconds = 60;
    }

    render() {
        return (
            <Countdown
                date={Date.now() + this.timeAllowedInSeconds * 1000}
                renderer={this.renderer}
            />
        );
    }

    CompletionDisplay = () => {
        return (
            <div className="quizBody">
                <Result quizType={this.props.quizType} correctAnswers={this.state.correctAnswers} wrongAnswers={this.state.wrongAnswers}/>
            </div>
        )
    ;}
    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return this.CompletionDisplay();
        } else {
            // Render a countdown
            return <div className="quizBody">
                    <Well>
                        <h4>Challenge: {this.props.quizType}</h4>
                        <h5>
                        <Label bsStyle="success">{this.state.correctAnswers} CORRECT</Label>
                        <Label bsStyle="danger">{this.state.wrongAnswers} WRONG</Label>
                        </h5>
                    </Well>
                    <p>Time Remaining: {hours}:{minutes}:{seconds}</p>
                    <span>
                        <ProgressBar active striped bsStyle={this.getProgressBarStyleAccordingToTimeLeft(seconds)} min={0} max={this.timeAllowedInSeconds} now={parseInt(seconds, 10)}/>

                    </span>
                    <Questions quizType={this.props.quizType} updateQuizResults={this.updateQuizResults}/>
                </div>;
        }
        };
    
    getProgressBarStyleAccordingToTimeLeft= (currentSeconds) => {
        if(currentSeconds/this.timeAllowedInSeconds > 0.8) {
            return Constants.progressBarInfo;
        } else if (currentSeconds/this.timeAllowedInSeconds <= 0.8) {
            return Constants.progressBarWarning;
        } else {
            return Constants.progressBarDanger;
        }

    }
    
    updateQuizResults = (isCorrect) => {
        if(isCorrect) {
            this.setState({correctAnswers: this.state.correctAnswers+1})
        } else {
            this.setState({wrongAnswers: this.state.wrongAnswers+1})
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.correctAnswers !==nextState.correctAnswers || this.state.wrongAnswers !== nextState.wrongAnswers 
            || nextState.quizCompleted) {
             return false;
        }
        return true;
   }
}

export default Quiz;

