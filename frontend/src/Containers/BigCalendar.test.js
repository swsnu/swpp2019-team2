import React from 'react';
import { shallow, mount } from 'enzyme';
import BigCalendar from './BigCalendar';

describe('<BigCalender />', () => {
  it('should show calander', () => {
    const component = shallow(<BigCalendar />);
    const wrapper = component.find('.BigCalendar');
    expect(wrapper.length).toBe(1);
  });
});
