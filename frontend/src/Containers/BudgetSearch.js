/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './BudgetSearch.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import arrow from '../image/화살표.png';

class BudgetSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      item_num: 2,
      budget_high: 0,
    };
  }

  componentDidMount() {
    this.props.onGETUSERS();
    this.props.onGETUSER();
    if (this.props.selectedUser) {
      this.setState({ id: this.props.selectedUser.id });
    }
  }

    logoutHandler = () => {
      if (this.props.selectedUser) {
        const { id } = this.props.selectedUser;
        const { password } = this.props.selectedUser;
        const { email } = this.props.selectedUser;
        const { name } = this.props.selectedUser;
        this.props.UserLogOut(id, password, email, name, false);
        this.props.onGETUSER();
        this.props.onGETUSERS();
        if (this.props.selectedUser) {
          if (!this.props.selectedUser.logged_in) {
            this.props.history.push('/login');
          }
        }
      }
    }

    mypageHandler = (id) => {
      this.props.history.replace(`../mypage/${id}`);
    }

    /* set_budget = (event) => {
        this.setState({budget:event.target.value})
        this.setState({flag_budget:true})
    } */
    setItemNum = (event) => {
      this.setState({ item_num: event.target.value });
    }

    confirmHandler = () => {
      if (this.state.budget_high === 0) {
        alert('Please set the budget range');
      }
    }

    setbudget = () => {
      const checkbox = document.getElementsByName('budget_range');
      let i;
      let count = 0;
      for (i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
          count += 1;
        }
      }
      if (count >= 2) {
        alert('한 범위만 선택 가능합니다');
        for (i = 0; i < checkbox.length; i++) {
          checkbox[i].checked = false;
        }
        return;
      }
      for (i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
          // TODO : budget_low 향후 코드에 사용하도록 수정
          // eslint-disable-next-line react/no-unused-state
          this.setState({ budget_low: 5000 * (i) });
          this.setState({ budget_high: 5000 * (i + 1) });
        }
      }
    }

    menuHandler = () => {
      this.props.history.replace('../main');
    }

    render() {
      let redirect = null;
      if (this.props.selectedUser) {
        if ((!this.props.selectedUser.logged_in)) {
          redirect = <Redirect to="/login" />;
        }
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
              <input type="image" src={arrow} alt="Back to Main" id="back-to-menu-button" onClick={() => this.menuHandler()} />
              <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
              <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
            </div>
          </div>
          <div className="item_input">
            <h4>{strNumItems}</h4>
            <input type="text" name="item_val" readOnly value={this.state.item_num} />
            <input type="range" id="item_num" value="0" min="2" max="5" value={this.state.item_num} onChange={(event) => this.setItemNum(event)} />
          </div>
          <div className="Budget_input">
            <h4>{strBudget}</h4>
            <div className="input1">
              <input type="checkbox" name="budget_range" id="range1" onClick={() => this.setbudget()} />
                            0원 이상 ~ 5000원 미만

              <input type="checkbox" name="budget_range" id="range2" onClick={() => this.setbudget()} />
                            5000원 이상 ~ 10000원 미만

              <input type="checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            10000원 이상 ~ 15000원 미만

              <input type="checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            15000원 이상 ~ 20000원 미만

              <input type="checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            20000원 이상 ~ 25000원 미만
            </div>
            <div className="input2">
              <input type="checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            25000원 이상 ~ 30000원 미만

              <input type="checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            30000원 이상 ~ 35000원 미만

              <input type="checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            35000원 이상  ~ 40000원 미만

              <input type="checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            40000원 이상  ~ 45000원 미만

              <input type="checkbox" name="budget_range" onClick={() => this.setbudget()} />
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

const mapStatetoProps = (state) => ({
  Users: state.cosmos.Users,
  selectedUser: state.cosmos.selectedUser,
});
const mapDispatchToProps = (dispatch) => ({
  onGETUSERS: () => dispatch(actionCreators.getUsers()),
  onGETUSER: () => dispatch(actionCreators.getUser()),
  UserLogOut: (id, password, email, name, loggedIn) => dispatch(actionCreators.putUser({
    id,
    email,
    password,
    name,
    logged_in: loggedIn,
  })),

});
export default connect(mapStatetoProps, mapDispatchToProps)(BudgetSearch);
