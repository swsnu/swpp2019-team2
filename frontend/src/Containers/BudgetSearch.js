/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './BudgetSearch.css';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import arrow from '../image/화살표.png';
import CheckBox from './CheckBox';
import ItemDisplay from './ItemDisplay';

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
      list1: [{ name: 'a1', price: 2500 }, { name: 'a2', price: 3500 }, { name: 'a3', price: 4500 }, { name: 'a4', price: 5500 }, { name: 'a5', price: 6500 }, { name: 'a6', price: 7500 }, { name: 'a7', price: 8500 }, { name: 'a8', price: 9500 }, { name: 'a9', price: 10500 }, { name: 'a10', price: 11500 }],
      list2: [{ name: 'b1', price: 2000 }, { name: 'b2', price: 4000 }, { name: 'b3', price: 6000 }, { name: 'b4', price: 8000 }, { name: 'b5', price: 10000 }, { name: 'b6', price: 12000 }, { name: 'b7', price: 14000 }, { name: 'b8', price: 16000 }, { name: 'b9', price: 18000 }, { name: 'b10', price: 20000 }],
      list3: [{ name: 'c1', price: 3700 }, { name: 'c2', price: 4400 }, { name: 'c3', price: 5100 }, { name: 'c4', price: 5800 }, { name: 'c5', price: 6500 }, { name: 'c6', price: 7200 }, { name: 'c7', price: 7900 }, { name: 'c8', price: 8600 }, { name: 'c9', price: 9300 }, { name: 'c10', price: 10000 }],
      list4: [{ name: 'd1', price: 12700 }, { name: 'd2', price: 17550 }, { name: 'd3', price: 22400 }, { name: 'd4', price: 27250 }, { name: 'd5', price: 32100 }, { name: 'd6', price: 36950 }, { name: 'd7', price: 41800 }, { name: 'd8', price: 46650 }, { name: 'd9', price: 51500 }, { name: 'd10', price: 56350 }],
      list5: [{ name: 'e1', price: 8400 }, { name: 'e2', price: 10800 }, { name: 'e3', price: 13200 }, { name: 'e4', price: 15600 }, { name: 'e5', price: 18000 }, { name: 'e6', price: 20400 }, { name: 'e7', price: 22800 }, { name: 'e8', price: 25200 }, { name: 'e9', price: 27600 }, { name: 'e10', price: 30000 }],
      combi: [],
      show: false,
      itemNum: 4,
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
      this.handleClick();
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

  handleClick() {
    const {
      budgetRange, list1, list2, list3, list4, list5, itemNum,
    } = this.state;
    const minBudget = budgetRange[0];
    const maxBudget = budgetRange[1];
    const tmp1 = list1;
    const tmp2 = list2;
    const tmp3 = list3;
    const tmp4 = list4;
    const tmp5 = list5;
    const answer = [];
    for (let i = 0; i < tmp1.length; i++) {
      const comb = [];
      let sum = 0;
      if (tmp1[i].price > maxBudget) break;
      else {
        comb.push(tmp1[i]);
        sum += tmp1[i].price;
        for (let j = 0; j < tmp2.length; j++) {
          if (sum + tmp2[j].price > maxBudget) break;
          else {
            comb.push(tmp2[j]);
            sum += tmp2[j].price;
            if (itemNum === 2) {
              if (sum >= minBudget) {
                answer.push(comb.slice());
              }
              comb.pop();
              sum -= tmp2[j].price;
              // eslint-disable-next-line no-continue
              continue;
            }
            for (let k = 0; k < tmp3.length; k++) {
              if (sum + tmp3[k].price > maxBudget) break;
              else {
                comb.push(tmp3[k]);
                sum += tmp3[k].price;
                if (itemNum === 3) {
                  if (sum >= minBudget) {
                    answer.push(comb.slice());
                  }
                  comb.pop();
                  sum -= tmp3[k].price;
                  // eslint-disable-next-line no-continue
                  continue;
                }
                for (let l = 0; l < tmp4.length; l++) {
                  if (sum + tmp4[l].price > maxBudget) break;
                  else {
                    comb.push(tmp4[l]);
                    sum += tmp4[l].price;
                    if (itemNum === 4) {
                      if (sum >= minBudget) {
                        answer.push(comb.slice());
                      }
                      comb.pop();
                      sum -= tmp4[l].price;
                      // eslint-disable-next-line no-continue
                      continue;
                    }
                    for (let m = 0; m < tmp5.length; m++) {
                      if (sum + tmp5[m].price > maxBudget) break;
                      else {
                        comb.push(tmp5[m]);
                        sum += tmp5[m].price;
                        if (itemNum === 5) {
                          if (sum >= minBudget) {
                            answer.push(comb.slice());
                          }
                          comb.pop();
                          sum -= tmp5[m];
                          // eslint-disable-next-line no-continue
                          continue;
                        }
                      }
                    }
                  }
                }
                comb.pop();
                sum -= tmp3[k].price;
              }
            }

            comb.pop();
            sum -= tmp2[j].price;
          }
        }
      }
    }

    this.setState({ combi: answer });
    this.setState({ show: true });
  }

  render() {
    const {
      checked, id, itemNum, find1, find2, find3, find4, find5, show, combi,
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
          <input type="range" id="item_num" min="2" max="5" value={itemNum} onChange={(event) => this.setItemNum(event)} />
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
          <div>
            <button type="button" id="reset-result" onClick={() => this.setState({ combi: [] })}> 초기화 </button>
          </div>
        </div>
        {show && (<ItemDisplay combinations={combi} />)}
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
