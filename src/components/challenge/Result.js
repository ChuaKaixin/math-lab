import React, { Component } from 'react';

class Result extends Component {
    constructor(props) {
        super(props);
        let {correctAnswers, wrongAnswers} = this.props;
        this.state = {
            accuracy : correctAnswers + wrongAnswers === 0? 0: correctAnswers/(correctAnswers + wrongAnswers)*100
        };
    }

    componentDidMount = () => {
        this.props.updateQuizStatistics(this.state.accuracy, this.props.correctAnswers, this.props.quizType);
    }

    render() {
        let {correctAnswers} = this.props;
        return (
            <div>
                <p>Accuracy: {this.state.accuracy}%</p>
                <p>Correct Answers: {correctAnswers}</p>
                <button onClick={this.props.goBackToMainMenu}>Start Again</button>
            </div>

        );
    }


}

export default Result;

