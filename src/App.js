import React, { Component } from 'react';
import './App.css';
import PageRouter from './components/utilities/PageRouter';
import Constants from './components/utilities/Constants';
import {BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
  state = {
    apprenticeLevelStatistics:[],
    adeptLevelStatistics:[],
    masterLevelStatistics:[],
    statsRefresh:false
  }
  render() {
    let {apprenticeLevelStatistics, adeptLevelStatistics, masterLevelStatistics} = this.state;
    return (
      <Router>
        <PageRouter 
        updateQuizStatistics={this.updateQuizStatistics} 
        apprenticeLevelStatistics={apprenticeLevelStatistics}
        adeptLevelStatistics={adeptLevelStatistics}
        masterLevelStatistics={masterLevelStatistics}
        triggerStatsRefresh={this.triggerStatsRefresh}/>
      </Router>
  );
  }

  
  shouldComponentUpdate(nextProps, nextState) {
    if(this.state.apprenticeLevelStatistics.length !==nextState.apprenticeLevelStatistics.length ||
      this.state.adeptLevelStatistics.length !==nextState.adeptLevelStatistics.length || 
      this.state.masterLevelStatistics.length !==nextState.masterLevelStatistics.length) {
         return false;
    }
    return true;
  }

  updateQuizStatistics = (accuracy, correctAnswers, quizType) => {
    switch(quizType) {
      case Constants.level1Description:
        let apprenticeLevelStatistics = [...this.state.apprenticeLevelStatistics];
        apprenticeLevelStatistics.push({attempt: apprenticeLevelStatistics.length+1, accuracy, correctAnswers});
        this.setState({apprenticeLevelStatistics, statsRefresh:false});
        break;
      case Constants.level2Description:
        let adeptLevelStatistics = [...this.state.adeptLevelStatistics];
        adeptLevelStatistics.push({attempt: adeptLevelStatistics.length+1, accuracy, correctAnswers});
        this.setState({adeptLevelStatistics, statsRefresh:false});
        break;
      case Constants.level3Description:
        let masterLevelStatistics = [...this.state.masterLevelStatistics];
        masterLevelStatistics.push({attempt: masterLevelStatistics.length+1, accuracy, correctAnswers});
        this.setState({masterLevelStatistics, statsRefresh:false});
        break;
      default:
        break;
    }
  }

  triggerStatsRefresh = () => {
    if(!this.state.statsRefresh) {
      this.setState({statsRefresh:!this.state.statsRefresh});
    }
  }
}

export default App;
