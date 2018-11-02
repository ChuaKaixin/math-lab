import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Label, Well, PageHeader, Image, Button, Alert} from 'react-bootstrap';
import ChallengeCompletedImg from '../../images/ChallengeCompletedImg.png';
import ResultsPlot from '../statistics/ResultsPlot';
import {commitResults, getResultsBaseOnLevel} from './ResultHandler';
class Results extends Component {
    state = {
        showAlert: false,
        previousResults: null
    }

    async componentDidMount() {
        const results =await getResultsBaseOnLevel(this.props.quizType);
        if(results) {
            this.setState({previousResults : results});
        }
    }

    render() {
        let {correctAnswers, wrongAnswers, quizType} = this.props;
        let accuracy = correctAnswers + wrongAnswers === 0? 0: (Math.round(correctAnswers/(correctAnswers + wrongAnswers)*100)*100)/100;
        let {showAlert,previousResults} = this.state;

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
                    <ResultsPlot previousResults={previousResults} latestResult={{attemptId: 'Latest', accuracy, score: correctAnswers}}/>
                    {!showAlert && 
                        <Button bsStyle="primary" bsSize="large" onClick={() => {
                            this.setState({showAlert:true});
                            this.recordResults(accuracy, correctAnswers, quizType);
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

    recordResults = (accuracy, correctAnswers, quizType) => {
        commitResults(quizType, correctAnswers);
    }
    
}

export default Results;
