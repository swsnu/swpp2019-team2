import React, { Component } from 'react';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';
import './MyPage.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import logo from '../image/LOGO.png';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';


const options_color = [
  { value: 'Red', label: 'red' },
  { value: 'Orange', label: 'orange' },
  { value: 'Pink', label: 'pink' },
];

const options_base = [
  { value: '19', label: '19' },
  { value: '21', label: '21' },
  { value: '23', label: '23' },
];

const options_brand = [
  { value: '16브랜드', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537CQS506876427.jpg' width="50px" height="30px" /> },
  { value: 'SEP', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wSD506679483.jpg' width="50px" height="30px" /> },
  { value: 'wetNwild', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549oOb615704527.jpg' width="50px" height="30px" /> },
  { value: '레브론', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549EyB615657222.jpg' width="50px" height="30px" /> },
  { value: '블랙루즈', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537HXF235192827.jpg' width="50px" height="30px" /> },
  { value: '바닐라코', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201904/IMG1555IHU899265786.jpg' width="50px" height="30px" /> },
  { value: '조성아22', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201810/IMG1540vyM356599927.jpg' width="50px" height="30px "/> },
  { value: '잉가', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537wwS404695010.jpg' width="50px" height="30px" /> },
  { value: '한율', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201511/IMG1448CiZ867136270.jpg' width="50px" height="30px" /> },
  { value: '에스쁘아', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201909/IMG1567aNI409940335.png' width="50px" height="30px" /> },
  { value: '라네즈', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201905/IMG1557hLh713746395.jpg' width="50px" height="30px" /> },
  { value: '마몽드', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537ldl155718872.jpg' width="50px" height="30px" /> },
  { value: '아리따움', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537RHU155811506.jpg' width="50px" height="30px" /> },
  { value: '아이오페', label: <img src='https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537MQf155702813.jpg' width="50px" height="30px" /> },
];

const customStyles = {
  control: base => ({
    ...base,
    width: 150,
    height: 30,
    left: 155,
  }),
  menu: base => ({
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

  mypageHandler = (id) => {};

  change_brand(event) {
    let result = [];
    let temp = event.map((res) => {
      let string = ' ' + res.value + ' ';
      result = result.concat(string);
    })
    this.setState({ prefer_brand : result });  
  }

  confirmHandler = () => {
    this.props.putUserInfo2(this.state.nick_name, this.state.prefer_color, this.state.prefer_base, this.state.prefer_brand);
    let r = window.confirm("정보가 수정되었습니다!");
    this.props.getUserInfo();
    this.props.getUserInfo2();
  }

  render() {
    let redirect = null;
    if(this.state.render == false) {
      const userInfo = this.props.user.map((res) => {
        this.setState({ nick_name: res.nick_name })
        this.setState({ prefer_color: res.prefer_color })
        this.setState({ prefer_base: res.prefer_base })
        this.setState({ prefer_brand: res.prefer_brand })
      });
      const userInfo2 = this.props.user2.map((res) => {
        this.setState({ username: res.username })
        this.setState({ password: res.password })
        this.setState({ email: res.email })
      });
      this.setState({ render: true });
      }
    let infoString = this.state.nick_name + ' 님!' +  ' 오늘도 좋은 하루 되세요~';
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
            <label id="user_info">{infoString}</label>
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
          </div>
        </div>
        <div className="Menubar">
          <button id="Searchmenu" onClick={() => this.searchHandler()}>Search-Tag</button>
          <button id="Budgetmenu" onClick={() => this.budgetHandler()}>Budget-Search</button>
          <button id="Tonemenu" onClick={() => this.toneHandler()}>Tone-Analysis</button>
          <button id="Salemenu" onClick={() => this.saleHandler()}>Sale-Info</button> 
        </div>
        <div className="Menu1">
          <div className="Menu1_Border">
          <h1>내 정보</h1>
          <div className="info">
            <br/>
            <label id="username-input" rows="4" type="text">o 아이디: &emsp;{this.state.username}</label>
            <br/><br/>
            <label id="email-input" rows="4" type="text">o 이메일: &emsp;{this.state.email}</label>
            <br/><br/>
            <label id="password-input" rows="4" type="text">o 비밀번호: &emsp;*비공개</label>
            <br/><br/>
            <label id="nickname-input" rows="4" type="text">o 닉네임: &emsp;{this.state.nick_name}</label>
            <br/><br/>
            <label id="color-input" rows="4" type="text">o 선호 색상: &emsp;{this.state.prefer_color}</label>
            <br/><br/>
            <label id="base-input" rows="4" type="text">o 선호 베이스: &emsp;{this.state.prefer_base}호</label>
            <br/><br/>
            <label id="brand-input" rows="4" type="text">o 선호 브랜드: &emsp;{this.state.prefer_brand}</label>
            <br/><br/><br/><br/><br/><br/>
          <div>
          <img id="logo" src={logo} alt="COSMOS" width="100" />
        </div>
        </div>
      </div>
        </div>
        <div className="Menu2">
          <div className="Menu2_Border">
            <br/><br/>
          <label>o 닉네임 변경: </label>
            <input id = "nickname-input" type="text" value={this.state.nick_name}
              onChange={(event)=>this.setState({ nick_name : event.target.value })} styles={customStyles} />
            <br/><br/>
            <label>o 선호 색상 변경: </label>
            <br/><br/>
            <Select id = "color-input" options={options_color}
              onChange={(event)=>this.setState({ prefer_color : event.label })} styles={customStyles} />
            <br/>
            <label>o 선호 베이스 변경: </label>
            <br/><br/>
            <Select id = "base-input" options={options_base}
              onChange={(event)=>this.setState({ prefer_base : event.label })} styles={customStyles} />
            <br/><br/>
            <label>o 선호 브랜드 변경:</label>
            <ReactMultiSelectCheckboxes options={options_brand} onChange={(event)=>this.change_brand(event)} />
          
              
          
          <div className="button">
            <br/><br/><br/><br/><br/><br/>
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
  putUserInfo2: (nick_name, prefer_color, prefer_base, prefer_brand) => dispatch(actionCreators.putUser2(nick_name, prefer_color, prefer_base, prefer_brand)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
