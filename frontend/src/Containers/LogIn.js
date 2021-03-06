/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './LogIn.css';
import { connect } from 'react-redux';
import { Form } from 'antd';
import * as actionCreators from '../store/actions/index';
import logo from '../image/LOGO.png';
import LoginForm from '../Components/LoginForm';

class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
    };
  }

  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
    if (localStorage.getItem('storeuser')) {
      this.setState({ username: localStorage.getItem('username') });
      this.setState({ password: localStorage.getItem('password') });
    }
  }

      LoginHandler = (e) => {
        if (this.state.check === true) {
          localStorage.setItem('storeuser', 'Yes');
        } else {
          localStorage.removeItem('storeuser');
        }
        this.props.Login(this.state.username, this.state.password);
        localStorage.setItem('username', this.state.username);
        localStorage.setItem('password', this.state.password);
        localStorage.setItem('nickname', this.state.username);
        this.setState({ signin: true });
      }


      signupHandler = () => {
        this.props.history.replace('../signup');
      }

      mainHandler = () => {
        this.props.history.replace('../search');
      }

      verifiedChange = () => {
        if (this.state.check) {
          this.setState({ check: false });
        } else {
          this.setState({ check: true });
        }
      }

      render() {
        let changePage = '';
        let aler = null;
        const { error, isAuthenticated } = this.props;
        const {
          check, username, password, signin,
        } = this.state;
        if (error != null && signin) {
          aler = alert('아이디(비밀번호)가 틀렸거나 존재하지 않는 계정입니다.');
          this.setState({ signin: false });
        }

        if (isAuthenticated) {
          changePage = <Redirect to="/search" />;
        }

        return (
          <div className="Login">
            <LoginForm
              clickedSign={() => this.signupHandler()}
              clickedSignin={() => this.LoginHandler()}
              clickedMain={() => this.mainHandler()}
              usernameChange={(event) => this.setState({ username: event.target.value })}
              passwordChange={(event) => this.setState({ password: event.target.value })}
              verifiedChange={() => this.verifiedChange()}
              check={check}
              username={username}
              password={password}
            />
            {aler}
            {changePage}
          </div>
        );
      }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => ({
  isAuthenticated: state.cosmos.token != null,
  error: state.cosmos.error,
});

const mapDispatchToProps = (dispatch) => ({
  Login: (username, password) => dispatch(actionCreators.authLogin(username, password)),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);
