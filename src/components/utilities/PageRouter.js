import React from 'react';
import MainMenu from '../mainmenu/MainMenu';
import Challenge from '../challenge/Challenge';
import Quiz from '../challenge/Quiz';
import Login from '../user/Login';
import PasswordChange from '../user/PasswordChange';
import Statistics from '../statistics/Statistics';
import {Route, Switch,} from 'react-router-dom'
import Layout from "../utilities/Layout";
import Constants from './Constants';


const PageRouter = (props) => {
    return (
        <Switch>
          <Route path='/' exact component={MainMenu}/>
          <Layout path={`/quiz/${Constants.practicesubURL}`} quizType={Constants.practiceDescription} quizURL={Constants.practicesubURL} component={Challenge}/>
          <Layout path={`/quiz/${Constants.level1subURL}`} quizType={Constants.level1Description} quizURL={Constants.level1subURL} component={Challenge}/>
          <Layout path={`/quiz/${Constants.level2subURL}`} quizType={Constants.level2Description} quizURL={Constants.level2subURL} component={Challenge}/>
          <Layout path={`/quiz/${Constants.level3subURL}`} quizType={Constants.level3Description} quizURL={Constants.level3subURL} component={Challenge}/>
          <Layout path={`/quiz/questions/${Constants.level1subURL}`} quizType={Constants.level1Description} component={Quiz}/>
          <Layout path={`/quiz/questions/${Constants.level2subURL}`} quizType={Constants.level2Description} component={Quiz}/>
          <Layout path={`/quiz/questions/${Constants.level3subURL}`} quizType={Constants.level3Description} component={Quiz}/>
          <Layout path='/statistics' component={Statistics}/>
          <Layout path='/login' component={Login}/>
          <Layout path='/passwordChange' component={PasswordChange}/>
        </Switch>
    );
}


export default PageRouter;
