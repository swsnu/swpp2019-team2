import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SkinTone.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import Header from '../Components/Header';

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
      picture.append('user_id', 425);
      // user_id state에 저장?
      this.props.send_picture(picture);
    }


    render() {
      let redirect = null;
      if (!localStorage.getItem('token')) {
        window.alert('로그인을 먼저 진행해주세요');
        redirect = <Redirect to="/login" />;
      }
      const { history } = this.props;
      const inputImage = '<Image Input>';
      const { fileurl } = this.state;
      return (
        <div className="SkinTone">
          {redirect}
          {/* <div id = "LOGO">
                    <img src = {logo} alt = "COSMOS" width = "100" />
                </div> */}
          <Header history={history} selected={2} />
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
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  send_picture: (img) => dispatch(actionCreators.sendImage(img)),
  run_analysis: (id) => dispatch(actionCreators.runAnalysis({ userID: id })),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinTone);
