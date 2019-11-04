import React, { Component } from 'react';
import { Redirect} from 'react-router-dom';
import './Search.css'
import * as actionCreators from '../store/actions/index';
import { connect } from 'react-redux';
import LipForm from '../Components/LipForm';
import arrow from '../image/화살표.png';


class Search extends Component {
  state = { 
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
    tag : false,
    button_lip_stick: false,
    button_lip_tint: false,
    button_lip_gloss: false,
    lip_stick : {},
    lip_tint : {},
    lip_gloss : {},
  }
  
  
  componentDidMount() {                          // initialize state
    this.props.onTryAutoSignup();
    this.props.onGetLip();
  }
  
  logout = () => {
    this.props.Logout();
    this.props.onTryAutoSignup();
  }

  back = () => {                                // 메인페이지로 넘어가는 state 설정해주기
    this.setState({back: true});
  }

  mypageHandler = (id) => {
    this.props.history.replace(`../mypage/${id}`);
  }


  click_facetag() {                         //최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({initiate : true})
    this.setState({button_face : !this.state.button_face, button_lip : false, button_skin : false})
  }

  click_skintag() {                      //최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({initiate : true})
    this.setState({button_skin : !this.state.button_skin, button_lip : false, button_face : false})
  }

  click_liptag(){                         //최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({initiate : true})
    
    this.setState({button_lip : !this.state.button_lip, button_skin : false, button_face : false})
  }

  //여기서부터 하위 태그들(커버력: 상 중 하) 클릭 시 색상 변경 (더러움 주의!)

  handleClick_dry(){        // dry 태그 선택
    this.setState({button_dry:!this.state.button_dry})
  }
  handleClick_oily(){        // oily 태그 선택
    this.setState({button_oily:!this.state.button_oily})
  }
  handleClick_tone1(){        // tone1 태그 선택
    this.setState({button_tone1:!this.state.button_tone1})
    this.setState({search_init : false});
  }
  handleClick_tone2(){        // tone2 태그 선택
    this.setState({button_tone2:!this.state.button_tone2})
    this.setState({search_init : false});
  }
  handleClick_high(){        // high 태그 선택
    this.setState({button_high:!this.state.button_high})
  }
  handleClick_medium(){        // medium 태그 선택
    this.setState({button_medium:!this.state.button_medium})
  }
  handleClick_low(){        // low 태그 선택
    this.setState({button_low:!this.state.button_low})
  }

  handleClick_stick(){        // dry 태그 선택
    this.setState({button_lip_stick:!this.state.button_lip_stick})
    this.setState({search_init : false});
  }
  handleClick_gloss(){        // dry 태그 선택
    this.setState({button_lip_gloss:!this.state.button_lip_gloss})
    this.setState({search_init : false});
  }
  handleClick_tint(){        // dry 태그 선택
    this.setState({button_lip_tint:!this.state.button_lip_tint})
    this.setState({search_init : false});
  }

  search() {
    this.setState({sample : ''});
    this.setState({search_init : true});
  }



