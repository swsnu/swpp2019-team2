import React, { Component } from 'react';
import './CSS/Search.css';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import { Slide } from 'react-slideshow-image';
import Tooltip from 'react-tooltip-lite';
import * as actionCreators from '../store/actions/index';
import ProductForm from '../Components/ProductForm';
import DetailCategory from '../Components/DetailCategory';
import Logo1 from '../image/slide1-1.jpg';
import Logo2 from '../image/slide2-1.jpg';
import Logo3 from '../image/slide3.jpg';
import Header from '../Components/Header';
import removeIcon from '../image/remove-icon.png';
import myIcon from '../image/king.png';
import helpImage from '../image/searchInit.png';
import helpIcon from '../image/help.png';

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
  tick = true;

  constructor(props) {
    super(props);
    this.state = {
      selection: 'lip',
      searched: null,
    };
  }

  async componentDidMount() { // initialize state
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
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
    window.addEventListener('scroll', this.onScroll);
    this.props.onGetProduct('lip/all');
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { searchResult } = this.props;
    const nextResult = nextProps.searchResult;
    if (searchResult !== nextResult) {
      const { selection } = this.state;
      nextState.searched = selection;
    }
    return true;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (window.scrollY > 300 && this.tick && this.state.searched) {
      const size = window.screen.availHeight - 400;
      if (size > document.querySelector('div.ResultDiv').offsetHeight) return;
      document.querySelector('div.Category').classList.add('fixed');
      const category = document.querySelectorAll('div.detail-category');
      category.forEach((cat) => {
        cat.style.height = `${size}px`;
      });
      this.tick = false;
    } else if (!this.tick && window.scrollY < 300) {
      document.querySelector('div.Category').classList.remove('fixed');
      this.tick = true;
    }
  }

  myStoreHandler() {
    if (!localStorage.getItem('token')) {
      window.alert('로그인 후 이용해주세요');
      return;
    }
    let myQuery = 'lip/';
    if (localStorage.getItem('preferColor') !== undefined && localStorage.getItem('preferColor') !== null) {
      if (localStorage.getItem('preferColor') === 'red') myQuery = myQuery.concat('color=LIP_RD&');
      else if (localStorage.getItem('preferColor') === 'pink') myQuery = myQuery.concat('color=LIP_PK&');
      else if (localStorage.getItem('preferColor') === 'orange') myQuery = myQuery.concat('color=LIP_OR&');
      else myQuery = myQuery.concat('color=LIP_PU&');
    }
    if (localStorage.getItem('preferBrand') !== undefined && localStorage.getItem('preferBrand') !== null) {
      const brandList = localStorage.getItem('preferBrand').split(',');
      for (let i = 0; i < brandList.length; i++) {
        myQuery = myQuery.concat(`brand=${brandList[i]}&`);
      }
    }
    if (myQuery === 'lip/') {
      window.alert('마이페이지에서 설정 후 이용해주세요');
      return;
    }
    const { onGetProduct } = this.props;
    onGetProduct(myQuery);
    this.setState({ numDisplay: true });
    this.setState({ searchInit: false });
  }

  render() {
    const {
      selection,
      searched,
    } = this.state;
    const { searchResult, history } = this.props;
    const searchedProduct = searchResult.map((res) => (
      <ProductForm
        selection={searched}
        key={res.id}
        info={res}
      />
    ));
    const initImage = <img src={helpImage} alt="init" width="500" id="init-image" />;
    const resultNum = `검색결과: 총 ${searchResult.length}건`;
    const click = (e) => {
      if (selection !== e.target.id) {
        if (e.target.id !== 'remove-all-selection') this.setState({ selection: e.target.id });
        document.querySelectorAll(`label.toggle > input.toggle__input:checked,
      label.sub-toggle > input.sub-toggle__input:checked,
      label.color-selection-chip > input:checked`).forEach((input) => {
          input.click();
        });
      }
    };
    const search = () => {
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
            <button type="button" className="searchProduct" onClick={search}> Search </button>
            <ul className="Category">
              <div><button type="button" className="Product" onClick={click} id="lip">Lip</button></div>
              <div><button type="button" className="Product" onClick={click} id="base">Base</button></div>
              {/* <button type="button"
                className="Product" onClick={click} id="eye">Eye</button> */}
              <div><button type="button" className="Product" onClick={click} id="cheek">Cheek</button></div>
              {/* <button type="button"
                className="Product" onClick={click} id="skincare">Skin</button> */}
            </ul>
            <div className="Delete-Area">
              <div className="delete-image"><img src={removeIcon} alt="" /></div>
              <div className="delete-button"><button type="button" onClick={click} id="remove-all-selection"> Remove All Selection  </button></div>
            </div>
            <div className="Personal-Area">
              <div className="personal-image"><img src={myIcon} alt="init" width="30" /></div>
              <div className="personal-button">
                <div className="example-warper">
                  <Tooltip key="info-personal-tooltip" content={localStorage.getItem('token') ? '선호 설정에 따라 검색합니다' : '로그인이 필요합니다'}>
                    <button type="button" onClick={() => this.myStoreHandler()} id="personal-selection"> 나만의 상점  </button>
                  </Tooltip>
                </div>
              </div>
              <div className="personal-image"><img src={myIcon} alt="init" width="30" /></div>
            </div>
            {lip}
            {base}
            {/* {eye}  */}
            {cheek}
            {/* {skincare} */}
          </div>
          <div className="ResultDiv">
            <div className="info-result-div">
              <Popup className="help-selection" trigger={<button id="help-selection" type="button"><img src={helpIcon} alt="help" width="30" id="help-selection" /></button>} modal>
                {initImage}
              </Popup>
              <div id="result-num">{resultNum}</div>
            </div>
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
