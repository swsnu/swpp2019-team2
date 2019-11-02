import React, { Component } from 'react';
import BigCalendar from './BigCalendar';

class SalesInfo extends Component {
  render() {
    return (
      <div className="SalesInfo">
        <h1> Sales Information </h1>
        <BigCalendar />
      </div>
    );
  }
}

export default SalesInfo;
