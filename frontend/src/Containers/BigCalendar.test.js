import React from 'react';
import { shallow } from 'enzyme';
import BigCalendar from './BigCalendar';

const stubEvent = {
  title: 'dummy title',
  detail: 'dummy detail'
}

describe('<BigCalender />', () => {
  it('should show calander', () => {
    const component = shallow(<BigCalendar />);
    const wrapper = component.find('#BigCalendar');
    expect(wrapper.length).toBe(1)
  });

  it('should show popup when select specific event', () => {
    const mockSwal = jest.fn()
    const component = shallow(<BigCalendar />);
    const calendar = component.find('#BigCalendar');
    calendar.prop('onSelectEvent')(stubEvent, mockSwal());
    expect(mockSwal).toHaveBeenCalledTimes(1);
  })
});
