import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Search.css'
import * as actionCreators from '../store/actions/index';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import cosmos from '../image/LOGO.png';
/*import Photo from '../image/1.PNG';
import sample from '../image/sample.PNG';*/

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
    
  }
  
  
  componentDidMount() {                          // initialize state
    this.props.onGetLogin();
  }
  
  log_out = () => {                             //로그아웃
    this.props.onEditLogin(this.props.selectedUser);
    this.props.onGetLogin();
  }

  back = () => {                                // 메인페이지로 넘어가는 state 설정해주기
    this.setState({back: true});
  }

  click_facetag() {                         //최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({initiate : true})
    
    this.state.button_face = !this.state.button_face
  }

  click_skintag() {
                            //최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
      this.setState({initiate : true})
      
      this.state.button_skin = !this.state.button_skin
    
    
  }

  click_liptag(){                         //최상위 서치태그 3개 클릭이벤트(Face,Skin 등)))
    this.setState({initiate : true})
    
    this.state.button_lip = !this.state.button_lip
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
  }
  handleClick_tone2(){        // tone2 태그 선택
    this.setState({button_tone2:!this.state.button_tone2})
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

  search(){
    
    if((this.state.button_dry || this.state.button_oily) && (this.state.button_tone1 || this.state.button_tone2) && 
      (this.state.button_high || this.state.button_medium || this.state.button_low)) {
      this.setState({result:true})
    } 
  }


  render() {
    
    let tag_num;        // 최상위 3개 태그 렌더 변수
    let back_login = '';
    let result_img = '';

    if(this.state.result == true)  result_img = <img height = "500" width = "500" />
    if(this.props.selectedUser && !this.props.selectedUser.logged_in) {     //로그인 되어있는지 확인, 안 되어있으면 로그인페이지로 이동
      
      back_login = <Redirect to = '/login'/>
    }
    
    
    if(this.back == true) {                       // 메인페이지로 돌아가기
      back_login = <Redirect to = '/main'/>
    }          
    
    if(this.state.initiate && (this.state.button_face || this.state.button_skin || this.state.button_lip)) { 
      
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


        &emsp;<button id="Search_button" onClick = {() => this.search()}>Search!</button>
        
      </div>
    </div>
    }

 
    return (
      
      <div className="Search"> 

          <div className="Title">
          
            <section className="Button">
              
              <button id="back_mainpage" onClick = {() => this.back()}>Main Page</button>
            </section>
              <img height = "70" width = "70" src={cosmos}/>
              <img height = "30" width = "100" />
            <section className="Button">
              <button id="back_logout" onClick = {() => this.log_out()}>Log-out</button>{back_login}
            </section>

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
            
            {result_img}
          </div>  
    </div>        
 
      
    );
  }
}

const mapStateToProps = state => {  
   return {    

    storedUsers: state.td.users,
    selectedUser: state.td.selectedUser,

  }; 
}; 


const mapDispatchToProps = dispatch => {  
  return {   
    onGetUser: () => dispatch(actionCreators.getUsers()),
    onGetLogin: () => dispatch(actionCreators.getUser()),
    onEditLogin: (id,password , email, name, logged_in) =>
        dispatch(actionCreators.putUser({id :id,
        email : email,
        password : password,
        name : name,
        logged_in : logged_in,})),
 
    
  }    
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));