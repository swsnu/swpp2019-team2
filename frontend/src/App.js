import React from 'react';
import './App.css';
<<<<<<< HEAD
import WrappedNormalLoginForm from './Containers/LogIn';
import Search from './Containers/Search';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import WrappedRegistrationForm from './Containers/Signup';
=======
import {
  Redirect, Switch, Route, Router, BrowserRouter,
} from 'react-router-dom';
import Search from './containers/Search';
import WrappedNormalLoginForm from './components/Login';
import WrappedRegistrationForm from './components/Signup';
>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee


function App(props) {
  return (
    <BrowserRouter history={props.history}>
<<<<<<< HEAD
=======

>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee
      <div className="App">


        <Switch>
<<<<<<< HEAD
          <Route path="/login" exact component={WrappedNormalLoginForm} />
          <Route path="/signup" exact component = {WrappedRegistrationForm} />
          <Route path = "/search" exact component = {Search} />
          <Redirect path="*" to="/login" />
=======
          <Redirect exact from="/" to="/login" />
          <Route path="/login" exact component={WrappedNormalLoginForm} />
          <Route path="/signup" exact component={WrappedRegistrationForm} />
          <Route path="/search" exact component={Search} />


>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee
        </Switch>


      </div>
<<<<<<< HEAD
    </BrowserRouter>
  );
}
=======

    </BrowserRouter>
  );
}


>>>>>>> ce5f934287255c8528127115e05d59f5a760cbee
export default App;
