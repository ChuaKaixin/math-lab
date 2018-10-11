import React, { Component } from 'react';
import Quiz from './Quiz';

class Challenge extends Component {
    state = {
        challengeStatus : 'notstarted',
        quizType : this.props.quizType
    }
    render() {
        let {challengeStatus, quizType} = this.state;
        return (
            <div className="challengeBody">
                {challengeStatus === 'notstarted' && 
                    <div>
                        <button onClick={this.startChallenge}>Start</button>
                        <button onClick={this.props.goBackToMainMenu}>Menu</button>
                    </div>
                }
                {challengeStatus === 'started' && 
                    <Quiz quizType={quizType} updateQuizStatistics={this.props.updateQuizStatistics} goBackToMainMenu={this.props.goBackToMainMenu}/>
                }
            </div>
        );
    }

    startChallenge = () => {
        this.setState({challengeStatus: 'started'})
    }
}

export default Challenge;
