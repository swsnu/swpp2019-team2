import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './BudgetSearch.css';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';
import logo from "../image/LOGO.png"

class BudgetSearch extends Component {
    state = {
        id:'',
        item_num:2,
        budget:0,
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
    set_budget = (event) => {
        this.setState({budget:event.target.value})
        this.setState({flag_budget:true})
    }
    set_itemnum = (event) => {
        this.setState({item_num:event.target.value})
    }
    confirmHandler = () => {
        if(this.state.budget==0){
            alert("Please set the budget range");
        }
    }
    render(){
        let redirect = null;
        if(this.props.selectedUser){
            if((!this.props.selectedUser.logged_in)){
                redirect = <Redirect to = '/login' />
            }
        }
        return (
            <div className = "BudgetSearch">
                {redirect}
                <div id = "LOGO">
                    <img src = {logo} alt = "COSMOS" width = "100" />
                </div>
                <div className = "buttons">
                    <button id = "log-out-button" onClick = {()=>this.logoutHandler()}>Log-Out</button>
                    <button id= "my-page-button" onClick = {()=>this.mypageHandler(this.state.id)}>My Page</button>
                </div>
                <div id= "Header">
                    <h1>Budget Search</h1>
                </div>
                <div className = "item_input">
                    <h5>Choose Number of Items</h5>
                    <input type = "text" name = "item_val" value={this.state.item_num} />
                    <input type="range" value="0" min="2" max="5" value = {this.state.item_num} onChange = {(event)=> this.set_itemnum(event)} />
                </div>
                <div className = "Budget_input">
                    <h5>Choose Your Budget</h5>
                    <input type = "text" name = "budget_val" value={this.state.budget} />
                    <input type="range" value="0" min="0" max="150000" value = {this.state.budget} onChange = {(event)=> this.set_budget(event)} />
                </div>
                <button id= "combine-cosmetics-button" onClick={()=> this.confirmHandler()}>Combine Cosmetics</button>
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
export default connect(mapStatetoProps, mapDispatchToProps)(BudgetSearch);