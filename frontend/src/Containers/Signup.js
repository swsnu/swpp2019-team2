import React from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../store/actions/index';
import './Signup.css';
import logo from '../image/LOGO.png';


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  LoginHandler = () => {
    this.props.Signup(this.state.username, this.state.email, this.state.password);
    this.props.onTryAutoSignup();
    this.setState({ signup: true });
  }


  signinHandler = () => {
    this.props.history.replace('../login');
  }

  render() {
    let changePage = '';
    let aler = null;
    if (this.props.error && this.state.signup) {
      aler = alert('이미 존재하는 아이디(이메일)이거나 양식이 잘못되었습니다.');
      this.setState({ signup: false });
    }

    if (this.props.isAuthenticated) {
      changePage = <Redirect to="/main" />;
    } else changePage = <Redirect to="/signup" />;


    return (
      <div className="Signup">
        {aler}
        {changePage}
        <div className="logo">
          <img id="logo" src={logo} alt="COSMOS" width="100" />
        </div>
        <div className="SignupBox">
          <h2>Sign Up</h2>
          <label htmlFor="username-input">
            Username
            <input
              type="text"
              id="username-input"
              value={this.state.username}
              onChange={(event) => this.setState({ username: event.target.value })}
            />
          </label>
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
          <button type="button" id="login-button" onClick={() => this.LoginHandler()}>Log-in</button>
          <button type="button" id="sign-up-button" onClick={() => this.signinHandler()}>Sign In</button>
        </div>
      </div>
    );
  }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => ({
  isAuthenticated: state.cosmos.token != null,
  loading: state.cosmos.loading,
  error: state.cosmos.error,

});

const mapDispatchToProps = (dispatch) => ({

  Signup:
  (username, email, password) => dispatch(actionCreators.authSignup(username, email, password)),
  Login: (username, password) => dispatch(actionCreators.authLogin(username, password)),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
});


export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
