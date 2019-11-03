import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import BigCalendar from './BigCalendar';
import './SalesInfo.css';
import arrow from '../image/화살표.png';

class SalesInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };
  }

  componentDidMount() {
    this.props.onGETUSERS();
    this.props.onGETUSER();
    if (this.props.selectedUser) {
      this.setState({ id: this.props.selectedUser.id });
    }
  }

  menuHandler = () => {
    this.props.history.replace('../main');
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

  render() {
    let redirect = null;
    if (this.props.selectedUser) {
      if ((!this.props.selectedUser.logged_in)) {
        redirect = <Redirect to="/login" />;
      }
    }
    return (
      <div className="SalesInfo">
        {redirect}
        <div className="upperbar">
          <h1> Sales Information </h1>
          <div className="buttons">
            <img src={arrow} alt="Back to Main" id="back-to-menu-button" onClick={() => this.menuHandler()} />
            <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
          </div>
        </div>
        <div className="Calendar">
          <BigCalendar />
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
  UserLogOut: (id, password, email, name, loggedIn) => dispatch(
    actionCreators.putUser({
      id,
      email,
      password,
      name,
      logged_in: loggedIn,
    }),
  ),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(SalesInfo);
