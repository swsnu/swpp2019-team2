import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './BudgetSearch.css';
import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';
import logo from "../image/LOGO.png"
import arrow from "../image/화살표.png";

class BudgetSearch extends Component {
    state = {
        id:'',
        item_num:2,
        budget_low:0,
        budget_high:0,
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
    /*set_budget = (event) => {
        this.setState({budget:event.target.value})
        this.setState({flag_budget:true})
    }*/
    set_itemnum = (event) => {
        this.setState({item_num:event.target.value})
    }
    confirmHandler = () => {
        if(this.state.budget_high==0){
            alert("Please set the budget range");
        }
    }
    setbudget = () => {
        var checkbox = document.getElementsByName('budget_range');
        var i;
        var count=0;
        for (i=0;i<checkbox.length;i++){
            if(checkbox[i].checked){
                count = count +1;
            }
        }
        if(count >= 2){
            alert("한 범위만 선택 가능합니다");
            for (i=0;i<checkbox.length;i++){
                checkbox[i].checked = false;
            }
            return;
        }
        for (i=0;i<checkbox.length;i++){
            if(checkbox[i].checked){
                this.setState({budget_low: 5000*(i)});
                this.setState({budget_high: 5000 * (i+1)});
            }
        }
    }
    menuHandler = () => {
        this.props.history.replace('../main')
    }
    render(){
        let redirect = null;
        if(this.props.selectedUser){
            if((!this.props.selectedUser.logged_in)){
                redirect = <Redirect to = '/login' />
            }
        }
        let str_num_items= "<Choose Number of Items>"
        let str_budget= "<Choose Your Budget Range>"
        return (
            <div className = "BudgetSearch">
                {redirect}
                {/*<div id = "LOGO">
                    <img src = {logo} alt = "COSMOS" width = "100" />
                </div>*/}
                <div className="upperbar">
                    <h1>Budget Search</h1>
                    <div className = "buttons">
                        <img src = {arrow} alt = "Back to Main" id = "back-to-menu-button" onClick = {()=> this.menuHandler()}/>
                        <button id = "log-out-button" onClick = {()=>this.logoutHandler()}>Log-Out</button>
                        <button id= "my-page-button" onClick = {()=>this.mypageHandler(this.state.id)}>My Page</button>
                    </div>
                </div>
                <div className = "item_input">
                    <h4>{str_num_items}</h4>
                    <input type = "text" name = "item_val" readOnly value={this.state.item_num} />
                    <input type="range" id = "item_num" value="0" min="2" max="5" value = {this.state.item_num} onChange = {(event)=> this.set_itemnum(event)} />
                </div>
                <div className = "Budget_input">
                    <h4>{str_budget}</h4>
                        <div className = "input1">
                            <input type = "checkbox" name="budget_range" id = "range1" onClick={() => this.setbudget()} /> 
                            0원 이상 ~ 5000원 미만
                        
                            <input type = "checkbox" name="budget_range" id = "range2" onClick={() => this.setbudget()} />
                            5000원 이상 ~ 10000원 미만
                        
                            <input type = "checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            10000원 이상 ~ 15000원 미만
                        
                            <input type = "checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            15000원 이상 ~ 20000원 미만

                            <input type = "checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            20000원 이상 ~ 25000원 미만
                        </div>
                        <div className="input2">
                            <input type = "checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            25000원 이상 ~ 30000원 미만
                        
                            <input type = "checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            30000원 이상 ~ 35000원 미만
                        
                            <input type = "checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            35000원 이상  ~ 40000원 미만
                        
                            <input type = "checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            40000원 이상  ~ 45000원 미만
                        
                            <input type = "checkbox" name="budget_range" onClick={() => this.setbudget()} />
                            45000원 이상  ~ 50000원 미만
                        </div>
                        <div className= "button">
                            <button id= "combine-cosmetics-button" onClick={()=> this.confirmHandler()}>Combine Cosmetics</button>    
                        </div>
                </div>
            </div>

        )
    }
}

const mapStatetoProps = state => {
    return {
        Users : state.cosmos.Users,
        selectedUser : state.cosmos.selectedUser
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