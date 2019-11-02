import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class BigCalendar extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, 'days')),
        title: 'Dummy sale info1'
      },
      {
        start: new Date(moment().add(10, 'days')),
        end: new Date(moment().add(14, 'days')),
        title: 'Dummy sale info2'
      },
      {
        start: new Date('2019-12-05'),
        end: new Date('2019-12-10'),
        title: 'Dummy sale info3'
      },
      {
        start: new Date('2019-12-09'),
        end: new Date('2019-12-13'),
        title: 'Dummy sale info4'
      },
      {
        start: new Date('2019-12-21'),
        end: new Date('2019-12-25'),
        title: 'Dummy sale info5'
      }
    ]
  };

  render() {
    return (
      <div className='BigCalendar'>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView='month'
          events={this.state.events}
          style={{ height: '80vh', width: '150vh' }}
        />
      </div>
    );
  }
}

export default BigCalendar;
