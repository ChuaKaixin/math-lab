import React from 'react';
import {Link} from 'react-router-dom';
import {Label, Well, PageHeader, Image, Button} from 'react-bootstrap';
import ChallengeCompletedImg from '../../images/ChallengeCompletedImg.png';
import ResultsPlot from '../statistics/ResultsPlot';
const Result = (props) => {
    let {correctAnswers, wrongAnswers, quizType, updateQuizStatistics} = props;
    let accuracy = correctAnswers + wrongAnswers === 0? 0: (Math.round(correctAnswers/(correctAnswers + wrongAnswers)*100)*100)/100;
    updateQuizStatistics(accuracy, correctAnswers, quizType);
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
                    <ResultsPlot previousResults={[]} latestResult={{attempt: 'Latest', accuracy, correctAnswers}}/>
                    <Button bsStyle="primary" bsSize="large">
                        <Link style={{ textDecoration: 'none' }} to='/'><span className="challengeLinkText">Main Menu</span></Link>
                    </Button>
            </Well>
        </div>

    );
}

export default Result;


