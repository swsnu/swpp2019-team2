import React, { Component } from 'react';
import './CSS/Search.css';
import { connect } from 'react-redux';
import { Slide } from 'react-slideshow-image';
import * as actionCreators from '../store/actions/index';
import ProductForm from '../Components/ProductForm';
import DetailCategory from '../Components/DetailCategory';
import Logo1 from '../image/slide1.jpg';
import Logo2 from '../image/slide2.jpg';
import Logo3 from '../image/slide3.jpg';
import Header from '../Components/Header';

const slideImages = [
  Logo1,
  Logo2,
  Logo3,
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
  width: 50,
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: null,
      call: false,
      searched: null,
    };
  }

  async componentDidMount() { // initialize state
    this.props.onTryAutoSignup();
    await this.props.getUserProfile();
    await this.props.getUserInfo();
    this.props.userProfile.map((res) => ((
      localStorage.setItem('preferColor', res.prefer_color),
      localStorage.setItem('preferBase', res.prefer_base),
      localStorage.setItem('preferBrand', res.prefer_brand)
    )));
    this.props.userInfo.map((res) => (
      localStorage.setItem('email', res.email)
    ));
  }


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
    const { searchResult, history } = this.props;
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
        <Header history={history} selected={0} />
        <div className="slide-container">
          <Slide {...properties}>
            <div className="each-slide">
              <div style={{ backgroundImage: `url(${slideImages[0]})` }} />
            </div>
            <div className="each-slide">
              <div style={{ backgroundImage: `url(${slideImages[1]})` }} />
            </div>
            <div className="each-slide">
              <div style={{ backgroundImage: `url(${slideImages[2]})` }} />
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
  userProfile: state.cosmos.User,
  userInfo: state.cosmos.User2,
});


const mapDispatchToProps = (dispatch) => ({
  onGetProduct: (searchQuery) => dispatch(actionCreators.getProducts(searchQuery)),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserProfile: () => dispatch(actionCreators.getUser()),
  getUserInfo: () => dispatch(actionCreators.getUser2()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
