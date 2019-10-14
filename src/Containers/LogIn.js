import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './LogIn.css';
import {connect} from 'react-redux';

import * as actionCreators from '../store/actions/index';

class LogIn extends Component {
    componentDidMount(){
        this.props.onGETUSERS();
        this.props.ongetUser();
    }
    state = {
        email: '',
        password: '',
        id:'',
        name:'',
        submitted : false,
        first : true
    }
    
    render() {
        let redirect = null;
        if(this.props.selectedUser){
            if(this.props.selectedUser.logged_in){
                redirect = <Redirect to ='/main' />
            }
        }
        else{
            redirect = <Redirect to ='/login' />
        }
        return (
          < div className = 'LogIn'>
              {redirect}
            <h1>Log In</h1>
            <label> E-mail</label>
            <input type="text" 
            id="email-input" 
            value={this.state.email} 
            onChange = {(event) => this.setState({email: event.target.value})} />
            
            <label>Password</label>
            <input type="text" 
            id="pw-input"  
            value = {this.state.password}
            onChange = {(event) => this.setState({ password: event.target.value})} />
    
            <button id="login-button" onClick={() => this.postTodoHandler()}>Log-in</button>
          </div>
        );
    }
    postTodoHandler = () => {
        if(this.state.email === "swpp@snu.ac.kr" && this.state.password === "iluvswpp"){
            this.setState({submitted:true, id:1, name:'Software Lover'})
            this.props.UserLogIn(this.state.id, this.state.password, this.state.email, this.state.name, true);
            this.props.onGETUSERS();
            this.props.ongetUser();
        }
        else{
            alert("Email or password is wrong");
        }
    }
}

const mapStatetoProps = state => {
    return {
        selectedUser : state.td.selectedUser,
        Users : state.td.Users,
    };
  };


const mapDispatchToProps = dispatch => {
    return {
        onGETUSERS : () => dispatch(actionCreators.getUsers()),
        UserLogIn: (id,password , email, name, logged_in) =>
             dispatch(actionCreators.putUser({id :id,
                email : email,
                password : password,
                name : name,
                logged_in : logged_in,})),
        ongetUser: () => dispatch(actionCreators.getUser()),
    }
  };

  

export default connect(mapStatetoProps, mapDispatchToProps)(LogIn);
