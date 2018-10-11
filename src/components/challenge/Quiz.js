import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';
import Result from './Result';
import Questions from './Questions';

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state= {
            correctAnswers: 0,
            wrongAnswers: 0,
        }
        this.timeAllowedInSeconds = 5;
    }

    render() {
        return (
            <Countdown
                date={Date.now() + this.timeAllowedInSeconds * 1000}
                renderer={this.renderer}
            />
        );
    }

    CompletionDisplay = () => <Result quizType={this.props.quizType} updateQuizStatistics={this.props.updateQuizStatistics} goBackToMainMenu={this.props.goBackToMainMenu} correctAnswers={this.state.correctAnswers} wrongAnswers={this.state.wrongAnswers}/>;
    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return this.CompletionDisplay();
        } else {
            // Render a countdown
            return <div>
                    <span>{hours}:{minutes}:{seconds}</span>
                    <span><ProgressBar active striped bsStyle={this.updateProgressBarStyleAccordingToTimeLeft(seconds)} min={0} max={this.timeAllowedInSeconds} now={parseInt(seconds, 10)}/></span>
                    <Questions quizType={this.props.quizType} goBackToMainMenu={this.props.goBackToMainMenu} updateQuizResults={this.updateQuizResults}/>
                </div>;
        }
        };
    
    updateProgressBarStyleAccordingToTimeLeft= (currentSeconds) => {
        if(currentSeconds/this.timeAllowedInSeconds > 0.8) {
            return "info";
        } else if (currentSeconds/this.timeAllowedInSeconds <= 0.8) {
            return "warning";
        } else {
            return "danger";
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
        if(this.state.correctAnswers !==nextState.correctAnswers || this.state.wrongAnswers !== nextState.wrongAnswers ) {
             return false;
        }
        return true;
   }
}

export default Quiz;

