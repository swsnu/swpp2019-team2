import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import arrow from '../image/화살표.png';

class SkinToneLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      selectedFile: null,
      fileurl: '',
      flag: false,
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    setTimeout(this.props.run_analysis('425'), 4000);
    /* setTimeout(this.props.run_analysis('1125'), 2000); */
    /* setTimeout(this.props.history.replace('../skintone/result'), 2000); */
    /* if (this.props.selectedUser) {
        this.setState({ id: this.props.selectedUser.id });
      } */
  }

    loading = () => {
      this.props.run_analysis('1125');
      setTimeout(this.props.history.replace('../skintone/result'), 2000);
    }

      logoutHandler = () => {
        this.props.Logout();
        this.props.onTryAutoSignup();
      }

      mypageHandler = (id) => {
        this.props.history.replace(`../mypage/${id}`);
      }

      menuHandler = () => {
        this.props.history.replace('../main');
      }

      render() {
        let redirect = null;
        if (!this.props.isAuthenticated) {
          redirect = <Redirect to="/login" />;
        }
        const id = this.state;
        return (
          <div className="SkinToneLoading">
            {redirect}
            {/* <div id = "LOGO">
                      <img src = {logo} alt = "COSMOS" width = "100" />
                  </div> */}
            <div className="upperbar">
              <h1>Skin Tone Analysis Loading</h1>
              <div className="buttons">
                <button id="back-button" type="button" onClick={() => this.menuHandler()}>
                  <img id="arrow" src={arrow} alt="Back to Main Menu" />
                </button>
                <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
                <button id="my-page-button" type="button" onClick={() => this.mypageHandler(id)}>My Page</button>
              </div>
            </div>
            <div className="loading">
              <h1>Loading</h1>
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
