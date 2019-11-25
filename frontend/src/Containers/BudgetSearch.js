/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './BudgetSearch.css';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import arrow from '../image/화살표.png';

class BudgetSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      itemNum: 2,
      budgetRange: null,
      checked: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
  }


  logoutHandler = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
    this.props.getUserInfo();
  }

  mypageHandler = (id) => {
    this.props.history.replace(`../mypage/${id}`);
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
  
  /* set_budget = (event) => {
      this.setState({budget:event.target.value})
      this.setState({flag_budget:true})
  } */
  setItemNum = (event) => {
    this.setState({ itemNum: event.target.value });
  }

  confirmHandler = () => {
    if (this.state.budgetRange === null) {
      swal('Please set the budget range');
    } else {
      swal('will be handled');
    }
  }

  handleChange = (num) => {
    const selected = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    if (this.state.checked[num] === true) {
      this.setState({ checked: selected });
      this.setState({ budgetRange: null });
    } else {
      selected[num] = true;
      this.setState({ checked: selected });
      const chosenBudgetRange = [5000 * num, 5000 * (num + 1)];
      this.setState({ budgetRange: chosenBudgetRange });
    }
  }

  menuHandler = () => {
    this.props.history.replace('../main');
  }

  render() {
    const userInfo = this.props.user.map((res) => {
      this.state.username = res.username;
    });
    let infoString = 'Hello, ' + this.state.username + '!';
    const { checked, id, itemNum } = this.state;
    const { isAuthenticated } = this.props;
    let redirect = null;
    if (!isAuthenticated) {
      redirect = <Redirect to="/login" />;
    }
    const strNumItems = '<Choose Number of Items>';
    const strBudget = '<Choose Your Budget Range>';
    return (
      <div className="BudgetSearch">
        {redirect}
        {/* <div id = "LOGO">
                    <img src = {logo} alt = "COSMOS" width = "100" />
                </div> */}
        <div className="upperbar">
          <h1>Budget Search</h1>
          {infoString}
          <div className="buttons">
            <button id="back-button" type="button" onClick={() => this.menuHandler()}>
              <img id="arrow" src={arrow} alt="Back to Main Menu" />
            </button>
            <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(id)}>My Page</button>
          </div>
        </div>
        <div className="Menubar">
          <button id="Searchmenu" onClick={() => this.searchHandler()}>Search-Tag</button>
          <button id="Budgetmenu" onClick={() => this.budgetHandler()}>Budget-Search</button>
          <button id="Tonemenu" onClick={() => this.toneHandler()}>Tone-Analysis</button>
          <button id="Salemenu" onClick={() => this.saleHandler()}>Sale-Info</button> 
        </div>
        <div className="item_input">
          <h4>{strNumItems}</h4>
          <input type="text" name="item_val" readOnly value={itemNum} />
          <input type="range" id="item_num" value="0" min="2" max="5" value={itemNum} onChange={(event) => this.setItemNum(event)} />
        </div>
        <div className="Budget_input">
          <h4>{strBudget}</h4>
          <div className="input1">
            <input type="checkbox" name="budget_range" id="range1" checked={checked[0]} onChange={() => this.handleChange(0)} />
            0원 이상 ~ 5000원 미만

            <input type="checkbox" name="budget_range" id="range2" checked={checked[1]} onChange={() => this.handleChange(1)} />
            5000원 이상 ~ 10000원 미만

            <input type="checkbox" name="budget_range" id="range3" checked={checked[2]} onChange={() => this.handleChange(2)} />
            10000원 이상 ~ 15000원 미만

            <input type="checkbox" name="budget_range" id="range4" checked={checked[3]} onChange={() => this.handleChange(3)} />
            15000원 이상 ~ 20000원 미만

            <input type="checkbox" name="budget_range" id="range5" checked={checked[4]} onChange={() => this.handleChange(4)} />
            20000원 이상 ~ 25000원 미만
          </div>
          <div className="input2">
            <input type="checkbox" name="budget_range" id="range6" checked={checked[5]} onChange={() => this.handleChange(5)} />
            25000원 이상 ~ 30000원 미만

            <input type="checkbox" name="budget_range" id="range7" checked={checked[6]} onChange={() => this.handleChange(6)} />
            30000원 이상 ~ 35000원 미만

            <input type="checkbox" name="budget_range" id="range8" checked={checked[7]} onChange={() => this.handleChange(7)} />
            35000원 이상  ~ 40000원 미만

            <input type="checkbox" name="budget_range" id="range9" checked={checked[8]} onChange={() => this.handleChange(8)} />
            40000원 이상  ~ 45000원 미만

            <input type="checkbox" name="budget_range" id="range10" checked={checked[9]} onChange={() => this.handleChange(9)} />
            45000원 이상  ~ 50000원 미만
          </div>
          <div className="button">
            <button id="combine-cosmetics-button" type="submit" onClick={() => this.confirmHandler()}>Combine Cosmetics</button>
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
  user: state.cosmos.User,
});

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BudgetSearch);
