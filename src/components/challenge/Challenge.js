import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Constants from '../utilities/Constants';
import {Button} from 'react-bootstrap';

class Challenge extends Component {
    state = {
        quizType : this.props.quizType
    }
    render() {
        return (
            <div className="challenge">
                <h1>{this.props.quizType}</h1>
                <p>Challenge: Get as many questions right within 2 min.</p>
                <Button bsStyle="primary" bsSize="large">
                    <Link style={{ textDecoration: 'none' }} to={`/quiz/questions/${Constants.level1subURL}`}><span className="challengeLinkText">Start</span></Link>
                </Button>
            </div>
        );
    }

}

export default Challenge;
