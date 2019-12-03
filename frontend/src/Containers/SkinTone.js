import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SkinTone.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';

class SkinTone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      selectedFile: null,
      fileurl: '',
      flag: false,
      render: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.fileinputHandler = this.fileinputHandler.bind(this);
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getUserInfo();
  }

    logoutHandler = () => {
      this.props.Logout();
      this.props.onTryAutoSignup();
    }

    mypageHandler = () => {
      this.props.history.replace('../mypage');
    }

    menuHandler = () => {
      this.props.history.replace('../main');
    }

    fileinputHandler = (event) => {
      event.preventDefault();
      const reader = new FileReader();
      const file = event.target.files[0];
      this.setState({ selectedFile: file });
      reader.onloadend = () => {
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
      const picture = new FormData();
      picture.append('image', this.state.selectedFile);
      picture.append('user_id', '425');
      // user_id state에 저장?
      this.props.send_picture(picture);
      // this.props.run_analysis('425')
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

    render() {
      let redirect = null;
      let infoString = '';
      if (this.state.render === false) {
        this.props.user.map((res) => (
          this.setState({ nickName: res.nick_name })
        ));
        this.setState({ render: true });
      }
      infoString = `${this.state.nickName} 님! 오늘도 좋은 하루 되세요~`;
      if (!this.props.isAuthenticated) {
        redirect = <Redirect to="/login" />;
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
              <button id="log-out-button" type="button" onClick={() => this.logoutHandler()}>Log-Out</button>
              <button id="my-page-button" type="button" onClick={() => this.mypageHandler(id)}>My Page</button>
            </div>
            {infoString}
          </div>
          <div className="Menubar">
            <div><button id="Searchmenu" type="button" onClick={() => this.searchHandler()}>Search-Tag</button></div>
            <div><button id="Budgetmenu" type="button" onClick={() => this.budgetHandler()}>Budget-Search</button></div>
            <div><button id="Tonemenu" type="button" onClick={() => this.toneHandler()}>Tone-Analysis</button></div>
            <div><button id="Salemenu" type="button" onClick={() => this.saleHandler()}>Sale-Info</button></div>
          </div>
          <div className="Content">
            <div className="image_input">
              <h2>{inputImage}</h2>
              <div className="image_preview">
                <img src={fileurl} alt="Please upload" />
                <input id="photo-input" type="file" name="file" accept="image/*" onChange={(event) => this.fileinputHandler(event)} />
                <button id="submit-button" type="submit" onClick={(event) => this.submitHandler(event)}>Submit</button>
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
});

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  send_picture: (img) => dispatch(actionCreators.sendImage(img)),
  run_analysis: (id) => dispatch(actionCreators.runAnalysis({ userID: id })),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinTone);
