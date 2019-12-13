/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import './MyPage.css';
import { connect } from 'react-redux';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { isUndefined } from 'util';
import * as actionCreators from '../store/actions/index';
import logo from '../image/LOGO.png';
import Header from '../Components/Header';

const optionsColor = [
  { value: 'Red', label: 'red' },
  { value: 'Orange', label: 'orange' },
  { value: 'Pink', label: 'pink' },
  { value: 'Purple', label: 'purple' },
];

const optionsBase = [
  { value: '19', label: '19' },
  { value: '21', label: '21' },
  { value: '23', label: '23' },
];

const optionsBrand = [
  { value: '16 brand', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537CQS506876427.jpg" width="50px" height="30px" alt="description 1" /> },
  { value: 'SEPbeauty', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wSD506679483.jpg" width="50px" height="30px" alt="description 2" /> },
  { value: 'wet N wild', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549oOb615704527.jpg" width="50px" height="30px" alt="description 3" /> },
  { value: 'REVLON', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549EyB615657222.jpg" width="50px" height="30px" alt="description 4" /> },
  { value: 'BLACK ROUGE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537HXF235192827.jpg" width="50px" height="30px" alt="description 5" /> },
  { value: 'BANILA CO', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201904/IMG1555IHU899265786.jpg" width="50px" height="30px" alt="description 6" /> },
  { value: 'chosungah 22', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201810/IMG1540vyM356599927.jpg" width="50px" height="30px" alt="description 7" /> },
  { value: 'INGA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wwS404695010.jpg" width="50px" height="30px" alt="description 8" /> },
  { value: 'HANYUL', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201511/IMG1448CiZ867136270.jpg" width="50px" height="30px" alt="description 9" /> },
  { value: 'espoir', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201909/IMG1567aNI409940335.png" width="50px" height="30px" alt="description 10" /> },
  { value: 'LANEIGE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201905/IMG1557hLh713746395.jpg" width="50px" height="30px" alt="description 11" /> },
  { value: 'MAMONDE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537ldl155718872.jpg" width="50px" height="30px" alt="description 12" /> },
  { value: 'ARITAUM', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537RHU155811506.jpg" width="50px" height="30px" alt="description 13" /> },
  { value: 'IOPE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537MQf155702813.jpg" width="50px" height="30px" alt="description 14" /> },
  { value: 'EASY PEASY', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201906/IMG1560qht736793377.jpg" width="50px" height="30px" alt="description 15" /> },
  { value: 'DEAR DAHLIA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201908/IMG1564aJR971460368.jpg" width="50px" height="30px" alt="description 16" /> },
  { value: 'piciberry', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537RKu239808627.jpg" width="50px" height="30px" alt="description 17" /> },
  { value: 'KAT MACONIE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201910/IMG1570wkG777403066.png" width="50px" height="30px" alt="description 18" /> },
  { value: 'K-PALETTE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537WYY239596870.jpg" width="50px" height="30px" alt="description 19" /> },
  { value: 'LIPLEASURE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201907/IMG1564Uak133145302.jpg" width="50px" height="30px" alt="description 20" /> },
  { value: 'DEAR DAHLIA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201908/IMG1564aJR971460368.jpg" width="50px" height="30px" alt="description 21" /> },
  { value: 'T:SOME', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201911/IMG1573YXF782637357.jpg" width="50px" height="30px" alt="description 22" /> },
  { value: 'MAKEHEAL', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537Fof234805841.jpg" width="50px" height="30px" alt="description 23" /> },
  { value: 'EUYIRA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537mZq408557115.jpg" width="50px" height="30px" alt="description 24" /> },
  { value: 'HERA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1550GgC592250434.jpg" width="50px" height="30px" alt="description 25" /> },
  { value: 'ILLIYOON', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537ATh155798912.jpg" width="50px" height="30px" alt="description 26" /> },
  { value: 'lilybyred', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537iPC234718762.jpg" width="50px" height="30px" alt="description 27" /> },
  { value: 'BOURJOIS', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537PIM235031169.jpg" width="50px" height="30px" alt="description 28" /> },
  { value: 'RAREKIND', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201909/IMG1568PgL770364475.jpg" width="50px" height="30px" alt="description 29" /> },
  { value: 'gentlecode', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201910/IMG1572JTi486244730.jpg" width="50px" height="30px" alt="description 30" /> },
  { value: 'LET ME SKIN', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537uwZ235815157.jpg" width="50px" height="30px" alt="description 31" /> },
  { value: 'primera', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537pBm221973984.jpg" width="50px" height="30px" alt="description 32" /> },
  { value: 'STILA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537eUA234560242.jpg" width="50px" height="30px" alt="description 33" /> },
  { value: 'MAX FACTOR', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201908/IMG1565IbP662287972.jpg" width="50px" height="30px" alt="description 34" /> },
  { value: 'LA MUSE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537Ado235666942.jpg" width="50px" height="30px" alt="description 35" /> },
  { value: 'unpa.Cosmetics', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537efd236798604.jpg" width="50px" height="30px" alt="description 36" /> },
  { value: 'CANMAKE', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537jzf234476830.jpg" width="50px" height="30px" alt="description 37" /> },
  { value: 'FARMACY', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537cjX236939216.jpg" width="50px" height="30px" alt="description 38" /> },
  { value: 'gesgep', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wWa506770821.jpg" width="50px" height="30px" alt="description 39" /> },
  { value: 'CARMEX', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201911/IMG1574NBX932526152.jpg" width="50px" height="30px" alt="description 40" /> },
  { value: 'PUPA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549mLI869055029.jpg" width="50px" height="30px" alt="description 41" /> },
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
    this.props.putUserInfo(localStorage.getItem('preferColor'),
      localStorage.getItem('preferBase'), localStorage.getItem('preferBrand'));
    window.alert('정보가 수정되었습니다!');
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
              <div className="info_text">{`o 선호 색상 : ${(isUndefined(preferColor) || preferColor==='null' ) ? '선호 색상 없음' : preferColor}`}</div>
              <div className="info_text">{`o 선호 베이스 : ${(isUndefined(preferBase) || preferBase==='null' ) ? '선호 베이스 없음' : preferBase}`}</div>
              <div className="info_text">{`o 선호 브랜드 : ${(isUndefined(preferBrand) || preferBrand==='null' ) ? '선호 브랜드 없음' : preferBrand}`}</div>
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
                    onChange={(event) => localStorage.setItem('preferColor', event.label)}
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
                    onChange={(event) => localStorage.setItem('preferBase', event.label)}
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
