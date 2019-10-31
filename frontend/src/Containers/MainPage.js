import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./MainPage.css";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions/index";
import logo from "../image/LOGO.png";

class MainPage extends Component {
  state = {
    id: ""
  };
  componentDidMount() {
    this.props.onGETUSERS();
    this.props.onGETUSER();
    if (this.props.selectedUser) {
      this.setState({ id: this.props.selectedUser.id });
    }
  }

  logoutHandler = () => {
    if (this.props.selectedUser) {
      let id = this.props.selectedUser.id;
      let password = this.props.selectedUser.password;
      let email = this.props.selectedUser.email;
      let name = this.props.selectedUser.name;
      this.props.UserLogOut(id, password, email, name, false);
      this.props.onGETUSER();
      this.props.onGETUSERS();
      if (this.props.selectedUser) {
        if (!this.props.selectedUser.logged_in) {
          this.props.history.push("/login");
        }
      }
    }
  };

  searchHandler = () => {
    this.props.history.replace("../search");
  };

  budgetHandler = () => {
    this.props.history.replace("../budget");
  };

  toneHandler = () => {
    this.props.history.replace("../skintone");
  };

  saleHandler = () => {
    this.props.history.replace("../sale");
  };

  mypageHandler = id => {
    this.props.history.replace("../mypage/" + id);
  };

  render() {
    let redirect = null;
    if (this.props.selectedUser) {
      if (!this.props.selectedUser.logged_in) {
        redirect = <Redirect to="/login" />;
      }
    }
    return (
      <div className="MainPage">
        {redirect}
        <div id="LOGO">
          <img src={logo} alt="COSMOS" width="100" />
        </div>
        <h1>Menu</h1>
        <div className="buttons">
          <div className="button1">
            <button id="search-tag" onClick={() => this.searchHandler()}>
              Search Tag
            </button>
            <button id="budget-search" onClick={() => this.budgetHandler()}>
              Budget Search
            </button>
          </div>
          <div className="button2">
            <button id="tone-analysis" onClick={() => this.toneHandler()}>
              Tone Analysis
            </button>
            <button id="sale-information" onClick={() => this.saleHandler()}>
              Sale Information
            </button>
          </div>
        </div>
        <div className="buttons2">
          <button id="log-out-button" onClick={() => this.logoutHandler()}>
            Log-Out
          </button>
          <button
            id="my-page-button"
            onClick={() => this.mypageHandler(this.state.id)}
          >
            My Page
          </button>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    Users: state.td.Users,
    selectedUser: state.td.selectedUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGETUSERS: () => dispatch(actionCreators.getUsers()),
    onGETUSER: () => dispatch(actionCreators.getUser()),
    UserLogOut: (id, password, email, name, logged_in) =>
      dispatch(
        actionCreators.putUser({
          id: id,
          email: email,
          password: password,
          name: name,
          logged_in: logged_in
        })
      )
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(MainPage);
