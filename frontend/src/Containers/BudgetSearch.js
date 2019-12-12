/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import './BudgetSearch.css';
import swal from 'sweetalert';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import CheckBox from './CheckBox';
import ItemDisplay from './ItemDisplay';
import Header from '../Components/Header';

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
      combi: [],
      show: false,
      itemNum: 2,
      budgetRange: null,
      initialized: true,

    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getUserInfo();
  }


  /* set_budget = (event) => {
      this.setState({budget:event.target.value})
      this.setState({flag_budget:true})
  } */
  setItemNum = (event) => {
    this.setState({ itemNum: parseInt(event.target.value, 10) });
  }

  confirmHandler = () => {
    const { onGetManyProducts } = this.props;
    const {
      find1, find2, find3, find4, find5, budgetRange,
    } = this.state;
    if (budgetRange === null) {
      swal('Please set the budget range');
    } else {
      onGetManyProducts(find1, find2, find3, find4, find5);
      setTimeout(() => {
        this.handleClick();
      }, 2000);
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
      budgetRange, itemNum, initialized,
    } = this.state;
    const { result } = this.props;
    if (initialized === false) {
      swal('please reset before another search');
    } else {
      const minBudget = budgetRange[0];
      const maxBudget = budgetRange[1];
      const tmp1 = result[0];
      const tmp2 = result[1];
      const tmp3 = result[2];
      const tmp4 = result[3];
      const tmp5 = result[4];
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
    const { history } = this.props;
    const {
      itemNum, show, combi,
    } = this.state;
    const strNumItems = 'Choose Number of Items';
    const strBudget = 'Choose Your Budget Range';
    return (
      <div className="BudgetSearch">
        <Header history={history} selected={1} />
        <div className="Content">
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', margin: 20, backgroundColor: '#efefef', borderRadius: 10, padding: 10,
              }}
              >
                <button
                  id="combine-cosmetics-button"
                  type="submit"
                  onClick={() => this.confirmHandler()}
                  style={{
                    widht: 80, height: 40, borderRadius: 8, borderWidth: 3, color: 'black', fontWeight: 'bold', fontSize: 16,
                  }}
                >
                  {' '}
                  Combine Cosmetics
                </button>
                <button
                  type="button"
                  id="reset-result"
                  onClick={() => this.handleReset()}
                  style={{
                    widht: 80, height: 40, borderRadius: 8, borderWidth: 3, color: 'black', fontWeight: 'bold', fontSize: 16,
                  }}
                >
                  {' '}
                    Reset
                  {' '}

                </button>
                <h4 style={{ display: 'flex', justifyContent: 'center' }}>{strBudget}</h4>
                <div>
                  <div style={{ width: 300 }}>
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
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 15 }}>
                    <input type="text" name="item_val" readOnly value={itemNum} style={{ width: 'auto' }} />
                    <input type="range" id="item_num" min="2" max="5" value={itemNum} onChange={(event) => this.setItemNum(event)} style={{ width: 100 }} />
                  </div>
                </div>
                <div>
                  <div style={{ margin: 'auto', width: 200, padding: 15 }}>
                    <CheckBox className="checkbox" id="checkbox1" findUrl={(url) => this.findFirst(url)} />
                  </div>
                  <div style={{ margin: 'auto', width: 200, padding: 15 }}>
                    <CheckBox className="checkbox" id="checkbox2" findUrl={(url) => this.findSecond(url)} />
                  </div>
                  {itemNum > 2 && (
                    <div style={{ margin: 'auto', width: 200, padding: 15 }}>
                      <CheckBox className="checkbox" id="checkbox3" findUrl={(url) => this.findThird(url)} />
                    </div>
                  )}
                  {itemNum > 3 && (
                    <div style={{ margin: 'auto', width: 200, padding: 15 }}>
                      <CheckBox className="checkbox" id="checkbox4" findUrl={(url) => this.findFourth(url)} />
                    </div>
                  )}
                  {itemNum > 4 && (
                    <div style={{ margin: 'auto', width: 200, padding: 15 }}>
                      <CheckBox className="checkbox" id="checkbox5" findUrl={(url) => this.findFifth(url)} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ flex: 1, paddingRight: 20, margin: 20 }}>
              {show && (<ItemDisplay combinations={combi} />)}
            </div>
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
  result: state.cosmos.budgetResult,
});

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser()),
  onGetManyProducts: (url1, url2, url3, url4, url5) => dispatch(
    actionCreators.getManyProducts(url1, url2, url3, url4, url5),
  ),
});
export default connect(mapStateToProps, mapDispatchToProps)(BudgetSearch);
