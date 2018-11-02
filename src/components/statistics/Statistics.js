import React, { Component } from 'react';
import {Nav, NavItem, Table, Panel} from 'react-bootstrap';
import Constants from '../utilities/Constants';
import ResultsPlot from './ResultsPlot';
import {getResults} from '../challenge/ResultHandler';

class Statistics extends Component {

    state = {
        statisticsToDisplay : 'Summary',
        results : null
    }

    async componentDidMount() {
        const results =await getResults();
        if(results) {
            this.setState({results : results});
        }
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
                    <ResultsPlot previousResults={this.state.results[this.state.statisticsToDisplay].progress}/>
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
            </div>
        );
    }

    handleSelect= (eventKey, event) => {
        event.preventDefault();
        this.setState({statisticsToDisplay: eventKey});
      }

    
}

export default Statistics;
