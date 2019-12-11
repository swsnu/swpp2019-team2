/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import './MyPage.css';
import { connect } from 'react-redux';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { isUndefined, isNull } from 'util';
import * as actionCreators from '../store/actions/index';
import logo from '../image/LOGO.png';
import Header from '../Components/Header';

const optionsColor = [
  { value: 'Red', label: 'red' },
  { value: 'Orange', label: 'orange' },
  { value: 'Pink', label: 'pink' },
];

const optionsBase = [
  { value: '19', label: '19' },
  { value: '21', label: '21' },
  { value: '23', label: '23' },
];

const optionsBrand = [
  { value: '16브랜드', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537CQS506876427.jpg" width="50px" height="30px" alt="description 1" /> },
  { value: 'SEP', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wSD506679483.jpg" width="50px" height="30px" alt="description 2" /> },
  { value: 'wetNwild', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549oOb615704527.jpg" width="50px" height="30px" alt="description 3" /> },
  { value: '레브론', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549EyB615657222.jpg" width="50px" height="30px" alt="description 4" /> },
  { value: '블랙루즈', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537HXF235192827.jpg" width="50px" height="30px" alt="description 5" /> },
  { value: '바닐라코', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201904/IMG1555IHU899265786.jpg" width="50px" height="30px" alt="description 6" /> },
  { value: '조성아22', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201810/IMG1540vyM356599927.jpg" width="50px" height="30px" alt="description 7" /> },
  { value: '잉가', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wwS404695010.jpg" width="50px" height="30px" alt="description 8" /> },
  { value: '한율', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201511/IMG1448CiZ867136270.jpg" width="50px" height="30px" alt="description 9" /> },
  { value: '에스쁘아', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201909/IMG1567aNI409940335.png" width="50px" height="30px" alt="description 10" /> },
  { value: '라네즈', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201905/IMG1557hLh713746395.jpg" width="50px" height="30px" alt="description 11" /> },
  { value: '마몽드', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537ldl155718872.jpg" width="50px" height="30px" alt="description 12" /> },
  { value: '아리따움', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537RHU155811506.jpg" width="50px" height="30px" alt="description 13" /> },
  { value: '아이오페', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537MQf155702813.jpg" width="50px" height="30px" alt="description 14" /> },
];

const customStyles = {
  control: (base) => ({
    ...base,
    width: 150,
    height: 30,
  }),
  menu: (base) => ({
    ...base,
    width: 150,
  }),
};

class MyPage extends Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
    this.forceUpdate = this.forceUpdate.bind(this);
  }


  confirmHandler = () => {
    localStorage.setItem('preferColor', this.state.preferColor);
    localStorage.setItem('preferBase', this.state.preferBase);
    this.props.putUserInfo(localStorage.getItem('preferColor'),
      localStorage.getItem('preferBase'), localStorage.getItem('preferBrand'));
    window.confirm('정보가 수정되었습니다!');
    this.props.history.push('../mypage');
  }

  changeBrand = (event) => {
    let result = [];
    for (let i = 0; i < event.length; i++) {
      result = result.concat(event[i].value);
    }
    localStorage.setItem('preferBrand', result);
  }

  render() {
    let redirect = null;
    if (!localStorage.getItem('token')) {
      window.alert('로그인 후 이용해주세요');
      redirect = <Redirect to="/login" />;
    }
    const { history } = this.props;
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const preferColor = localStorage.getItem('preferColor');
    const preferBase = localStorage.getItem('preferBase');
    const preferBrand = localStorage.getItem('preferBrand');
    return (
      <div className="MyPage">
        {redirect}
        <Header history={history} selected={-1} update={this.forceUpdate.bind(this)} />
        <div className="Content">
          <div className="Menu1">
            <h1>Information</h1>
            <div className="info">
              <div className="info_text">{`o 아이디 : ${username}`}</div>
              <div className="info_text">{`o 이메일 : ${email}`}</div>
              <div className="info_text">{`o 선호 색상 : ${(isUndefined(preferColor) || isNull(preferColor)) ? '선호 색상 없음' : preferColor}`}</div>
              <div className="info_text">{`o 선호 베이스 : ${(isUndefined(preferBase) || isNull(preferBase)) ? '선호 베이스 없음' : preferBase}`}</div>
              <div className="info_text">{`o 선호 브랜드 : ${(isUndefined(preferBrand) || isNull(preferBrand)) ? '선호 브랜드 없음' : preferBrand}`}</div>
              <div>
                <img id="logo" src={logo} alt="COSMOS" width="100" />
              </div>
            </div>
          </div>
          <div className="Menu2">
            <div className="selection_list">
              <div className="info_change">
                o 선호 색상 변경:
                <div className="info_select_box">
                  <Select
                    id="color-input"
                    options={optionsColor}
                    onChange={(event) => this.setState({ preferColor: event.label })}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="info_change">
                o 선호 베이스 변경:
                <div className="info_select_box">
                  <Select
                    id="base-input"
                    options={optionsBase}
                    onChange={(event) => this.setState({ preferBase: event.label })}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="info_change">
                o 선호 브랜드 변경:
                <div className="info_multi_select_box">
                  <ReactMultiSelectCheckboxes
                    id="brand-input"
                    options={optionsBrand}
                    onChange={(event) => this.changeBrand(event)}
                  />
                </div>
              </div>
            </div>
            <div className="button">
              <button id="modify-button" type="button" onClick={() => this.confirmHandler()}>save information</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  putUserInfo: (preferColor, preferBase, preferBrand) => dispatch(actionCreators.putUser2(
    preferColor, preferBase, preferBrand,
  )),
});

export default connect(
  null,
  mapDispatchToProps,
)(MyPage);
