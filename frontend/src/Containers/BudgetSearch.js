/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './BudgetSearch.css';
import swal from 'sweetalert';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import CheckBox from './CheckBox';
import ItemDisplay from './ItemDisplay';

const options = [
  { value: 0, label: '0원 ~ 5000원' }, // 삭제가능
  { value: 1, label: '5000원 ~10000원' },
  { value: 2, label: '10000원 ~ 15000원' },
  { value: 3, label: '15000원 ~ 20000원' },
  { value: 4, label: '20000원 ~ 25000원' },
  { value: 5, label: '25000원 ~ 30000원' },
  { value: 6, label: '30000원 ~ 35000원' },
  { value: 7, label: '35000원 ~ 40000원' },
  { value: 8, label: '40000원 ~ 45000원' },
  { value: 9, label: '45000원 ~ 50000원' },
];

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
      itemNum: 2,
      budgetRange: null,
      initialized: true,
      render: false,

    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getUserInfo();
  }


  logoutHandler = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
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
    this.setState({ itemNum: parseInt(event.target.value, 10) });
  }

  confirmHandler = () => {
    if (this.state.budgetRange === null) {
      swal('Please set the budget range');
    } else {
      this.handleClick();
    }
  }

  handleChange = (selected) => {
    if (selected === null) {
      this.setState({ budgetRange: null });
    } else {
      const num = selected.value;
      const chosenBudgetRange = [5000 * num, 5000 * (num + 1)];
      this.setState({ budgetRange: chosenBudgetRange });
    }
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
      budgetRange, list1, list2, list3, list4, list5, itemNum, initialized,
    } = this.state;
    if (initialized === false) {
      swal('please reset before another search');
    } else {
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
      if (answer.length !== 0) {
        this.setState({ initialized: false });
      }
    }
  }

  handleReset() {
    this.setState({ combi: [] });
    this.setState({ show: false });
    this.setState({ initialized: true });
  }

  render() {
    let infoString = '';
    if (this.state.render === false) {
      this.props.user.map((res) => (
        this.setState({ nickName: res.nick_name })
      ));
      this.setState({ render: true });
    }
    infoString = `${this.state.nickName} 님! 오늘도 좋은 하루 되세요~`;
    const {
      id, itemNum, find1, find2, find3, find4, find5, show, combi,
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
            {infoString}
            <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(id)}>My Page</button>
          </div>
        </div>
        <button id="Searchmenu" type="button" onClick={() => this.searchHandler()}>Search-Tag</button>
        <button id="Budgetmenu" type="button" onClick={() => this.budgetHandler()}>Budget-Search</button>
        <button id="Tonemenu" type="button" onClick={() => this.toneHandler()}>Tone-Analysis</button>
        <button id="Salemenu" type="button" onClick={() => this.saleHandler()}>Sale-Info</button>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', margin: 20, backgroundColor: '#EAEAEA', borderRadius: 10, padding: 10,
            }}
            >
              <h4 style={{ display: 'flex', justifyContent: 'center' }}>{strBudget}</h4>
              <div>
                <div style={{ width: 220 }}>
                  <Select
                    id="select"
                    isClearable
                    placeholder="select budget..."
                    options={options}
                    onChange={(selected) => this.handleChange(selected)}
                  />
                </div>
              </div>
              <div className="item_input" style={{ display: 'flex', flexDirection: 'column' }}>
                <h4>{strNumItems}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <input type="text" name="item_val" readOnly value={itemNum} style={{ width: 50 }} />
                  <input type="range" id="item_num" min="2" max="5" value={itemNum} onChange={(event) => this.setItemNum(event)} style={{ width: 100 }} />
                </div>
              </div>
              <div>
                <div style={{ margin: 22, width: 180 }}>
                  <CheckBox className="checkbox" id="checkbox1" findUrl={(url) => this.findFirst(url)} />
                </div>
                <div style={{ margin: 22, width: 180 }}>
                  <CheckBox className="checkbox" id="checkbox2" findUrl={(url) => this.findSecond(url)} />
                </div>
                {itemNum > 2 && (
                  <div style={{ margin: 22, width: 180 }}>
                    <CheckBox className="checkbox" id="checkbox3" findUrl={(url) => this.findThird(url)} />
                  </div>
                )}
                {itemNum > 3 && (
                  <div style={{ margin: 22, width: 180 }}>
                    <CheckBox className="checkbox" id="checkbox4" findUrl={(url) => this.findFourth(url)} />
                  </div>
                )}
                {itemNum > 4 && (
                  <div style={{ margin: 22, width: 180 }}>
                    <CheckBox className="checkbox" id="checkbox5" findUrl={(url) => this.findFifth(url)} />
                  </div>
                )}
              </div>
            </div>
            <div>
              <h5>{find1}</h5>
              <h5>{find2}</h5>
              <h5>{find3}</h5>
              <h5>{find4}</h5>
              <h5>{find5}</h5>
            </div>
          </div>
          <div style={{ flex: 1, paddingRight: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <button
                  id="combine-cosmetics-button"
                  type="submit"
                  onClick={() => this.confirmHandler()}
                  style={{
                    widht: 80, height: 40, borderRadius: 8, borderWidth: 3,
                  }}
                >
                  Combine Cosmetics
                </button>
              </div>
              <div>
                <button
                  type="button"
                  id="reset-result"
                  onClick={() => this.handleReset()}
                  style={{
                    widht: 80, height: 40, borderRadius: 8, borderWidth: 3,
                  }}
                >
                  {' '}
                  초기화
                  {' '}

                </button>
              </div>
            </div>
            {show && (<ItemDisplay combinations={combi} />)}
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
