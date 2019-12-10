import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import BigCalendar from './BigCalendar';
import './SalesInfo.css';
import Header from '../Components/Header';

class SalesInfo extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getUserInfo();
  }

  render() {
    let redirect = null;
    if (!localStorage.getItem('token')) {
      window.alert('로그인을 먼저 진행해주세요');
      redirect = <Redirect to="/login" />;
    }

    const { history } = this.props;

    return (
      <div className="SalesInfo">
        {redirect}
        <Header history={history} selected={3} />
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
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SalesInfo);