  render() {
    let change_page = '';
    let tag_num;        // 최상위 3개 태그 렌더 변수
    let back_login = '';
    let sample_stick, sample_tint, sample_gloss = '';

    if(!this.props.isAuthenticated) {
      
      change_page = <Redirect to='/login' />
      
      
    }

    if(this.state.search_init) {
      if(this.state.button_lip) {
        if((this.state.button_tone1 || this.state.button_tone2)&&(this.state.button_lip_gloss || this.state.button_lip_stick || this.state.button_lip_tint)) {
          if(this.state.button_lip_stick) {
            this.state.lip_stick = this.props.storedLips.filter(temp => temp.category == "립스틱");
            sample_stick = this.state.lip_stick.map(td => { 
      
              return (<LipForm 
              
                thumbnail={td.thumbnail}
                name={td.name} 
                price={td.price} 
                category={td.category} 
                brand_id={td.brand_id}     
              />); 
            })
          } 
          if(this.state.button_lip_gloss) {
            this.state.lip_gloss = this.props.storedLips.filter(temp => temp.category == "립글로스");
            sample_gloss = this.state.lip_gloss.map(td => { 
              
              return (<LipForm 
            
                thumbnail={td.thumbnail}
                name={td.name} 
                price={td.price} 
                category={td.category} 
                brand_id={td.brand_id}   
                />); 
            })
          }
          if(this.state.button_lip_tint) {
            this.state.lip_tint = this.props.storedLips.filter(temp => temp.category == "틴트");
            sample_tint = this.state.lip_tint.map(td => { 
                
              return (<LipForm 
            
                thumbnail={td.thumbnail}
                name={td.name} 
                price={td.price} 
                category={td.category} 
                brand_id={td.brand_id}    
                 />); 
            })
          }
        }
      }
    }

    
   
    
    if(this.state.back == true) {                       // 메인페이지로 돌아가기
      back_login = <Redirect to = '/main'/>
    }          
    
    if(this.state.initiate && (this.state.button_face || this.state.button_skin)) { 
      
      tag_num = <div className="Sub_category">
      
      <div className="Sub_tag">
        <section className="Skin_types">  
          <h4 id = 'SkinTypes' >&emsp;SkinType</h4>
          &emsp;<button className={this.state.button_dry ? "buttonTrue": "buttonFalse"} id = 'SkinTypes-dry' onClick = {() => this.handleClick_dry()}>Dry</button>&emsp;
                <button className={this.state.button_oily ? "buttonTrue": "buttonFalse"} id = 'SkinTypes-oily' onClick = {() => this.handleClick_oily()}>Oily</button>&emsp;

        </section>
        
        <section className="Skin_tones">  
          <h4 id = 'SkinTone' >&emsp;SkinTone</h4>
          &emsp;<button className={this.state.button_tone1 ? "buttonTrue": "buttonFalse"} id = 'SkinTone-1' onClick = {() => this.handleClick_tone1()}>Tone1</button>&emsp;
                <button className={this.state.button_tone2 ? "buttonTrue": "buttonFalse"} id = 'SkinTone-2' onClick = {() => this.handleClick_tone2()}>Tone2</button>&emsp;
          
        </section>


        <section className="Coverage">  
          <h4 id = 'Coverage' >&emsp;Coverage</h4> 
          &emsp;<button className={this.state.button_high ? "buttonTrue": "buttonFalse"} id = 'Coverage-high' onClick = {() => this.handleClick_high()}>High</button>&emsp;
                <button className={this.state.button_medium ? "buttonTrue": "buttonFalse"} id = 'Coverage-medium' onClick = {() => this.handleClick_medium()}>Medium</button>&emsp;
                <button className={this.state.button_low ? "buttonTrue": "buttonFalse"} id = 'Coverage-low' onClick = {() => this.handleClick_low()}>Low</button>&emsp;
          
        </section>
        <h4/>

        
      </div>
    </div>
    }


    if(this.state.initiate && this.state.button_lip) {          //Lip 선택 시
      
      tag_num = <div className="Sub_category">
      
      <div className="Sub_tag">
        <section className="Lip_Category">  
          <h4 id = 'Lip_Category' >&emsp;Category</h4>
          &emsp;<button className={this.state.button_lip_stick ? "buttonTrue": "buttonFalse"} id = 'lip-stick' onClick = {() => this.handleClick_stick()}>립스틱</button>&emsp;
                <button className={this.state.button_lip_gloss ? "buttonTrue": "buttonFalse"} id = 'lip-gloss' onClick = {() => this.handleClick_gloss()}>립글로스</button>&emsp;
                <button className={this.state.button_lip_tint ? "buttonTrue": "buttonFalse"} id = 'lip-tint' onClick = {() => this.handleClick_tint()}>틴트</button>&emsp;

        </section>
        
        <section className="Skin_tones">  
          <h4 id = 'SkinTone' >&emsp;SkinTone</h4>
          &emsp;<button className={this.state.button_tone1 ? "buttonTrue": "buttonFalse"} id = 'SkinTone-1' onClick = {() => this.handleClick_tone1()}>Tone1</button>&emsp;
                <button className={this.state.button_tone2 ? "buttonTrue": "buttonFalse"} id = 'SkinTone-2' onClick = {() => this.handleClick_tone2()}>Tone2</button>&emsp;
          
        </section>
        <h4/>
        &emsp;<button id = 'search_result' onClick = {() => this.search()}>Search!</button>
        <h4/>
        
      </div>
    </div>
    }
 
    return (
      
      <div className="Search">
        {change_page} 
          <div className="upperbar">
            {back_login}
            <h1>Search</h1>
            <div className="buttons">
              <img src={arrow} alt="Back to Main" id="back-to-menu-button" onClick={() => this.back()} />
              <button id="log-out-button" onClick = {() => this.logout()}>Log-out</button>
              {back_login}
              <button id="my-page-button" type="button" onClick={() => this.mypageHandler(this.state.id)}>My Page</button>
            </div>

          </div>

         
          <h4  className = "Category" >
              <button className={this.state.button_face ? "buttonTrue": "buttonFalse"} id = "Category_face" onClick = {() => this.click_facetag()}>Face</button>&emsp;
              <button className={this.state.button_skin ? "buttonTrue": "buttonFalse"} id = "Category_skin" onClick = {() => this.click_skintag()}>Skin</button>&emsp;
              <button className={this.state.button_lip ? "buttonTrue": "buttonFalse"} id = "Category_lip" onClick = {() => this.click_liptag()}>Lip</button>&emsp; 
          </h4>
      
          <div className ="Sub_category">
              {tag_num}
              
          </div>
           
          <div className="Result">
            
            {sample_stick}
            {sample_gloss}
            {sample_tint}
          </div>  
    </div>        
 
      
    );
  }
}

const mapStateToProps = (state) => {  
   return {    
    
    storedLips: state.cosmos.Lip,
    isAuthenticated: state.cosmos.token != null,
    loading: state.cosmos.loading,
    error: state.cosmos.error
  }; 
}; 


const mapDispatchToProps = dispatch => {  
  return {   
    
    onGetLip: () => dispatch(actionCreators.getLips()),
    Logout: () => dispatch(actionCreators.logout()),
    onTryAutoSignup: () => dispatch(actionCreators.authCheckState()),
    
  }    
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
