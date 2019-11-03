import React from 'react';
import './App.css';
import { Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';
import Search from './containers/Search';
import WrappedNormalLoginForm from './components/Login';
import WrappedRegistrationForm from './components/Signup';

function App(props) {
      return (
            <BrowserRouter history={props.history}>
            
            <div className="App">
            
                   
                  <Switch>
                        <Redirect exact from='/' to= '/login' /> 
                        <Route path='/login' exact component = {WrappedNormalLoginForm} />
                        <Route path='/signup' exact component = {WrappedRegistrationForm} />
                        <Route path='/search' exact component = {Search} />

                       
                        
                  </Switch>
     
    
        
    
            </div>
                  
            </BrowserRouter> 
    );
}


  
export default App;
