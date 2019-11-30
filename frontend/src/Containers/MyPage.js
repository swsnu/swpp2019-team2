import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import './MyPage.css';
import { connect } from 'react-redux';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as actionCreators from '../store/actions/index';
import logo from '../image/LOGO.png';


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
    left: 155,
  }),
  menu: (base) => ({
    ...base,
    left: 155,
    width: 150,
  }),
};

class MyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      render: false,
    };
  }

  componentDidMount() {
    this.props.onTryAutoSignup();
    this.props.getUserInfo();
    this.props.getUserInfo2();
  }

  logoutHandler = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
    this.props.getUserInfo2();
  };

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

  mypageHandler = () => {
    this.props.history.replace('../mypage');
  }

  confirmHandler = () => {
    this.props.putUserInfo(this.state.nickName, this.state.preferColor,
      this.state.preferBase, this.state.preferBrand);
    window.confirm('정보가 수정되었습니다!');
    this.props.getUserInfo();
  }

  changeBrand(event) {
    let result = [];
    for (let i = 0; i < event.length; i++) {
      result = result.concat(event[i].value)
    }
    this.setState({ preferBrand: result });
  }

  render() {
    let redirect = null;
    if (this.state.render === false) {
      this.props.user.map((res) => ((
        this.setState({ nickName: res.nick_name }),
        this.setState({ preferColor: res.prefer_color }),
        this.setState({ preferBase: res.prefer_base }),
        this.setState({ preferBrand: res.prefer_brand })
      )));
      this.props.user2.map((res) => ((
        this.setState({ userName: res.username }),
        this.setState({ passWord: res.password }),
        this.setState({ email: res.email })
      )));
      this.setState({ render: true });
    }
    const infoString = `${this.state.nickName} 님! 오늘도 좋은 하루 되세요~`;
    if (!this.props.isAuthenticated) {
      redirect = <Redirect to="/login" />;
    }

    return (
      <div className="MainPage">
        {redirect}
        <div className="upperbar">
          <h1>My Page</h1>
          <div className="buttons">
            <button type="button" id="log-out-button" onClick={() => this.logoutHandler()}>Log-out</button>
            {infoString}
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler()}>My Page</button>
          </div>
        </div>
        <div className="Menubar">
          <button id="Searchmenu" type="button" onClick={() => this.searchHandler()}>Search-Tag</button>
          <button id="Budgetmenu" type="button" onClick={() => this.budgetHandler()}>Budget-Search</button>
          <button id="Tonemenu" type="button" onClick={() => this.toneHandler()}>Tone-Analysis</button>
          <button id="Salemenu" type="button" onClick={() => this.saleHandler()}>Sale-Info</button>
        </div>
        <div className="Menu1">
          <div className="Menu1_Border">
            <h1>내 정보</h1>
            <div className="info">
              <br />
o 아이디: &emsp;
              {this.state.userName}
              <br />
              <br />
o 이메일: &emsp;
              {this.state.email}
              <br />
              <br />
o 비밀번호: &emsp;*비공개
              <br />
              <br />
o 닉네임: &emsp;
              {this.state.nickName}
              <br />
              <br />
o 선호 색상: &emsp;
              {this.state.preferColor}
              <br />
              <br />
o 선호 베이스: &emsp;
              {this.state.preferBase}
호
              <br />
              <br />
o 선호 브랜드: &emsp;
              {this.state.preferBrand}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div>
                <img id="logo" src={logo} alt="COSMOS" width="100" />
              </div>
            </div>
          </div>
        </div>
        <div className="Menu2">
          <div className="Menu2_Border">
            <br />
            <br />
o 닉네임 변경:
            <input
              id="nickname-input"
              type="text"
              value={this.state.nickName}
              onChange={(event) => this.setState({ nickName: event.target.value })}
              styles={customStyles}
            />
            <br />
            <br />
o 선호 색상 변경:
            <br />
            <br />
            <Select
              id="color-input"
              options={optionsColor}
              onChange={(event) => this.setState({ preferColor: event.label })}
              styles={customStyles}
            />
            <br />
o 선호 베이스 변경:
            <br />
            <br />
            <Select
              id="base-input"
              options={optionsBase}
              onChange={(event) => this.setState({ preferBase: event.label })}
              styles={customStyles}
            />
            <br />
            <br />
o 선호 브랜드 변경:
            <ReactMultiSelectCheckboxes
              options={optionsBrand}
              onChange={(event) => this.changeBrand(event)}
            />

            <div className="button">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <button id="modify-button" type="submit" onClick={() => this.confirmHandler()}>수 정</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.cosmos.token != null,
  user: state.cosmos.User,
  user2: state.cosmos.User2,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});

const mapDispatchToProps = (dispatch) => ({
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
  getUserInfo: () => dispatch(actionCreators.getUser()),
  getUserInfo2: () => dispatch(actionCreators.getUser2()),
  putUserInfo: (nickName, preferColor, preferBase, preferBrand) => dispatch(actionCreators.putUser2(
    nickName, preferColor, preferBase, preferBrand,
  )),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
