import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const Challenge = (props) => {
    let {quizType, quizURL} = props;
    return (
        <div className="challenge">
        <h1>{quizType}</h1>
        <p>Challenge: Get as many questions right within 2 min.</p>
        <Button bsStyle="primary" bsSize="large">
            <Link style={{ textDecoration: 'none' }} to={`/quiz/questions/${quizURL}`}><span className="challengeLinkText">Start</span></Link>
        </Button>
    </div>

    );
}

export default Challenge;
