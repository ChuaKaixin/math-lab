import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Constants from '../utilities/Constants';
import PracticeOptionsForm from './PracticeOptionsForm';

export default class Challenge extends Component {
  render() {
    let {quizType, quizURL} = this.props;
    return (
        <div className="challenge">
        <h1>{quizType}</h1>
        {quizType===Constants.practiceDescription &&
            <PracticeOptionsForm/>
        }
        {quizType!==Constants.practiceDescription &&
        <p>Challenge: Get as many questions right within 2 min.</p>
        }
        {quizType!==Constants.practiceDescription &&
        <Button bsStyle="primary" bsSize="large">
            <Link style={{ textDecoration: 'none' }} to={`/quiz/questions/${quizURL}`}><span className="challengeLinkText">Start</span></Link>
        </Button>}
        </div>
    )
  }
}