import React, { Component } from 'react';
import { AuthConsumer } from '../context/AuthContext';
import {logout} from './LoginHandler';
import {NavDropdown, MenuItem, Nav, Modal, Button} from 'react-bootstrap';
import Constants from '../utilities/Constants';
import {Redirect} from 'react-router-dom'

class UserMenu extends Component {
    state = {
        showLogoutPopout: false,
        goToPasswordChange: false
    }
    render() {
        return (
            <span>
                {this.state.goToPasswordChange && 
                    <Redirect to='/passwordChange' />
                }
                <AuthConsumer>
                {({ isAuth, username, logout }) => (
                    <span>
                        {isAuth && 
                                <Nav pullRight>
                                    <NavDropdown eventKey={'usermenu'} title={username} id="basic-nav-dropdown" onSelect={(k, event) => this.handleSelect(k, event)}>
                                        <MenuItem eventKey={Constants.userMenuLogout}>Logout</MenuItem>
                                        <MenuItem divider />
                                        <MenuItem eventKey={Constants.userMenuChangePassword}>Change Password</MenuItem>
                                    </NavDropdown>
                                </Nav>
                        }
                        <Modal show={this.state.showLogoutPopout} onHide={this.closeLogoutPopout}>
                            <Modal.Header closeButton>
                                <Modal.Title>Logout</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {isAuth &&
                                <p>Proceed to logout?</p>}
                                {!isAuth &&
                                <p>Logout Successful</p>}
                                <Button onClick={this.closeLogoutPopout}>Close</Button>
                                <span className="logoutButtonsSpacer"></span>
                                {isAuth && 
                                    <Button bsStyle="danger" onClick={() => {this.performLogout(logout)}}>Logout</Button>
                                }
                            </Modal.Body>
                        </Modal>
                    </span>
                )}
            </AuthConsumer>
        </span>
        );
    }

    handleSelect = (selectionKey, event) => {
        event.preventDefault();
        switch(selectionKey) {
            case Constants.userMenuLogout:
                this.setState({showLogoutPopout:true});
                break;
            case Constants.userMenuChangePassword:
                this.setState({goToPasswordChange: true}); 
                break;
            default:
                break;
        }
    }

    performLogout = async (contextLogout) => {
        await logout();
        contextLogout();
    }

    closeLogoutPopout = () => {
        this.setState({showLogoutPopout:false});
    }
}

export default UserMenu;
