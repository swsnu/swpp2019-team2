import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SkinToneResult.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import arrow from '../image/화살표.png';

class SkinToneResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.setState({ result: `rgb(${this.props.ML.result_r},${this.props.ML.result_g},${this.props.ML.result_b})` });
    /* if (this.props.selectedUser) {
        this.setState({ id: this.props.selectedUser.id });
      } */
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
        const productUrl = '';
        const FoundationResult = (
          <a target="_blank" rel="noopener noreferrer" className="productItem" href={productUrl}>
            <section className="thumbnail">
              <img height="200" width="200" src={this.props.ML.product.img_url} alt="new" />
            </section>
            <section className="name_info_text">
              {this.props.ML.base}
              {' / '}
              {this.props.ML.product.brand}
            </section>
            <section className="price_info_text">
가격:&emsp;
              {this.props.ML.product.price}
원
            </section>
          </a>
        );
        let redirect = null;
        if (!this.props.isAuthenticated) {
          redirect = <Redirect to="/login" />;
        }
        const id = this.state;
        return (
          <div className="SkinToneResult">
            {redirect}
            {/* <div id = "LOGO">
                      <img src = {logo} alt = "COSMOS" width = "100" />
                  </div> */}
            <div className="upperbar">
              <h1>Skin Tone Analysis Result</h1>
              <div className="buttons">
                <button id="back-button" type="button" onClick={() => this.menuHandler()}>
                  <img id="arrow" src={arrow} alt="Back to Main Menu" />
                </button>
                <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
                <button id="my-page-button" type="button" onClick={() => this.mypageHandler(id)}>My Page</button>
              </div>
            </div>
            <div className="resultbox">
              <div className="result">
                <h2>Result</h2>
                <img id="colorbar" src="/media/output/colorbar.png" alt="ColorBar" width="300px" height="300px" margin="auto" />
                <div
                  className="MLresult"
                  style={{
                    backgroundColor: this.state.result, width: 100, height: 100,
                  }}
                />
                <div>{this.state.result}</div>
              </div>
              <div className="recommendation">
                <h2>User ID</h2>
                <div>{this.props.ML.user_id}</div>
                <h2>Foundation Recommendation</h2>
                <div>{FoundationResult}</div>
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
  ML: state.cosmos.ML,
});

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  run_analysis: (id) => dispatch(actionCreators.runAnalysis({ userID: id })),
});
export default connect(mapStateToProps, mapDispatchToProps)(SkinToneResult);
