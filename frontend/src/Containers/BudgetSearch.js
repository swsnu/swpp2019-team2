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
        false
      ]

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

  setItemNum = (event) => {
    this.setState({ item_num: event.target.value });
  }

  confirmHandler = () => {
    if (this.state.budgetRange === null) {
      alert('Please set the budget range');
    }
  }

  handleChange = num => {
    let selected = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
    if(this.state.checked[num] === true){
      this.setState({ checked : selected })
      this.setState({ budgetRange : null })
    }
    else {
      selected[num] = true;
      this.setState({ checked: selected });
      let chosenBudgetRange = [5000 * num, 5000 * (num + 1)];
      this.setState({ budgetRange: chosenBudgetRange });
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
            <div className = "input1">
              <input type = "checkbox" name="budget_range" id="range1" checked={this.state.checked[0]} onChange={() => this.handleChange(0)} /> 
              0원 이상 ~ 5000원 미만
                        
              <input type = "checkbox" name="budget_range" id ="range2" checked={this.state.checked[1]} onChange={() => this.handleChange(1)} />
              5000원 이상 ~ 10000원 미만
                        
              <input type = "checkbox" name="budget_range" id ="range3" checked={this.state.checked[2]} onChange={() => this.handleChange(2)} />
              10000원 이상 ~ 15000원 미만
                        
              <input type = "checkbox" name="budget_range" id ="range4" checked={this.state.checked[3]} onChange={() => this.handleChange(3)} />
              15000원 이상 ~ 20000원 미만

              <input type = "checkbox" name="budget_range" id ="range5" checked={this.state.checked[4]} onChange={() => this.handleChange(4)} />
              20000원 이상 ~ 25000원 미만
            </div>
            <div className="input2">
              <input type = "checkbox" name="budget_range" id ="range6" checked={this.state.checked[5]} onChange={() => this.handleChange(5)} />
              25000원 이상 ~ 30000원 미만
                        
              <input type = "checkbox" name="budget_range" id ="range7" checked={this.state.checked[6]} onChange={() => this.handleChange(6)} />
              30000원 이상 ~ 35000원 미만
                        
              <input type = "checkbox" name="budget_range" id ="range8" checked={this.state.checked[7]} onChange={() => this.handleChange(7)} />
              35000원 이상  ~ 40000원 미만
                        
              <input type = "checkbox" name="budget_range" id ="range9" checked={this.state.checked[8]} onChange={() => this.handleChange(8)} />
              40000원 이상  ~ 45000원 미만
                        
              <input type = "checkbox" name="budget_range" id ="range10" checked={this.state.checked[9]} onChange={() => this.handleChange(9)} />
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
