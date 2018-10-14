import React, { Component } from 'react';
import {Nav, NavItem, Table, Panel} from 'react-bootstrap';
import Constants from '../utilities/Constants';
import ResultsPlot from './ResultsPlot';

class Statistics extends Component {

    state = {
        statisticsToDisplay : 'Summary'
    }
    
    componentDidMount = () => {
        this.props.triggerStatsRefresh();
    }

    render() {
         return (
            <div className="quizBody">
                <Nav bsStyle="tabs" activeKey={this.state.statisticsToDisplay} onSelect={(k, event) => this.handleSelect(k, event)}>
                    <NavItem eventKey="Summary">
                        Summary
                    </NavItem>
                    {Object.keys(this.props.quizStats).map(key => (<NavItem key={key} eventKey={key}>{key}</NavItem>))}
                </Nav>
                {this.state.statisticsToDisplay!==Constants.statisticsDefaultDisplay && 
                    <ResultsPlot previousResults={this.props.quizStats[this.state.statisticsToDisplay]}/>
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
                                    {Object.keys(this.props.quizStats).map(key => (<tr key={key}><td>{key}</td><td>{this.props.quizStats[key].length}</td></tr>))}
                                </tbody>
                            </Table>
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
