/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './LogIn.css';
import { connect } from 'react-redux';
import { Form } from 'antd';
import * as actionCreators from '../store/actions/index';
import logo from '../image/LOGO.png';

class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sigin: false,
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }


      LoginHandler = (e) => {
        this.props.Login(this.state.username, this.state.password);
        this.props.onTryAutoSignup();
        this.props.getUserInfo();
        this.setState({ signin: true });
      }


      signupHandler = () => {
        this.props.history.replace('../signup');
      }

      render() {
        let changePage = '';
        let aler = null;
        if (this.props.error != null && this.state.signin) {
          aler = alert('아이디(비밀번호)가 틀렸거나 존재하지 않는 계정입니다.');
          this.setState({ signin: false });
        }

        if (this.props.isAuthenticated) {
          changePage = <Redirect to="/search" />;
        } else changePage = <Redirect to="/login" />;

        return (
          <div className="Login">
            {aler}
            {changePage}
            <div className="logo">
              <img id="logo" src={logo} alt="COSMOS" width="100" />
            </div>
            <div className="LogInBox">
              <h2>Log In</h2>
              <label htmlFor="username-input">
                 Username
                <input
                  type="text"
                  id="username-input"
                  value={this.state.email}
                  onChange={(event) => this.setState({ username: event.target.value })}
                />
              </label>

              <label htmlFor="pw-input">
                Password
                <input
                  type="password"
                  id="pw-input"
                  value={this.state.password}
                  onChange={(event) => this.setState({ password: event.target.value })}
                />
              </label>

              <button type="button" id="login-button" onClick={() => this.LoginHandler()}>Log-in</button>
              <button type="button" id="sign-up-button" onClick={() => this.signupHandler()}>Sign Up</button>
            </div>
          </div>
        );
      }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => ({
  isAuthenticated: state.cosmos.token != null,
  loading: state.cosmos.loading,
  error: state.cosmos.error,

});

const mapDispatchToProps = (dispatch) => ({

  Login: (username, password) => dispatch(actionCreators.authLogin(username, password)),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
