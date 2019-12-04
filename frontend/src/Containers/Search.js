import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import ProductForm from '../Components/ProductForm';
import DetailCategory from '../Components/DetailCategory';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null,
      call: false,
      searched: null,
    };
  }

  componentDidMount() { // initialize state
    this.props.getUserInfo();
    this.props.onTryAutoSignup();
  }

  logout = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
    localStorage.removeItem('nickname');
  }

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
    const backLogin = '';
    let infoString = '';
    if (localStorage.getItem('nickname')) {
      infoString = `Hello, ${localStorage.getItem('nickname')}!`;
    }
    const { selection, searched } = this.state;
    const { searchResult } = this.props;
    const searchedProduct = searchResult.map((res) => (
      <ProductForm
        selection={searched}
        key={res.id}
        info={res}
      />
    ));

    const click = (e) => {
      if (selection !== e.target.id) {
        this.setState({ selection: e.target.id });
        document.querySelectorAll(`label.selectionValue > input:checked,
      label.sub-selection-chip > input:checked,
      label.color-selection-chip > input:checked`).forEach((input) => {
          input.checked = false;
        });
      }
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
    /* const eye = <DetailCategory
      category="eye" selected={(selection === 'eye')} clickSearch={search} />; */
    const cheek = <DetailCategory category="cheek" selected={(selection === 'cheek')} clickSearch={search} />;
    /* const skincare = <DetailCategory
      category="skincare" selected={(selection === 'skincare')} clickSearch={search} />; */

    return (
      <div className="Search">
        <div className="upperbar">
          {backLogin}
          <h1>Search</h1>
          <div className="buttons">
            {/* <button id="back-button" type="button" onClick={() => this.back()}>
              <img id="arrow" src={arrow} alt="Back to Main Menu" />
            </button> */}
            <button type="button" id="log-out-button" onClick={() => this.logout()}>Log-out</button>
            {backLogin}
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler()}>My Page</button>
          </div>
          {infoString}
        </div>
        <div className="Menubar">
          <div><button id="Searchmenu" type="button" onClick={() => this.searchHandler()}>Search-Tag</button></div>
          <div><button id="Budgetmenu" type="button" onClick={() => this.budgetHandler()}>Budget-Search</button></div>
          <div><button id="Tonemenu" type="button" onClick={() => this.toneHandler()}>Tone-Analysis</button></div>
          <div><button id="Salemenu" type="button" onClick={() => this.saleHandler()}>Sale-Info</button></div>
        </div>
        <div className="Content">
          <div className="Category">
            <ul className="Category">
              <div><button type="button" className="Product" onClick={click} id="lip">Lip</button></div>
              <div><button type="button" className="Product" onClick={click} id="base">Base</button></div>
              {/* <button type="button"
                className="Product" onClick={click} id="eye">Eye</button> */}
              <div><button type="button" className="Product" onClick={click} id="cheek">Cheek</button></div>
              {/* <button type="button"
                className="Product" onClick={click} id="skincare">Skin</button> */}
            </ul>
            {lip}
            {base}
            {/* {eye}  */}
            {cheek}
            {/* {skincare} */}
          </div>
          <div className="ResultDiv">
            <ul className="Result">
              {searchedProduct}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResult: state.cosmos.result,
  isAuthenticated: state.cosmos.token != null,
  user: state.cosmos.User2,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});


const mapDispatchToProps = (dispatch) => ({
  onGetProduct: (searchQuery) => dispatch(actionCreators.getProducts(searchQuery)),
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser2()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
