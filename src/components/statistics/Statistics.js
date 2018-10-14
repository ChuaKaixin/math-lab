import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';
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
            </div>
        );
    }

    handleSelect= (eventKey, event) => {
        event.preventDefault();
        this.setState({statisticsToDisplay: eventKey});
      }
}

export default Statistics;
