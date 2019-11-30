import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import BigCalendar from './BigCalendar';
import './SalesInfo.css';
// import arrow from '../image/화살표.png';

class SalesInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      render: false,
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
    if (this.state.render === false) {
      this.props.user.map((res) => ((
        this.setState({ nickName: res.nick_name }),
        this.setState({ preferColor: res.prefer_color }),
        this.setState({ preferBase: res.prefer_base }),
        this.setState({ preferBrand: res.prefer_brand })
      )));
      this.setState({ render: true });
    }
    infoString = `${this.state.nick_name} 님! 오늘도 좋은 하루 되세요~`;
    if (!this.props.isAuthenticated) {
      redirect = <Redirect to="/login" />;
    }
    return (
      <div className="SalesInfo">
        {redirect}
        <div className="upperbar">
          <h1> Sales Information </h1>
          {infoString}
          <div className="Menubar">
            <button id="Searchmenu" type="button" onClick={() => this.searchHandler()}>Search-Tag</button>
            <button id="Budgetmenu" type="button" onClick={() => this.budgetHandler()}>Budget-Search</button>
            <button id="Tonemenu" type="button" onClick={() => this.toneHandler()}>Tone-Analysis</button>
            <button id="Salemenu" type="button" onClick={() => this.saleHandler()}>Sale-Info</button>
          </div>
          <div className="buttons">
            {/* <button id="back-button" type="button" onClick={() => this.menuHandler()}>
              <img id="arrow" src={arrow} alt="Back to Main Menu" />
            </button> */}
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
