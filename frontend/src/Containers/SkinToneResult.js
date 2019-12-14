/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SkinToneResult.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Header from '../Components/Header';

class SkinToneResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      rgbResult: '',
    };
  }

  componentDidMount() {
    const { ML, onTryAutoSignup } = this.props;
    onTryAutoSignup();
    this.setState({ result: `rgb(${ML.result_r},${ML.result_g},${ML.result_b})` });
    this.setState({ rgbResult: `rgb( ${ML.result_r.toFixed(5)} , ${ML.result_g.toFixed(5)} , ${ML.result_b.toFixed(5)} )` });
    /* if (this.props.selectedUser) {
        this.setState({ id: this.props.selectedUser.id });
      } */
  }

  render() {
    let redirect = null;
    if (!localStorage.getItem('token')) {
      window.alert('로그인을 먼저 진행해주세요');
      redirect = <Redirect to="/login" />;
    }
    const src = `/media/output/colorbar${localStorage.getItem('nickname')}.png`;
    // const productUrl = '';
    const { ML, history } = this.props;
    const { result, rgbResult } = this.state;
    const FoundationResult = (
      <a target="_blank" rel="noopener noreferrer" className="productItem" href={ML.product.product_url}>
        <section className="thumbnail">
          <img height="200" width="200" src={ML.product.img_url} alt="new" />
        </section>
        <section className="name_info_text">
          {ML.base}
          {' / '}
          {ML.product.brand}
        </section>
        <section className="price_info_text">
가격:&emsp;
          {ML.product.price}
원
        </section>
      </a>
    );
    return (
      <div className="SkinToneResult">
        {redirect}
        <Header history={history} selected={2} update={this.forceUpdate.bind(this)} />
        <div className="Content">
          <div className="resultbox">
            <h2>Result</h2>
            <div className="result">
              <h4>Skintone</h4>
              <img id="colorbar" src={src} alt="ColorBar" width="300px" height="300px" margin="auto" />
              <div
                className="MLresult"
                style={{
                  backgroundColor: result, width: 80, height: 80,
                }}
              />
              <div>{rgbResult}</div>
            </div>
            <div className="recommendation">
              <h4>User ID</h4>
              <div>{ML.user_id}</div>
              <h4>Foundation Recommendation</h4>
              <div>{FoundationResult}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.cosmos.loading,
  error: state.cosmos.error,
  ML: state.cosmos.ML,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  run_analysis: (id) => dispatch(actionCreators.runAnalysis({ userID: id })),
});
export default connect(mapStateToProps, mapDispatchToProps)(SkinToneResult);
