import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import BigCalendar from './BigCalendar';
import './SalesInfo.css';

class SalesInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      call: false,
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getUserInfo();
  }

  logoutHandler = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
    localStorage.removeItem('nickname');
  }

  mypageHandler = () => {
    this.props.history.replace('../mypage');
  }

  searchHandler = () => {
    this.props.history.replace('../search');
  };

  budgetHandler = () => {
    this.props.history.replace('../budget');
  };

  toneHandler = () => {
    this.props.history.replace('../skintone');
  };

  saleHandler = () => {
    this.props.history.replace('../sale');
  };

  render() {
    let redirect = null;
    let infoString = '';
    if (this.state.call === false) {
      this.props.user.map((res) => (
        this.setState({ nickName: res.nick_name })
      ));
      this.setState({ call: true });
    }
    infoString = `Hello, ${localStorage.getItem('nickname')}!`;
    if (!localStorage.getItem('token')) {
      window.alert('로그인을 먼저 진행해주세요');
      redirect = <Redirect to="/login" />;
    }
    return (
      <div className="SalesInfo">
        {redirect}
        <div className="upperbar">
          <h1> Sales Information </h1>
          <div className="buttons">
            <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler()}>My Page</button>
          </div>
          {infoString}
        </div>
        <div className="Menubar">
          <div><button id="Searchmenu" type="button" onClick={() => this.searchHandler()}>Search-Tag</button></div>
          <div><button id="Budgetmenu" type="button" onClick={() => this.budgetHandler()}>Budget-Search</button></div>
          <div><button id="Tonemenu" type="button" onClick={() => this.toneHandler()}>Tone-Analysis</button></div>
          <div><button id="Salemenu" type="button" onClick={() => this.saleHandler()}>Sale-Info</button></div>
        </div>
        <div className="Content">
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
