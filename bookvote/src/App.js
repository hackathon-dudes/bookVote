import React, { Component } from 'react';
import './App.css';
import './index.css';
import HomeNavBar from './components/homeNavBar/homeNavBar';
import { withRouter, Switch, Route } from 'react-router-dom'; 
import SignUp from './components/users/signup';
import SignIn from './components/users/signin';
import PageDisplay from './components/homepageDisplay/homepageDisplay';
import AddBook from './components/books/AddBook';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeNavBar />
        <Switch>
          <Route path="/" component={PageDisplay} exact />
          <Route path="/Add-A-Book" component={AddBook} exact />
          <Route path="/SignUp" component={SignUp} exact />
          <Route path="/SignIn" component={SignIn} exact />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
