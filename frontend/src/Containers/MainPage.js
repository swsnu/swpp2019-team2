import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './MainPage.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import logo from '../image/LOGO.png';

class MainPage extends Component {
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

  logoutHandler = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
  };

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

  mypageHandler = (id) => {
    this.props.history.replace(`../mypage/${id}`);
  };

  render() {
    let redirect = null;
    let infoString = 'Hello';
    if (this.props.user !== undefined) {
      const { username } = this.props.user[0];
      infoString = `Hello, ${username}!`;
    }
    if (!this.props.isAuthenticated) {
      redirect = <Redirect to="/login" />;
    }
    return (
      <div className="MainPage">
        {redirect}
        <div className="main_upperbar">
          <img id="logo" src={logo} alt="COSMOS" width="100" />
          {infoString}
          <div className="buttons">
            <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
          </div>
        </div>
        <div className="Menu">
          <h1>Menu</h1>
          <div className="buttons">
            <ul>
              <button id="search-tag" type="button" onClick={() => this.searchHandler()}>
                Search Tag
              </button>
            </ul>
            <ul>
              <button id="budget-search" type="button" onClick={() => this.budgetHandler()}>
                Budget Search
              </button>
            </ul>
            <ul>
              <button id="tone-analysis" type="button" onClick={() => this.toneHandler()}>
                Tone Analysis
              </button>
            </ul>
            <ul>
              <button id="sale-information" type="button" onClick={() => this.saleHandler()}>
                Sale Information
              </button>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.cosmos.token != null,
  user: state.cosmos.User,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
