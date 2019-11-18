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
      product_len: 0,
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

    if (!this.props.isAuthenticated) {
      changePage = <Redirect to="/login" />;
    }

    if (this.state.back === true) { // 메인페이지로 돌아가기
      backLogin = <Redirect to="/main" />;
    }

    const click = (e) => {
      const { selection } = this.state;
      if (selection !== e.target.id) this.setState({ selection: e.target.id });
    };

    const search = () => {
      
    }

    const { selection } = this.state;

    const lip = <DetailCategory category="lip" selected={(selection === 'lip')} />;
    const base = <DetailCategory category="base" selected={(selection === 'base')} />;
    const eye = <DetailCategory category="eye" selected={(selection === 'eye')} />;

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
            <button type="button" className="Product" onClick={click} id="lip">Lip</button>
            <button type="button" className="Product" onClick={click} id="base">Base</button>
            <button type="button" className="Product" onClick={click} id="eye">Eye</button>
          </ul>
          {lip}
          {base}
          {eye}
          <div><button type="button" className="searchProduct" onClick={search}> Search </button></div>
          <div className="Result">
               Result Will be inserted Here
          </div>
        </div>
      </div>


    );
  }
}

const mapStateToProps = (state) => ({

  storedLips: state.cosmos.Lip,
  isAuthenticated: state.cosmos.token != null,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});


const mapDispatchToProps = (dispatch) => ({

  onGetLip: (result) => dispatch(actionCreators.getLips(result)),
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
