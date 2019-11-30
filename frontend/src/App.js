import React from 'react';
import './App.css';
import {
  Route, Redirect, Switch,
} from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import MainPage from './Containers/MainPage';
import LogIn from './Containers/LogIn';
import BudgetSearch from './Containers/BudgetSearch';
import SkinTone from './Containers/SkinTone';
import SalesInfo from './Containers/SalesInfo';
import Search from './Containers/Search';
import Signup from './Containers/Signup';
import MyPage from './Containers/MyPage';
import SkinToneResult from './Containers/SkinToneResult';
import SkinToneLoading from './Containers/SkinToneLoading';

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={Signup} />
          <Route path = '/mypage' exact component = {MyPage} />
          <Route path="/main" exact component={MainPage} />
          <Route path="/search" exact component={Search} />
          <Route path="/budget" exact component={BudgetSearch} />
          <Route path="/skintone/loading" exact component={SkinToneLoading} />
          <Route path="/skintone/result" exact component={SkinToneResult} />
          <Route path="/skintone" exact component={SkinTone} />
          <Route path="/sale" exact component={SalesInfo} />
          <Redirect path="*" to="/login" />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}
export default App;
