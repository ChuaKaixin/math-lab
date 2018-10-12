import React, { Component } from 'react';
import './App.css';
import PageRouter from './components/utilities/PageRouter';
import Constants from './components/utilities/Constants';
import {BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
  state = {
    apprenticeLevelStatistics:[],
    adeptLevelStatistics:[],
    masterLevelStatistics:[]
  }
  render() {
    let {apprenticeLevelStatistics, adeptLevelStatistics, masterLevelStatistics} = this.state;
    return (
      <Router>
        <PageRouter 
        updateQuizStatistics={this.updateQuizStatistics} 
        apprenticeLevelStatistics={this.state.apprenticeLevelStatistics}
        adeptLevelStatistics={adeptLevelStatistics}
        masterLevelStatistics={masterLevelStatistics}/>
      </Router>
  );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.apprenticeLevelStatistics.length !==nextState.apprenticeLevelStatistics.length) {
         return false;
    }
    return true;
}

  updateQuizStatistics = (accuracy, correctAnswers, quizType) => {
    switch(quizType) {
      case Constants.level1Description:
        let apprenticeLevelStatistics = [...this.state.apprenticeLevelStatistics];
        apprenticeLevelStatistics.push({attempt: apprenticeLevelStatistics.length+1, accuracy, correctAnswers});
        this.setState({apprenticeLevelStatistics});
        break;
      default:
        break;
    }
  }
}

export default App;
