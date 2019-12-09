import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SkinToneResult.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

class SkinToneResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      rgb_result: '',
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.setState({ result: `rgb(${this.props.ML.result_r},${this.props.ML.result_g},${this.props.ML.result_b})` });
    this.setState({ rgb_result: `rgb(${this.props.ML.result_r.toFixed(5)} , ${this.props.ML.result_g.toFixed(5)} , ${this.props.ML.result_b.toFixed(5)})` });
    /* if (this.props.selectedUser) {
        this.setState({ id: this.props.selectedUser.id });
      } */
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
          this.props.user.map((res) => (
            this.setState({ nickName: res.nick_name })
          ));
          this.setState({ render: true });
        }
        infoString = `Hello, ${localStorage.getItem('nickname')}!`;
        if (!localStorage.getItem('token')) {
          window.alert('로그인을 먼저 진행해주세요');
          redirect = <Redirect to="/login" />;
        }
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
              <h1>Skin Tone Analysis</h1>
              <div className="buttons">
                <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
                <button id="my-page-button" type="button" onClick={() => this.mypageHandler(id)}>My Page</button>
              </div>
              {infoString}
            </div>
            <div className="Menubar">
              <div><button id="Searchmenu" type="button" onClick={() => this.searchHandler()}>Search-Tag</button></div>
              <div><button id="Budgetmenu" type="button" onClick={() => this.budgetHandler()}>Budget-Search</button></div>
              <div><button id="Tonemenu" type="button" onClick={() => this.toneHandler()}>Tone-Analysis</button></div>
              <div><button id="Salemenu" type="button" onClick={() => this.saleHandler()}>Sale-Info</button></div>
            </div>
            <div className="resultbox">
              <h2>Result</h2>
              <div className="result">
                <img id="colorbar" src="http://52.141.1.157:8000/media/output/colorbar.png" alt="ColorBar" width="300px" height="300px" margin="auto" style={{ paddingTop: '30px' }} />
                <div
                  className="MLresult"
                  style={{
                    backgroundColor: this.state.result, width: 100, height: 100,
                  }}
                />
                <div>{this.state.rgb_result}</div>
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
