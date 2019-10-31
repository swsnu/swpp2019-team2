import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import * as actionCreators from '../store/actions/index';

class Search extends Component {
    render(){
        return (
            <div className = "Search">
                <h1>Search Page</h1>
            </div>
        )
    }
}

export default Search;