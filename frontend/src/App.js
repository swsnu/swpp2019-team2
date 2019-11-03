import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './Containers/MainPage';
import LogIn from './Containers/LogIn';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import BudgetSearch from './Containers/BudgetSearch';
import SkinTone from './Containers/SkinTone';
import SalesInfo from './Containers/SalesInfo';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={LogIn} />
          {/* <Route path = '/signup' exact component = {} />
          <Route path = '/mypage' exact component = {} /> */}
          <Route path="/main" exact component={MainPage} />
          {/* <Route path = '/search' exact component = {Search} /> */}
          <Route path="/budget" exact component={BudgetSearch} />
          <Route path="/skintone" exact component={SkinTone} />
          {/* <Route path = '/skintone/result' exact component = {} /> */}
          <Route path="/sale" exact component={SalesInfo} />
          <Redirect path="*" to="/login" />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
