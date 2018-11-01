import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {login, signup} from './LoginHandler';
import { AuthConsumer } from '../context/AuthContext';
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        loginMode : true,
        email: "",
        emailValid: false,
        password: "",
        passwordValid: false,
        loginCompleted: false,
        signupCompleted: false,
        loginFailureMessage: ""
    }
    render() {
        return (
            <div>
                {this.state.loginCompleted && 
                    <Redirect to='/' />
                }
                {!this.state.loginCompleted && 
                <AuthConsumer>
                {({ isAuth, login, logout }) => (
                    <div className="loginBackground">
                        <div className="loginForm">
                            <div>
                                <div className="loginMenu">
                                    <div className={this.getDisplayClass('Login')} onClick={this.toggleLoginAndCreation}><h4>Login</h4></div>
                                    <div className={this.getDisplayClass('Register')} onClick={this.toggleLoginAndCreation}><h4>Register</h4></div>
                                </div>
                                {!this.state.loginFailureMessage && 
                                    <p className="spacerWords">.</p>
                                }
                                {this.state.loginFailureMessage && 
                                    <p className="alertWords">{this.state.loginFailureMessage}</p>
                                }
                                {this.state.signupCompleted && 
                                    <p className="registerSuccessWords">Registration successful. Please login.</p>
                                }
                                <form className="loginInputFields">
                                    <div><input onChange={this.recordEmail} required className="loginInput" type="email" placeholder="email address"/></div>
                                    <div>
                                        <input onChange={this.recordPassword} required pattern=".{8,}" className="loginInput" type="password" placeholder="password" title="Password must be at least 8 chars"/>
                                    </div>
                                    <Button type="submit" disabled={!this.inputIsValid()} onClick={(event) => {this.submitLogin(login, event)}} className="loginButton" bsSize="large"><h4>{this.state.loginMode?"Login":"Register"}</h4></Button>
                                </form>
                            </div>
                        </div>
                </div>
            )}
            </AuthConsumer>
            }
        </div>
        );
    }
    inputIsValid = () => {
        return this.state.emailValid && this.state.passwordValid;
    }

    submitLogin = async(authContextLogin, event) => {
        event.preventDefault();
        if(this.state.loginMode) {
            const loginStatus = await login(this.state.email, this.state.password);
            if(loginStatus.user) {
                authContextLogin(loginStatus.user.username);
                this.setState({loginCompleted:true});
            } else {
                this.setState({loginFailureMessage:loginStatus.message});
            }
        } else {
            const signupStatus = await signup(this.state.email, this.state.password);
            if(signupStatus.user) {
                this.setState(
                    {signupCompleted: true, loginMode: true}
                );
            } else {
                this.setState({loginFailureMessage:signupStatus.message})
            }
        }
    }

    recordEmail= (event) => {
        this.setState({
            email: event.target.value,
            emailValid: event.target.checkValidity()
        });
    }

    recordPassword= (event) => {
        this.setState({
            password: event.target.value,
            passwordValid: event.target.checkValidity()
        });
    }

    getDisplayClass = (tab) => {
        if(this.state.loginMode) {
            if(tab==='Login') {return "highlightTab";}
            else { return "normalTab";}
        } else {
            if(tab==='Login') {return "normalTab";}
            else { return "highlightTab";}
        }
    }

    toggleLoginAndCreation = (event) => {
        this.setState({
            loginMode : !this.state.loginMode,
            loginFailureMessage: ""
        });
    }
}

export default Login;
