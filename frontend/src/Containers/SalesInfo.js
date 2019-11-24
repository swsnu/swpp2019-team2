import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import BigCalendar from './BigCalendar';
import './SalesInfo.css';
import arrow from '../image/화살표.png';

class SalesInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getUserInfo();
  }

  menuHandler = () => {
    this.props.history.replace('../main');
  }

  logoutHandler = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
  }

  mypageHandler = (id) => {
    this.props.history.replace(`../mypage/${id}`);
  }

  render() {
    let redirect = null;
    const userInfo = this.props.user.map((res) => {
      this.state.username = res.username;
    });
    let infoString = 'Hello, ' + this.state.username + '!';
    if (!this.props.isAuthenticated) {
      redirect = <Redirect to="/login" />;
    }
    return (
      <div className="SalesInfo">
        {redirect}
        <div className="upperbar">
          <h1> Sales Information </h1>
          {infoString}
          <div className="buttons">
            <button id="back-button" type="button" onClick={() => this.menuHandler()}>
              <img id="arrow" src={arrow} alt="Back to Main Menu" />
            </button>
            <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
          </div>
        </div>
        <div className="Calendar">
          <BigCalendar />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.cosmos.token != null,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
  user: state.cosmos.User,
});

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SalesInfo);
