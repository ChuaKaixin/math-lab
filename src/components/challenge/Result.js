import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Label, Well, PageHeader, Image, Button, Alert} from 'react-bootstrap';
import ChallengeCompletedImg from '../../images/ChallengeCompletedImg.png';
import ResultsPlot from '../statistics/ResultsPlot';
class Results extends Component {
    state = {
        showAlert: false
    }
    render() {
        let {correctAnswers, wrongAnswers, quizType, updateQuizStatistics, quizStats} = this.props;
        let accuracy = correctAnswers + wrongAnswers === 0? 0: (Math.round(correctAnswers/(correctAnswers + wrongAnswers)*100)*100)/100;
        let {showAlert} = this.state;

        return (
            <div>
            <div className="results">
                <div>
                    <Image src={ChallengeCompletedImg} responsive/>
                </div>
                <div>
                    <PageHeader>
                        {quizType} Challenge Completed!
                    </PageHeader>
                </div>
            </div>
            <Well>
                    <p>Accuracy: {accuracy}%</p>
                    <h2><Label bsStyle='success'>{correctAnswers} Correct</Label> <Label bsStyle='danger'>{wrongAnswers} Wrong</Label></h2>
                    <ResultsPlot previousResults={quizStats} latestResult={{attempt: 'Latest', accuracy, correctAnswers}}/>
                    {!showAlert && 
                        <Button bsStyle="primary" bsSize="large" onClick={() => {
                            this.setState({showAlert:true});
                            updateQuizStatistics(accuracy, correctAnswers, quizType);
                            }}>
                            <span className="challengeLinkText">Record Results</span>
                        </Button>}
                    {showAlert &&
                        <Alert bsStyle="warning">
                        Thank you for playing! <Link style={{ textDecoration: 'none' }} to='/'>Back to menu</Link>
                        </Alert>
                    }
            </Well>
            
        </div>
        );
    }

    recordResults = (accuracy, correctAnswers, quizType, updateQuizStatistics) => {
        updateQuizStatistics(accuracy, correctAnswers, quizType);
    }
    
}

export default Results;
