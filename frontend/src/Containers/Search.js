import React, { Component } from 'react';
import './Search.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import ProductForm from '../Components/ProductForm';
import DetailCategory from '../Components/DetailCategory';
import { Slide } from 'react-slideshow-image';
import Logo1 from '../image/slide1.jpg';
import Logo2 from '../image/slide2.jpg';
import Logo3 from '../image/slide3.jpg';

const slideImages = [
  Logo1,
  Logo2,
  Logo3
];
 
const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  onChange: (oldIndex, newIndex) => {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`);
  }
}

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
    this.props.onTryAutoSignup();
  }

  logout = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
  }

  login = () => {
    this.props.history.replace('../login');
  }

  mypage = () => {
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
    let menu;
    if (localStorage.getItem('token')) {
      menu = <button type="button" id="log-out-button" onClick={() => this.logout()}>Log-out</button>;
    } else {
      menu = <button type="button" id="log-in-button" onClick={() => this.login()}>Log-in</button>;
    }

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
        <div className="header">
          <a className="search" href="search">Search&emsp;│</a>
          <nav className="headerMenu">
            <a className="side" href="budget">Budget Search</a>&emsp;&emsp;&emsp;&emsp;
            <a className="side" href="skintone">Tone Analysis</a>&emsp;&emsp;&emsp;&emsp;
            <a className="side" href="sale">Sales Info</a>
          </nav>
          <div className="headerUser">
            {infoString}
          </div>
          <div className="headerButton">
            <button id="my-page-button" type="button" onClick={() => this.mypage()}>My Page</button>
            {menu}
            {backLogin}
          </div>
        </div>
        
        <div className="slide-container">
          <Slide {...properties}>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[0]})`}} />
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[1]})`}} />
            </div>
            <div className="each-slide">
              <div style={{'backgroundImage': `url(${slideImages[2]})`}} />
            </div>
        </Slide>
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
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});


const mapDispatchToProps = (dispatch) => ({
  onGetProduct: (searchQuery) => dispatch(actionCreators.getProducts(searchQuery)),
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
