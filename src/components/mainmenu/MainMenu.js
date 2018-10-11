import React, { Component } from 'react';

class MainMenu extends Component {
    render() {
        return (
            <div>
                <h1>Math Lab</h1>
                <p>Choose Your Challenge...</p>
                <button onClick={() => this.props.handleChallengeSelection('apprentice')}>Apprentice</button>
                <button onClick={() => this.props.handleChallengeSelection('adept')}>Adept</button>
                <button onClick={() => this.props.handleChallengeSelection('master')}>Master</button>
                <button onClick={() => this.props.handleChallengeSelection('statistics')}>Statistics</button>
            </div>
        );
    }
}

export default MainMenu;
