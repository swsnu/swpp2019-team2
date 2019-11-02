import React, { Component } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import swal from 'sweetalert'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class BigCalendar extends Component {
  state = {
    events: [
      {
        start: new Date(),
        end: new Date(moment().add(1, 'days')),
        title: 'Dummy sale info1',
        detail: 'Dummy detail1'
      },
      {
        start: new Date(moment().add(10, 'days')),
        end: new Date(moment().add(14, 'days')),
        title: 'Dummy sale info2',
        detail: 'Dummy detail2'
      },
      {
        start: new Date('2019-12-05'),
        end: new Date('2019-12-10'),
        title: 'Dummy sale info3',
        detail: 'Dummy detail3'
      },
      {
        start: new Date('2019-12-09'),
        end: new Date('2019-12-13'),
        title: 'Dummy sale info4',
        detail: 'Dummy detail4'
      },
      {
        start: new Date('2019-12-21'),
        end: new Date('2019-12-25'),
        title: 'Dummy sale info5',
        detail: 'Dummy detail5'
      }
    ]
  };

  render() {
    return (
      <div>
        <div>
          <Calendar
            id='BigCalendar'
            localizer={localizer}
            defaultDate={new Date()}
            defaultView='month'
            events={this.state.events}
            style={{ height: '80vh', width: '140vh' }}
            onSelectEvent={event => swal(event.title, event.detail)}
          />
        </div>
      </div>

    );
  }
}

export default BigCalendar;
