import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';
import BigCalendar from './BigCalendar';
import './SalesInfo.css';
import arrow from "../image/화살표.png";

class SalesInfo extends Component {
  state = {
    id: ""
  };
  componentDidMount() {
    this.props.onGETUSERS();
    this.props.onGETUSER();
    if (this.props.selectedUser) {
      this.setState({ id: this.props.selectedUser.id });
    }
  }
  menuHandler = () => {
    this.props.history.replace('../main')
  }
  logoutHandler = () => {
    if(this.props.selectedUser){
        let id = this.props.selectedUser.id;
        let password = this.props.selectedUser.password;
        let email = this.props.selectedUser.email;
        let name = this.props.selectedUser.name;
        this.props.UserLogOut(id,password , email, name, false);
        this.props.onGETUSER();
        this.props.onGETUSERS();
        if(this.props.selectedUser){
            if(!this.props.selectedUser.logged_in){
                this.props.history.push('/login');
            }
        }
    }
  }

  mypageHandler = (id) => {
    this.props.history.replace('../mypage/' + id)
  }

  render() {
    let redirect = null;
    if(this.props.selectedUser){
      if((!this.props.selectedUser.logged_in)){
        redirect = <Redirect to = '/login' />
      }
    }
    return (
      <div className="SalesInfo">
        {redirect}
        <div className = "upperbar">
          <h1> Sales Information </h1>
          <div className = "buttons">
            <img src = {arrow} alt = "Back to Main" id = "back-to-menu-button" onClick = {()=> this.menuHandler()}/>
            <button id = "log-out-button" onClick = {()=>this.logoutHandler()}>Log-Out</button>
            <button id= "my-page-button" onClick = {()=>this.mypageHandler(this.state.id)}>My Page</button>
          </div>
        </div>
        <div className = "Calendar">
          <BigCalendar />
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    Users: state.cosmos.Users,
    selectedUser: state.cosmos.selectedUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGETUSERS: () => dispatch(actionCreators.getUsers()),
    onGETUSER: () => dispatch(actionCreators.getUser()),
    UserLogOut: (id, password, email, name, logged_in) =>
      dispatch(
        actionCreators.putUser({
          id: id,
          email: email,
          password: password,
          name: name,
          logged_in: logged_in
        })
      )
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(SalesInfo);