import React, { Component } from 'react';
import {Nav, NavItem, Table, Panel, PageHeader} from 'react-bootstrap';
import Constants from '../utilities/Constants';
import ResultsPlot from './ResultsPlot';
import {getResults, getScoreBoard} from '../challenge/ResultHandler';
import ScoreImg from '../../images/score.png';
import ScoreBoardImg from '../../images/scoreboard.png';

class Statistics extends Component {

    state = {
        statisticsToDisplay : 'Summary',
        results : null,
        scoreBoard : {}
    }

    async componentDidMount() {
        const results =await getResults();
        const scoreBoard = await getScoreBoard();
        this.setState({
            results : results,
            scoreBoard:scoreBoard});
    }

    render() {
         return (
            <div className="quizBody">
            {this.state.results !== null && 
            <div>
                <Nav bsStyle="tabs" activeKey={this.state.statisticsToDisplay} onSelect={(k, event) => this.handleSelect(k, event)}>
                    <NavItem eventKey="Summary">
                        Summary
                    </NavItem>
                    {Object.keys(this.state.results).map(key => (<NavItem key={key} eventKey={key}>{key}</NavItem>))}
                </Nav>
                {this.state.statisticsToDisplay!==Constants.statisticsDefaultDisplay && 
                    <div>
                        <div>
                            <div className="statistics">
                                <div><img alt="" className="statsImg" src={ScoreImg}/></div>
                                <div><PageHeader>Your Scores</PageHeader></div>
                            </div>
                            <ResultsPlot previousResults={this.state.results[this.state.statisticsToDisplay].progress}/>
                        </div>
                        {this.state.scoreBoard[this.state.statisticsToDisplay] && 
                        <div>
                            <div className="statistics">
                                <div><img alt="" className="statsImg" src={ScoreBoardImg}/></div>
                                <div><PageHeader>Top scores</PageHeader></div>
                            </div>
                            <Table responsive striped bordered condensed hover>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Score</th>
                                        <th>Users</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.scoreBoard[this.state.statisticsToDisplay].map((element, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{element.score}</td>
                                        <td>{element.username.join(', ')}</td>
                                    </tr>))}
                                </tbody>
                            </Table>
                        </div>}
                    </div>
                }
                {this.state.statisticsToDisplay===Constants.statisticsDefaultDisplay && 
                    <Panel>
                         <Panel.Heading>Summary</Panel.Heading>
                        <Panel.Body>
                            <Table responsive striped bordered condensed hover>
                                <thead>
                                    <tr>
                                        <th>Challenge</th>
                                        <th>Attempts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(this.state.results).map(key => (<tr key={key}><td>{key}</td><td>{this.state.results[key].progress.length}</td></tr>))}
                                </tbody>
                            </Table>
                        </Panel.Body>
                    </Panel>
                }
            </div> }
            {this.state.results === null &&
                <Panel>
                <Panel.Heading>Summary</Panel.Heading>
                <Panel.Body>
                   <p>No results</p>
               </Panel.Body>
           </Panel>
            }
            </div>
        );
    }

    handleSelect= (eventKey, event) => {
        event.preventDefault();
        this.setState({statisticsToDisplay: eventKey});
      }

    
}

export default Statistics;
