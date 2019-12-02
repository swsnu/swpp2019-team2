import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';
import * as actionCreators from '../store/actions/index';
import './LoginLoading.css';

class LoginLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getUserInfo();
    setTimeout(this.props.LoginLoading(), 4000);
  }


  render() {
    const override = css`
            display: block;
            margin: 100 auto;
            border-color: red;
        `;
    let redirect = null;
    if (!this.props.isAuthenticated) {
      redirect = <Redirect to="/login" />;
    }
    return (
      <div className="LoginLoading">
        {redirect}
        <div className="LoadingBox">
          <h3>로그인 중입니다...</h3>
          <div className="Loader">
            <BeatLoader
              css={override}
              sizeUnit="px"
              size={30}
              color="#BD10E0"
              loading={this.state.loading}
            />
          </div>
          <h4>&quot;하늘 아래 같은 색조 없다.&quot;  -- COSMOS</h4>
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
  LoginLoading: () => dispatch(actionCreators.getLogin()),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginLoading);
