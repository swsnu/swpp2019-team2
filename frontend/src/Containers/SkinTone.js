import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './SkinTone.css';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';
import logo from "../image/LOGO.png"

class SkinTone extends Component {
    constructor(props){
        super(props);
        this.state = {
        id:'',
        selectedFile:null,
        fileurl:'',
        flag: false,
        };
    }
    componentDidMount(){
        this.props.onGETUSERS();
        this.props.onGETUSER();
        if(this.props.selectedUser){
            this.setState({id:this.props.selectedUser.id})
        }
    }
    logoutHandler = () => {
        if(this.props.selectedUser){
            let id = this.props.selectedUser.id;
            let password = this.props.selectedUser.password;
            let email = this.props.selectedUser.email;
            let name = this.props.selectedUser.name;
            this.props.UserLogOut(id,password , email, name, false);
            this.props.onGETUSER();
            this.props.onGETUSERS();
            if(this.props.selectedUser){
                if(!this.props.selectedUser.logged_in){
                    this.props.history.push('/login');
                }
            }
        }
    }

    mypageHandler = (id) => {
        this.props.history.replace('../mypage/' + id)
    }

    fileinputHandler = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({selectedFile : file})
            this.setState({flag:true})
            this.setState({fileurl : reader.result})
        };
        if(file){
            reader.readAsDataURL(file)
        }
        else{
            this.setState({fileurl:""})
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        if(!this.state.flag){
            alert("Please submit a picture with your face")
        }
        {/*file backend로 전송 */}

    }

    render(){
        let redirect = null;
        if(this.props.selectedUser){
            if((!this.props.selectedUser.logged_in)){
                redirect = <Redirect to = '/login' />
            }
        }
        return (
            <div className = "SkinTone">
                {redirect}
                <div id = "LOGO">
                    <img src = {logo} alt = "COSMOS" width = "100" />
                </div>
                <div className = "buttons">
                    <button id = "log-out-button" onClick = {()=>this.logoutHandler()}>Log-Out</button>
                    <button id= "my-page-button" onClick = {()=>this.mypageHandler(this.state.id)}>My Page</button>
                </div>
                <h1>Skin Tone Analysis</h1>
                <div className = "image_preview">
                    <img src = {this.state.fileurl} alt = "Please select image" />  
                </div>
                <div className = "photo_input">
                    <input name = "photo-input" type="file" name="file" onChange={event => this.fileinputHandler(event)}/>
                    <button id = "submit-button" onClick = {(event)=>this.submitHandler(event)}>Submit</button>
                </div>
            </div>
        )
    }
}


const mapStatetoProps = state => {
    return {
        Users : state.td.Users,
        selectedUser : state.td.selectedUser
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onGETUSERS : () => dispatch(actionCreators.getUsers()),
        onGETUSER : () => dispatch(actionCreators.getUser()),
        UserLogOut: (id,password , email, name, logged_in) =>
             dispatch(actionCreators.putUser({id :id,
                email : email,
                password : password,
                name : name,
                logged_in : logged_in,})),

    };
};
export default connect(mapStatetoProps, mapDispatchToProps)(SkinTone);