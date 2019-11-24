import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Search.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import LipForm from '../Components/LipForm';
import arrow from '../image/화살표.png';
import DetailCategory from '../Components/DetailCategory';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null,
    };
  }

  componentDidMount() { // initialize state
    this.props.onTryAutoSignup();
  }

  logout = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
  }

  // 메인페이지로 넘어가는 state 설정해주기
  back = () => this.setState({ back: true });

  mypageHandler = (id) => {
    this.props.history.replace(`../mypage/${id}`);
  }


  render() {
    let changePage = '';
    let backLogin = '';
    const { selection } = this.state;
    const { searchResult } = this.props;
    const searchedProduct = searchResult.map((res) => {
      if (selection === 'lip') {
        return (
          <LipForm
            key={res.id}
            imgUrl={res.img_url}
            name={res.name}
            price={res.price}
            category={res.category}
            form={res.form}
            brand={res.brand}
            colors={res.color}
          />
        );
      }
      return null;
    });
    if (!this.props.isAuthenticated) {
      changePage = <Redirect to="/login" />;
    }

    if (this.state.back === true) { // 메인페이지로 돌아가기
      backLogin = <Redirect to="/main" />;
    }

    const click = (e) => {
      if (selection !== e.target.id) this.setState({ selection: e.target.id });
    };

    const search = () => {
      const checked = document.querySelectorAll(`div.detail-category#${selection} input:checked`);
      let queryStr = `${selection}/`;
      checked.forEach((box) => { queryStr = queryStr.concat(box.id); });
      const { onGetProduct } = this.props;
      onGetProduct(queryStr);
    };


    const lip = <DetailCategory category="lip" selected={(selection === 'lip')} clickSearch = {() => search()} />;
    const base = <DetailCategory category="base" selected={(selection === 'base')} clickSearch = {() => search()} />;
    const eye = <DetailCategory category="eye" selected={(selection === 'eye')} clickSearch = {() => search()} />;
    const cheek = <DetailCategory category="cheek" selected={(selection === 'cheek')} clickSearch = {() => search()} />;
    const skincare = <DetailCategory category="skincare" selected={(selection === 'skincare')} clickSearch = {() => search()} />;

    return (
      <div className="Search">
        {changePage}
        <div className="upperbar">
          {backLogin}
          <h1>Search</h1>
          <div className="buttons">
            <button id="back-button" type="button" onClick={() => this.back()}>
              <img id="arrow" src={arrow} alt="Back to Main Menu" />
            </button>
            <button type="button" id="log-out-button" onClick={() => this.logout()}>Log-out</button>
            {backLogin}
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
          </div>
        </div>
        <div className="Content">
          <ul className="Category">
            <button type="button" className="Product" onClick={click} id="lip">Lip</button><h4/>
            <button type="button" className="Product" onClick={click} id="base">Base</button><h4/>
            <button type="button" className="Product" onClick={click} id="eye">Eye</button><h4/>
            <button type="button" className="Product" onClick={click} id="cheek">Cheek</button><h4/>
            <button type="button" className="Product" onClick={click} id="skincare">Skin</button>
          </ul>
          {lip}
          {base}
          {eye}
          {cheek}
          {skincare}
          <ul className="Result">
            {searchedProduct}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResult: state.cosmos.result,
  isAuthenticated: state.cosmos.token != null,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});


const mapDispatchToProps = (dispatch) => ({

  onGetProduct: (searchQuery) => dispatch(actionCreators.getProducts(searchQuery)),
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
