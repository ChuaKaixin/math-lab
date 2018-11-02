import React, { Component } from 'react';
import './App.css';
import PageRouter from './components/utilities/PageRouter';
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';

class App extends Component {
  render() {
    return (
      <AuthProvider>
          <Router>
            <PageRouter />
          </Router>
      </AuthProvider>
  );
  }

}

export default App;
