import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Constants from '../utilities/Constants';
import UserMenu from '../user/UserMenu';
import { AuthConsumer } from '../context/AuthContext';

class MainMenu extends Component {
    render() {
        return (
            <div className="frontPage">
                <div className="spacer"></div>
                <div className="whiteBorder">
                    <UserMenu/>
                    <h1 className="frontPageTitle">Math Classroom</h1>
                    <AuthConsumer>
                    {({ isAuth }) => (
                        <div>
                        {isAuth ? (
                            <div>
                                <div className="frontPageLinks"><Link to={`/quiz/${Constants.level1subURL}`} className="frontPageText">{Constants.level1Description}</Link></div>
                                <div className="frontPageLinks"><Link to={`/quiz/${Constants.level2subURL}`} className="frontPageText">{Constants.level2Description}</Link></div>
                                <div className="frontPageLinks"><Link to={`/quiz/${Constants.level3subURL}`} className="frontPageText">{Constants.level3Description}</Link></div>
                                <div className="frontPageLinks"><Link to='/statistics' className="frontPageText">Statistics</Link></div>
                            </div>
                        ) : (
                            <div className="frontPageLinks"><Link to='/login' className="frontPageText">Login</Link></div>
                        )}
                        </div>
                    )}
                    </AuthConsumer>
                </div>
            </div>
        );
    }
}

export default MainMenu;
