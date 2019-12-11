import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { css } from '@emotion/core';
import { BeatLoader } from 'react-spinners';
import * as actionCreators from '../store/actions/index';
import './SkinToneLoading.css';

class SkinToneLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    setTimeout(this.props.run_analysis(localStorage.getItem('nickname')), 4000);
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
      <div className="SkinToneLoading">
        {redirect}
        <div className="LoadingBox">
          <h3>Calculating...</h3>
          <div className="Loader">
            <BeatLoader
              css={override}
              sizeUnit="px"
              size={30}
              color="#BD10E0"
              loading={this.state.loading}
            />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.cosmos.token != null,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  run_analysis: (id) => dispatch(actionCreators.runAnalysis({ userID: id })),
});
export default connect(mapStateToProps, mapDispatchToProps)(SkinToneLoading);
