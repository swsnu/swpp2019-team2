import React from 'react';
import { Form } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreators from '../store/actions/index';
import './Signup.css';
import SignupForm from '../Components/SignupForm';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
    };
  }

  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }

  LoginHandler = () => {
    if (this.state.email && this.state.username && this.state.password && this.state.confirm) {
      const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      if (!this.state.email.match(regExp)) {
        window.alert('이메일 형식이 올바르지 않습니다');
      } else if (this.state.password !== this.state.confirm) {
        window.alert('패스워드가 일치하지 않습니다');
      } else {
        this.props.Signup(this.state.username, this.state.email, this.state.password);
        this.props.onTryAutoSignup();
        localStorage.setItem('username', this.state.username);
        localStorage.setItem('password', this.state.password);
        localStorage.setItem('nickname', this.state.username);
        this.setState({ signup: true });
        window.alert('회원가입이 완료되었습니다.');
      }
    } else {
      window.alert('필수 항목을 모두 입력해주세요');
    }
  }

  mainHandler = () => {
    this.props.history.replace('../search');
  }

  signinHandler = () => {
    this.props.history.replace('../login');
  }

  render() {
    let changePage = '';
    let aler = null;
    const { error, isAuthenticated } = this.props;
    const {
      signup, username, email, password, confirm,
    } = this.state;
    if (error && signup) {
      aler = alert('이미 존재하는 아이디(이메일)이거나 양식이 잘못되었습니다.');
      this.setState({ signup: false });
    }

    if (isAuthenticated) {
      changePage = <Redirect to="/search" />;
    }


    return (
      <div className="Signup">
        <SignupForm
          clickedSignup={() => this.LoginHandler()}
          clickedSignin={() => this.signinHandler()}
          clickedBack={() => this.mainHandler()}
          usernameChange={(event) => this.setState({ username: event.target.value })}
          emailChange={(event) => this.setState({ email: event.target.value })}
          passwordChange={(event) => this.setState({ password: event.target.value })}
          confirmChange={(event) => this.setState({ confirm: event.target.value })}
          username={username}
          email={email}
          password={password}
          confirm={confirm}
        />
        {aler}
        {changePage}
      </div>
    );
  }
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => ({
  isAuthenticated: state.cosmos.token != null,
  error: state.cosmos.error,
});

const mapDispatchToProps = (dispatch) => ({

  Signup: (username, email, password) => dispatch(actionCreators.authSignup(username,
    email, password)),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);
