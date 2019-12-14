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
    const { history } = this.props;

    return (
      <div className="SalesInfo">
        <Header history={history} selected={3} />
        <div className="Content">
          <BigCalendar />
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});


export default connect(
  null,
  mapDispatchToProps,
)(SalesInfo);
