import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SkinTone.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import arrow from '../image/화살표.png';

class SkinTone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      selectedFile: null,
      fileurl: '',
      flag: false,
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

    menuHandler = () => {
      this.props.history.replace('../main');
    }

    fileinputHandler = (event) => {
      event.preventDefault();
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        // TODO : update state after upload
        this.setState({ selectedFile: file });
        this.setState({ flag: true });
        this.setState({ fileurl: reader.result });
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        this.setState({ fileurl: '' });
      }
    }

    submitHandler = (event) => {
      event.preventDefault();
      if (!this.state.flag) {
        alert('Please submit a picture with your face');
      }
      // TODO : file backend로 전송
    }

    render() {
      let redirect = null;
      if (this.props.selectedUser) {
        if ((!this.props.selectedUser.logged_in)) {
          redirect = <Redirect to="/login" />;
        }
      }
      const inputImage = '<Image Input>';
      const { fileurl, id } = this.state;
      return (
        <div className="SkinTone">
          {redirect}
          {/* <div id = "LOGO">
                    <img src = {logo} alt = "COSMOS" width = "100" />
                </div> */}
          <div className="upperbar">
            <h1>Skin Tone Analysis</h1>
            <div className="buttons">
              <input type="image" src={arrow} alt="Back to Main" id="back-to-menu-button" onClick={() => this.menuHandler()} />
              <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
              <button id="my-page-button" type="button" onClick={() => this.mypageHandler(id)}>My Page</button>
            </div>
          </div>
          <div className="image_input">
            <h2>{inputImage}</h2>
            <div className="image_preview">
              <img src={fileurl} alt="Please upload" />
              <input id="photo-input" type="file" name="file" accept="image/*" onChange={(event) => this.fileinputHandler(event)} />
              <button id="submit-button" type="submit" onClick={(event) => this.submitHandler(event)}>Submit</button>
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
export default connect(mapStatetoProps, mapDispatchToProps)(SkinTone);
