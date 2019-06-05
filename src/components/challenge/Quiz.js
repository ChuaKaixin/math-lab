import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import Result from './Result';
import Questions from './Questions';
import {Label, Well, ProgressBar} from 'react-bootstrap';
import Constants from '../utilities/Constants';
import {Button} from 'react-bootstrap';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state= {
            correctAnswers: 0,
            wrongAnswers: 0,
            endChallenge: false
        }
        this.timeAllowedInSeconds = props.location.state? (
            props.location.state.timeControl==='No limit'?-1: props.location.state.timeControl*60)
            :60;
    }

    render() {
        if(this.timeAllowedInSeconds!==-1) {
            return (
                <Countdown
                    date={Date.now() + this.timeAllowedInSeconds * 1000}
                    renderer={this.renderer}
                />
            );
        } else {
            return (
                <Countdown
                    date={Date.now() + 100000 * 1000}
                    renderer={this.renderer}
                />
            );
        }
    }

    CompletionDisplay = () => {
        return (
            <div className="quizBody">
                <Result quizType={this.props.quizType} correctAnswers={this.state.correctAnswers} wrongAnswers={this.state.wrongAnswers}/>
            </div>
        )
    ;}
    renderer = ({ hours, minutes, seconds, completed }) => {
        let timeRemaining = parseInt(seconds,10) + parseInt(minutes,10)*60;
        if (completed || this.state.endChallenge) {
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
                        <div className="text-right">
                            <Button bsStyle="primary" onClick={() => {this.setState({endChallenge:true})}}>
                                <span className="challengeLinkText">End Challenge</span>
                            </Button>
                        </div>
                        </h5>
                    </Well>
                    {this.timeAllowedInSeconds!==-1 && 
                    <div>
                    <p>Time Remaining: {hours}:{minutes}:{seconds}</p>
                    <span>
                        <ProgressBar active striped bsStyle={this.getProgressBarStyleAccordingToTimeLeft(timeRemaining)} min={0} max={this.timeAllowedInSeconds} now={timeRemaining}/>

                    </span>
                    </div>}
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

