import React from 'react';
import './App.css';
import WrappedNormalLoginForm from './Containers/LogIn';
import Search from './Containers/Search';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import WrappedRegistrationForm from './Containers/Signup';


function App(props) {
  return (
    <BrowserRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={WrappedNormalLoginForm} />
          <Route path="/signup" exact component = {WrappedRegistrationForm} />
          <Route path = "/search" exact component = {Search} />
          <Redirect path="*" to="/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
