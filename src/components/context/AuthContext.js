import React from 'react';
const AuthContext = React.createContext();

class AuthProvider extends React.Component {
    state = { 
      isAuth: false,
      username: ''
    }
    render() {
      return (
        <AuthContext.Provider
          value={{ 
            isAuth: this.state.isAuth,
            username: this.state.username,
            login: this.login,
            logout: this.logout
          }}
        >
          {this.props.children}
        </AuthContext.Provider>
      )
    }
    login = (username) => {
      this.setState(
        {
          isAuth:true,
          username
        });
    }
    logout = () => {
      this.setState({
        isAuth:false,
        username: ''
      });
    }
  }

const AuthConsumer = AuthContext.Consumer
export { AuthProvider, AuthConsumer }