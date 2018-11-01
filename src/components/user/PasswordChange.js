import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import {changePassword} from './LoginHandler';
import { AuthConsumer } from '../context/AuthContext';
import {Redirect} from 'react-router-dom'

class PasswordChange extends Component {
    state = {
        password: "",
        repeatPassword: "",
        passwordValid: false,
        passwordConfirmed: false,
        passwordChangeSuccessful: false
    }
    render() {
        let {password, repeatPassword} = this.state;
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
                                <div className="passwordMenu">
                                    <div className="highlightTab"><h4>Change Password</h4></div>
                                </div>
                                {!this.state.loginFailureMessage && 
                                    <p className="spacerWords">.</p>
                                }
                                {this.state.passwordChangeSuccessful && 
                                    <p className="registerSuccessWords">Password changed successfully.</p>
                                }
                                <form className="loginInputFields">
                                    <div>
                                        <input onChange={this.recordPassword} value={password} required pattern=".{8,}" className="loginInput" type="password" placeholder="password min. length 8" title="Password must be at least 8 chars"/>
                                    </div>
                                     <div>
                                        <input onChange={this.recordRepeatPassword} value={repeatPassword} required pattern=".{8,}" className="loginInput" type="password" placeholder="retype password to confirm" title="Password must be at least 8 chars"/>
                                    </div>
                                    <Button type="submit" disabled={!this.state.passwordConfirmed} onClick={(event) => {this.submitPasswordChange(event)}} className="loginButton" bsSize="large"><h4>Submit</h4></Button>
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

    submitPasswordChange = async(event) => {
        event.preventDefault();
        const pwdStatus = await changePassword(this.state.password);
        const success = pwdStatus.status === 'done';
        this.setState({
            passwordChangeSuccessful: success,
            password: '',
            repeatPassword: ''});
    }

    

    recordPassword= (event) => {
        const passwordConfirmed = event.target.checkValidity() && this.state.repeatPassword === event.target.value;
        this.setState({
            password: event.target.value,
            passwordValid: event.target.checkValidity(),
            passwordConfirmed: passwordConfirmed
        });
    }

    recordRepeatPassword= (event) => {
        const passwordConfirmed =  event.target.value === this.state.password && this.state.passwordValid;
        this.setState({
            repeatPassword: event.target.value,
            passwordConfirmed: passwordConfirmed
        });
    }

}

export default PasswordChange;
