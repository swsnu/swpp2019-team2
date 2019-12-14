/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './SkinTone.css';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import Webcam from 'react-webcam';
import * as actionCreators from '../store/actions/index';
import check from '../image/check.png';
import infoJpg from '../image/ML_intro.jpg';

import Header from '../Components/Header';

class SkinTone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileurl: '',
      flag: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.fileinputHandler = this.fileinputHandler.bind(this);
  }

  componentDidMount() {
    const { onTryAutoSignup, getUserInfo } = this.props;
    onTryAutoSignup();
    getUserInfo();
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
      picture.append('user_id', localStorage.getItem('nickname'));
      // user_id state에 저장?
      this.props.send_picture(picture);
    }


    setRef = (webcam) => {
      this.webcam = webcam;
    };

    capture = () => {
      const picture = this.webcam.getScreenshot();
      this.saveImage(picture);
      // this.setState({ selectedFile: picture });
      // this.setState({ flag: true });
    }

    saveImage = (base64string) => {
      const imageData = base64string.split(',')[1];
      const a = document.createElement('a'); // Create <a>
      a.href = `data:image/png;base64,${imageData}`; // Image Base64 Goes here
      a.download = 'Image.png'; // File name Here
      a.click(); // Downloaded file
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
          <Header history={history} selected={2} update={this.forceUpdate.bind(this)} />
          <div className="Content">

            <div className="Intro">
              <img src={infoJpg} alt="SkinTone Analysis" width="300px" style={{ padding: '50px' }} />
              <div style={{ display: 'table', alignContent: 'center', margin: 'auto' }}>
                <img src={check} alt="1. " width="20px" style={{ margin: 'auto', paddingRight: '30px', display: 'inline-table' }} />
                <div style={{ display: 'inline-table' }}>사진을 넣어 머신 러닝을 통해 당신의 피부색을 분석해보세요!</div>
              </div>
              <div style={{
                padding: '30px', display: 'table', alignContent: 'center', margin: 'auto',
              }}
              >
                <img src={check} alt="2. " width="20px" style={{ margin: 'auto', paddingRight: '30px', display: 'inline-table' }} />
                <div style={{ display: 'inline-table' }}>당신에 톤에 딱 맞는 맞춤 파운데이션 추천을 받아보세요!</div>
              </div>
              <div className="takephoto">
                <Popup className="webcam-modal" trigger={<button id="webcammodal" type="button">사진이 없으신가요?</button>} modal>
                  <div className="image_input" style={{ alignContent: 'center', alignItems: 'center' }}>
                    <div style={{ paddingBottom: '30px', color: '#9b45a7' }}>!!! 주의사항 : 형광등 아래에 빛을 정면으로 받는 상태에서 찍으세요 !!!</div>
                    <button id="photo-input" type="button" onClick={this.capture}>Take Photo</button>
                    <Webcam
                      audio={false}
                      height={540}
                      ref={this.setRef}
                      screenshotFormat="image/jpeg"
                      width={650}
                      mirrored
                    />
                  </div>
                </Popup>
              </div>
              <div className="submit">
                <Popup className="submit-modal" trigger={<button id="submitmodal" type="button">Submit</button>} modal>
                  <div className="image_input">
                    <h2 style={{ paddingBottom: '20px' }}>{inputImage}</h2>
                    <div className="INPUT">
                      <div style={{ padding: '40px', color: '#9b45a7' }}>!!! 주의사항 : 형광등 아래에 빛을 정면으로 받는 사진을 선택하세요 !!!</div>
                      <div className="image_preview">
                        <img src={fileurl} alt="Please Insert Selfie :)" />
                        <input id="photo-input" type="file" name="file" accept="image/*" onChange={(event) => this.fileinputHandler(event)} />
                        <button id="submit-button" type="submit" onClick={(event) => this.submitHandler(event)}>Submit</button>
                      </div>
                    </div>
                  </div>
                </Popup>
              </div>
            </div>
          </div>
        </div>
      );
    }
}


const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  send_picture: (img) => dispatch(actionCreators.sendImage(img)),
  run_analysis: (id) => dispatch(actionCreators.runAnalysis({ userID: id })),
  getUserInfo: () => dispatch(actionCreators.getUser()),
});

export default connect(null, mapDispatchToProps)(SkinTone);
