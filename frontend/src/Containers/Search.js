import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Search.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
<<<<<<< HEAD
import LipForm from '../Components/LipForm';
// import arrow from '../image/화살표.png';
=======
import ProductForm from '../Components/ProductForm';
import arrow from '../image/화살표.png';
>>>>>>> origin
import DetailCategory from '../Components/DetailCategory';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null,
<<<<<<< HEAD
      render: false,
=======
      searched: null,
>>>>>>> origin
    };
  }

  componentDidMount() { // initialize state
    this.props.getUserInfo();
    this.props.onTryAutoSignup();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.searched !== nextState.searched) return false;
    return true;
  }


  logout = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
  }

  // // 메인페이지로 넘어가는 state 설정해주기
  // back = () => this.setState({ back: true });

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
    let changePage = '';
    const backLogin = '';
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
<<<<<<< HEAD
    infoString = `${this.state.nickName} 님! 오늘도 좋은 하루 되세요~`;
    const { selection } = this.state;
=======
    const { selection, searched } = this.state;
>>>>>>> origin
    const { searchResult } = this.props;

    const searchedProduct = searchResult.map((res) => (
      <ProductForm
        selection={searched}
        key={res.id}
        info={res}
      />
    ));
    if (!this.props.isAuthenticated) {
      changePage = <Redirect to="/login" />;
    }

    // if (this.state.back === true) { // 메인페이지로 돌아가기
    //   backLogin = <Redirect to="/main" />;
    // }

    const click = (e) => {
      if (selection !== e.target.id) this.setState({ selection: e.target.id });
    };

    const search = (e) => {
      this.setState({ searched: e.target.getAttribute('category') });
      const checked = document.querySelectorAll(`div.detail-category#${selection} input:checked`);
      let queryStr = `${selection}/`;
      if (checked.length === 0) queryStr = queryStr.concat('all');
      checked.forEach((box) => { queryStr = queryStr.concat(box.id); });
      const { onGetProduct } = this.props;
      onGetProduct(queryStr);
    };


    const lip = <DetailCategory category="lip" selected={(selection === 'lip')} clickSearch={search} />;
    const base = <DetailCategory category="base" selected={(selection === 'base')} clickSearch={search} />;
    const eye = <DetailCategory category="eye" selected={(selection === 'eye')} clickSearch={search} />;
    const cheek = <DetailCategory category="cheek" selected={(selection === 'cheek')} clickSearch={search} />;
    const skincare = <DetailCategory category="skincare" selected={(selection === 'skincare')} clickSearch={search} />;

    return (
      <div className="Search">
        {changePage}
        <div className="upperbar">
          {backLogin}
          <h1>Search</h1>
          <div className="buttons">
            {/* <button id="back-button" type="button" onClick={() => this.back()}>
              <img id="arrow" src={arrow} alt="Back to Main Menu" />
            </button> */}
            <button type="button" id="log-out-button" onClick={() => this.logout()}>Log-out</button>
            {backLogin}
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
          </div>
          {infoString}
        </div>
        <div className="Menubar">
          <button id="Searchmenu" type="button" onClick={() => this.searchHandler()}>Search-Tag</button>
          <button id="Budgetmenu" type="button" onClick={() => this.budgetHandler()}>Budget-Search</button>
          <button id="Tonemenu" type="button" onClick={() => this.toneHandler()}>Tone-Analysis</button>
          <button id="Salemenu" type="button" onClick={() => this.saleHandler()}>Sale-Info</button>
        </div>
        <div className="Content">
          <ul className="Category">
            <button type="button" className="Product" onClick={click} id="lip">Lip</button>
            <button type="button" className="Product" onClick={click} id="base">Base</button>
            <button type="button" className="Product" onClick={click} id="eye">Eye</button>
            <button type="button" className="Product" onClick={click} id="cheek">Cheek</button>
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
  user: state.cosmos.User,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});


const mapDispatchToProps = (dispatch) => ({
  onGetProduct: (searchQuery) => dispatch(actionCreators.getProducts(searchQuery)),
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
