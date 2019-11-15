/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './BudgetSearch.css';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import arrow from '../image/화살표.png';
import CheckBox from './CheckBox';


class BudgetSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      find1: '',
      find2: '',
      find3: '',
      find4: '',
      find5: '',
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
  }

  mypageHandler = (id) => {
    this.props.history.replace(`../mypage/${id}`);
  }

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

  findFirst(url) {
    this.setState({ find1: url });
  }

  findSecond(url) {
    this.setState({ find2: url });
  }

  findThird(url) {
    this.setState({ find3: url });
  }

  findFourth(url) {
    this.setState({ find4: url });
  }

  findFifth(url) {
    this.setState({ find5: url });
  }


  render() {
    const {
      checked, id, itemNum, find1, find2, find3, find4, find5,
    } = this.state;
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
          <div className="buttons">
            <button id="back-button" type="button" onClick={() => this.menuHandler()}>
              <img id="arrow" src={arrow} alt="Back to Main Menu" />
            </button>
            <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(id)}>My Page</button>
          </div>
        </div>
        <div className="item_input">
          <h4>{strNumItems}</h4>
          <input type="text" name="item_val" readOnly value={itemNum} />
          <input type="range" id="item_num" value="0" min="2" max="5" value={itemNum} onChange={(event) => this.setItemNum(event)} />
        </div>
        <h5>{find1}</h5>
        <h5>{find2}</h5>
        <h5>{find3}</h5>
        <h5>{find4}</h5>
        <h5>{find5}</h5>
        <CheckBox className="checkbox" id="checkbox1" findUrl={(url) => this.findFirst(url)} />
        <CheckBox className="checkbox" id="checkbox2" findUrl={(url) => this.findSecond(url)} />
        {itemNum > 2 && (<CheckBox className="checkbox" id="checkbox3" findUrl={(url) => this.findThird(url)} />)}
        {itemNum > 3 && (<CheckBox className="checkbox" id="checkbox4" findUrl={(url) => this.findFourth(url)} />)}
        {itemNum > 4 && (<CheckBox className="checkbox" id="checkbox5" findUrl={(url) => this.findFifth(url)} />)}
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
});

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
});
export default connect(mapStateToProps, mapDispatchToProps)(BudgetSearch);
