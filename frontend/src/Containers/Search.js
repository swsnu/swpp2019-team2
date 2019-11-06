import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Search.css';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/index';
import LipForm from '../Components/LipForm';
import arrow from '../image/화살표.png';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button_dry: false,
      button_oily: false,
      button_tone1: false,
      button_tone2: false,
      button_high: false,
      button_medium: false,
      button_low: false,
      button_face: false,
      button_skin: false,
      button_lip: false,
      button_lip_stick: false,
      button_lip_tint: false,
      button_lip_gloss: false,
      lip_stick: [],
      lip_tint: [],
      lip_gloss: [],
      set_Lipstick: false,
      set_Liptint: false,
      set_Lipgloss: false,
    };
  }

  componentDidMount() { // initialize state
    this.props.onTryAutoSignup();
    this.props.onGetLip();
  }

  logout = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
  }

  back = () => { // 메인페이지로 넘어가는 state 설정해주기
    this.setState({ back: true });
  }

  mypageHandler = (id) => {
    this.props.history.replace(`../mypage/${id}`);
  }


  clickFaceTag() { // 최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({ initiate: true });
    const buttonFace = this.state.button_face;
    this.setState({ button_face: !buttonFace, button_lip: false, button_skin: false });
  }

  clickSkinTag() { // 최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({ initiate: true });
    const buttonSkin = this.state.button_skin;
    this.setState({ button_skin: !buttonSkin, button_lip: false, button_face: false });
  }

  clickLipTag() { // 최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({ initiate: true });
    const buttonLip = this.state.button_lip;
    this.setState({ button_lip: !buttonLip, button_skin: false, button_face: false });
  }

  // 여기서부터 하위 태그들(커버력: 상 중 하) 클릭 시 색상 변경 (더러움 주의!)

  handleClickDry() { // dry 태그 선택
    const buttonDry = this.state.button_dry;
    this.setState({ button_dry: !buttonDry });
  }

  handleClickOily() { // oily 태그 선택
    const buttonOily = this.state.button_oily;
    this.setState({ button_oily: !buttonOily });
  }

  handleClickTone1() { // tone1 태그 선택
    const buttonTone1 = this.state.button_tone1;
    this.setState({ button_tone1: !buttonTone1 });
    this.setState({ search_init: false });
  }

  handleClickTone2() { // tone2 태그 선택
    const buttonTone2 = this.state.button_tone2;
    this.setState({ button_tone2: !buttonTone2 });
    this.setState({ search_init: false });
  }

  handleClickHigh() { // high 태그 선택
    const buttonHigh = this.state.button_high;
    this.setState({ button_high: !buttonHigh });
  }

  handleClickMedium() { // medium 태그 선택
    const buttonMedium = this.state.button_medium;
    this.setState({ button_medium: !buttonMedium });
  }

  handleClickLow() { // low 태그 선택
    const buttonLow = this.state.button_low;
    this.setState({ button_low: !buttonLow });
  }

  handleClickStick() { // dry 태그 선택
    const buttonLipstick = this.state.button_lip_stick;
    this.setState({ button_lip_stick: !buttonLipstick });
    this.setState({ search_init: false });
  }

  handleClickGloss() { // dry 태그 선택
    const buttonLipgloss = this.state.button_lip_gloss;
    this.setState({ button_lip_gloss: !buttonLipgloss });
    this.setState({ search_init: false });
  }

  handleClickTint() { // dry 태그 선택
    const buttonLiptint = this.state.button_lip_tint;
    this.setState({ button_lip_tint: !buttonLiptint });
    this.setState({ search_init: false });
  }

  search() {
    this.setState({ sample: '' });
    this.setState({ search_init: true });
  }


  render() {
    let changePage = '';
    let tagNum; // 최상위 3개 태그 렌더 변수
    let backLogin = '';
    let sampleStick; let sampleTint; let sampleGloss = '';

    if (!this.props.isAuthenticated) {
      changePage = <Redirect to="/login" />;
    }

    if (this.state.search_init) {
      if (this.state.button_lip) {
        if ((this.state.button_tone1 || this.state.button_tone2)) {
          if (this.state.button_lip_gloss || this.state.button_lip_stick
            || this.state.button_lip_tint) {
            if (this.state.button_lip_stick) {
              const lipStick = this.props.storedLips.filter((temp) => temp.category === '립스틱');
              if (!this.state.set_Lipstick) {
                this.setState({ lip_stick: lipStick });
                this.setState({ set_Lipstick: true });
              }
              console.log('lipstck state :', this.state.lip_stick);
              sampleStick = this.state.lip_stick.map((cosmos) => (
                <LipForm
                  key={cosmos.id}
                  thumbnail={cosmos.thumbnail}
                  name={cosmos.name}
                  price={cosmos.price}
                  category={cosmos.category}
                  brand={cosmos.brand}
                  color={cosmos.color}
                />
              ));
            }
            if (this.state.button_lip_gloss) {
              const lipGloss = this.props.storedLips.filter((temp) => temp.category === '립글로스');
              if (!this.state.set_Lipgloss) {
                this.setState({ lip_gloss: lipGloss });
                this.setState({ set_Lipgloss: true });
              }
              sampleGloss = this.state.lip_gloss.map((cosmos) => (
                <LipForm
                  key={cosmos.id}
                  thumbnail={cosmos.thumbnail}
                  name={cosmos.name}
                  price={cosmos.price}
                  category={cosmos.category}
                  brand={cosmos.brand}
                  color={cosmos.color}
                />
              ));
            }
            if (this.state.button_lip_tint) {
              const lipTint = this.props.storedLips.filter((temp) => temp.category === '틴트');
              if (!this.state.set_Liptint) {
                this.setState({ lip_tint: lipTint });
                this.setState({ set_Liptint: true });
              }
              sampleTint = this.state.lip_tint.map((cosmos) => (
                <LipForm
                  key={cosmos.id}
                  thumbnail={cosmos.thumbnail}
                  name={cosmos.name}
                  price={cosmos.price}
                  category={cosmos.category}
                  brand={cosmos.brand}
                  color={cosmos.color}
                />
              ));
            }
          }
        }
      }
    }


    if (this.state.back === true) { // 메인페이지로 돌아가기
      backLogin = <Redirect to="/main" />;
    }

    if (this.state.initiate && (this.state.button_face || this.state.button_skin)) {
      tagNum = (
        <div className="Sub_category">

          <div className="Sub_tag">
            <section className="Skin_types">
              <h4 id="SkinTypes">&emsp;SkinType</h4>
          &emsp;
              <button type="button" className={this.state.button_dry ? 'buttonTrue' : 'buttonFalse'} id="SkinTypes-dry" onClick={() => this.handleClickDry()}>Dry</button>
&emsp;
              <button type="button" className={this.state.button_oily ? 'buttonTrue' : 'buttonFalse'} id="SkinTypes-oily" onClick={() => this.handleClickOily()}>Oily</button>
&emsp;

            </section>

            <section className="Skin_tones">
              <h4 id="SkinTone">&emsp;SkinTone</h4>
          &emsp;
              <button type="button" className={this.state.button_tone1 ? 'buttonTrue' : 'buttonFalse'} id="SkinTone-1" onClick={() => this.handleClickTone1()}>Tone1</button>
&emsp;
              <button type="button" className={this.state.button_tone2 ? 'buttonTrue' : 'buttonFalse'} id="SkinTone-2" onClick={() => this.handleClickTone2()}>Tone2</button>
&emsp;

            </section>


            <section className="Coverage">
              <h4 id="Coverage">&emsp;Coverage</h4>
          &emsp;
              <button type="button" className={this.state.button_high ? 'buttonTrue' : 'buttonFalse'} id="Coverage-high" onClick={() => this.handleClickHigh()}>High</button>
&emsp;
              <button type="button" className={this.state.button_medium ? 'buttonTrue' : 'buttonFalse'} id="Coverage-medium" onClick={() => this.handleClickMedium()}>Medium</button>
&emsp;
              <button type="button" className={this.state.button_low ? 'buttonTrue' : 'buttonFalse'} id="Coverage-low" onClick={() => this.handleClickLow()}>Low</button>
&emsp;

            </section>
          </div>
        </div>
      );
    }


    if (this.state.initiate && this.state.button_lip) { // Lip 선택 시
      tagNum = (
        <div className="Sub_category">

          <div className="Sub_tag">
            <section className="Lip_Category">
              <h4 id="Lip_Category">&emsp;Category</h4>
          &emsp;
              <button type="button" className={this.state.button_lip_stick ? 'buttonTrue' : 'buttonFalse'} id="lip-stick" onClick={() => this.handleClickStick()}>립스틱</button>
&emsp;
              <button type="button" className={this.state.button_lip_gloss ? 'buttonTrue' : 'buttonFalse'} id="lip-gloss" onClick={() => this.handleClickGloss()}>립글로스</button>
&emsp;
              <button type="button" className={this.state.button_lip_tint ? 'buttonTrue' : 'buttonFalse'} id="lip-tint" onClick={() => this.handleClickTint()}>틴트</button>
&emsp;

            </section>

            <section className="Skin_tones">
              <h4 id="SkinTone">&emsp;SkinTone</h4>
          &emsp;
              <button type="button" className={this.state.button_tone1 ? 'buttonTrue' : 'buttonFalse'} id="SkinTone-1" onClick={() => this.handleClickTone1()}>Tone1</button>
&emsp;
              <button type="button" className={this.state.button_tone2 ? 'buttonTrue' : 'buttonFalse'} id="SkinTone-2" onClick={() => this.handleClickTone2()}>Tone2</button>
&emsp;

            </section>
        &emsp;
            <button type="button" id="search_result" onClick={() => this.search()}>Search!</button>

          </div>
        </div>
      );
    }

    return (

      <div className="Search">
        {changePage}
        <div className="upperbar">
          {backLogin}
          <h1>Search</h1>
          <div className="buttons">
            <button id="back-button" type="button" onClick={() => this.back()}>
              <img id="arrow" src={arrow} alt="Back to Main Menu" />
            </button>
            <button type="button" id="log-out-button" onClick={() => this.logout()}>Log-out</button>
            {backLogin}
            <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
          </div>

        </div>
        <div className="Content">
          <div className="Left">
            <h4 className="Category">
              <button type="button" className={this.state.button_face ? 'buttonTrue' : 'buttonFalse'} id="Category_face" onClick={() => this.clickFaceTag()}>Face</button>
&emsp;
              <button type="button" className={this.state.button_skin ? 'buttonTrue' : 'buttonFalse'} id="Category_skin" onClick={() => this.clickSkinTag()}>Skin</button>
&emsp;
              <button type="button" className={this.state.button_lip ? 'buttonTrue' : 'buttonFalse'} id="Category_lip" onClick={() => this.clickLipTag()}>Lip</button>
&emsp;
            </h4>

            <div className="Sub_category">
              {tagNum}

            </div>
          </div>

          <div className="Result">

            {sampleStick}
            {sampleGloss}
            {sampleTint}
          </div>
        </div>
      </div>


    );
  }
}

const mapStateToProps = (state) => ({

  storedLips: state.cosmos.Lip,
  isAuthenticated: state.cosmos.token != null,
  loading: state.cosmos.loading,
  error: state.cosmos.error,
});


const mapDispatchToProps = (dispatch) => ({

  onGetLip: () => dispatch(actionCreators.getLips()),
  Logout: () => dispatch(actionCreators.logout()),
  onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
