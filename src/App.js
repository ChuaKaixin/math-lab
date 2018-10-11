import React, { Component } from 'react';
import './App.css';
import MainMenu from './components/mainmenu/MainMenu';
import Challenge from './components/challenge/Challenge';
import Statistics from './components/statistics/Statistics';

class App extends Component {
  state = {
    chosenOption:'mainmenu',
    apprenticeLevelStatistics:[],
    adeptLevelStatistics:[],
    masterLevelStatistics:[]
  }
  render() {
    let {chosenOption} = this.state;
    return (
      <div>
      {chosenOption === 'mainmenu' && 
        <MainMenu handleChallengeSelection={this.handleChallengeSelection}/>
      }
      {chosenOption === 'apprentice' && 
        <Challenge quizType='apprentice' updateQuizStatistics={this.updateQuizStatistics} goBackToMainMenu={this.goBackToMainMenu}/>
      }
      {chosenOption === 'statistics' && 
        <Statistics apprenticeLevelStatistics={this.state.apprenticeLevelStatistics} goBackToMainMenu={this.goBackToMainMenu}/>
      }
      </div>
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
      case "apprentice":
        let apprenticeLevelStatistics = [...this.state.apprenticeLevelStatistics];
        apprenticeLevelStatistics.push({accuracy, correctAnswers});
        this.setState({apprenticeLevelStatistics});
        break;
      default:
        break;
    }
  }

  goBackToMainMenu = () => {
    this.setState({chosenOption : 'mainmenu'})
  }

  handleChallengeSelection = (challenge) => {
    this.setState({chosenOption: challenge});
  }
}

export default App;
