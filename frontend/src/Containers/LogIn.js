import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './LogIn.css';
import {connect} from 'react-redux';
import {Form} from 'antd';

import * as actionCreators from '../store/actions/index';





class NormalLoginForm extends Component {
      state = {
        signin : false,
      }
    
      componentDidMount() {
        this.props.onTryAutoSignup();
      }
    
    
    
    
      LoginHandler = e => {
        
    
            
            this.props.Login(this.state.username,this.state.password);
            this.props.onTryAutoSignup();
            this.setState({signin : true});
            
    
          }
    
          
        
      
    
      signupHandler = () => {
        this.props.history.replace('../signup')
      }
    
      render() {
    
        let change_page = '';
        if(this.props.error !=null && this.state.signin) {
          var aler = alert("아이디(비밀번호)가 틀렸거나 존재하지 않는 계정입니다.")
          this.setState({signin : false});
        }
    
        if(this.props.isAuthenticated) {
            change_page = <Redirect to='/main' />
        }
        else change_page = <Redirect to='/login' />
      
    
        return (
          <div>
            {aler}
            {change_page}
            <div className = "Signin">
              <h2>Log In</h2>
              <label> Username </label>
              <input type="text" 
                id="username-input" 
                value={this.state.email} 
                onChange = {(event) => this.setState({username: event.target.value})} />
                
              <label>Password</label>
              <input type="text" 
                id="pw-input"  
                value = {this.state.password}
                onChange = {(event) => this.setState({ password: event.target.value})} />
        
              <button id="login-button" onClick={() => this.LoginHandler()}>Log-in</button>
              <button id="sign-up-button" onClick = {()=> this.signupHandler()}>Sign Up</button>
            </div>
            
          </div>
    
        );
      }
    }
    
    const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
    
    const mapStateToProps = (state) => { 
        return {    
            isAuthenticated: state.cosmos.token != null,
            loading: state.cosmos.loading,
            error: state.cosmos.error
     
       }
    
     }
     
     const mapDispatchToProps = dispatch => {  
        return {    
            
            Login: (username, password) => dispatch(actionCreators.authLogin(username,password)),
            onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
            
       }
     } 
    
    export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm);