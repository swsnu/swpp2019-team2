import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './LogIn.css';
import { connect } from 'react-redux';

import * as actionCreators from '../store/actions/index';
import logo from '../image/LOGO.png';


class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      id: '',
      name: '',
    };
  }


  componentDidMount() {
    this.props.onGETUSERS();
    this.props.ongetUser();
  }

  LoginHandler = () => {
    if (this.state.email === 'swpp@snu.ac.kr' && this.state.password === 'iluvswpp') {
      this.setState({ id: 1, name: 'Software Lover' });
      this.props.UserLogIn(
        this.state.id,
        this.state.password,
        this.state.email,
        this.state.name,
        true,
      );
      this.props.onGETUSERS();
      this.props.ongetUser();
    } else {
      alert('Email or password is wrong');
    }
  }

  render() {
    let redirect = null;
    if (this.props.selectedUser) {
      if (this.props.selectedUser.logged_in) {
        redirect = <Redirect to="/main" />;
      }
    } else {
      redirect = <Redirect to="/login" />;
    }
    return (
      <div className="LogIn">
        {redirect}
        <div className="logo">
          <img id="logo" src={logo} alt="COSMOS" width="100" />
        </div>
        <div className="LogInBox">
          <h1>Log In</h1>
          <label htmlFor="email-input">
            E-mail
            <input
              type="text"
              id="email-input"
              value={this.state.email}
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </label>
          <label htmlFor="pw-input">
            Password
            <input
              type="text"
              id="pw-input"
              value={this.state.password}
              onChange={(event) => this.setState({ password: event.target.value })}
            />
          </label>
          <button id="login-button" type="button" onClick={() => this.LoginHandler()}>Log-in</button>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  selectedUser: state.cosmos.selectedUser,
  Users: state.cosmos.Users,
});


const mapDispatchToProps = (dispatch) => ({
  onGETUSERS: () => dispatch(actionCreators.getUsers()),
  UserLogIn: (id, password, email, name, loggedIn) => dispatch(actionCreators.putUser({
    id,
    email,
    password,
    name,
    logged_in: loggedIn,
  })),
  ongetUser: () => dispatch(actionCreators.getUser()),
});


export default connect(mapStatetoProps, mapDispatchToProps)(LogIn);
