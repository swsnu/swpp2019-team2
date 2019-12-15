import React from 'react';
import { shallow } from 'enzyme';
import BigCalendar from './BigCalendar';

const stubEvent = {
  title: 'dummy title',
  header: 'dummy header',
  detail: 'dummy detail',
};

const mockItem = { value: 'ARITAUM', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201809/IMG1537RHU155811506.jpg" width="100px" height="60px" alt="description 13" /> };
const mockItem2 = { value: 'PUPA', label: <img src="https://cdn.aritaum.com/UPLOAD/UPLOAD_IMAGE/BRD_LOGO/201902/IMG1549mLI869055029.jpg" width="100px" height="60px" alt="description 41" /> };
const mockEvent = [
  {
    start: new Date('2019-12-11'),
    end: new Date('2019-12-14'),
    title: '아리따움',
    brandName: 'ARITAUM',
    header: '2019년 결산 세일',
    detail: '19년 아리따움 연말 결산 세일 혜택 \n 일반: 15% ~ 60% \n 스마트클럽: 25% ~ 60%',
  },
];

describe('<BigCalender />', () => {
  it('should show calander', () => {
    const component = shallow(<BigCalendar />);
    const wrapper = component.find('.Calendar');
    expect(wrapper.length).toBe(1);
  });


  it('should handle dropdown menu change', () => {
    const mockHandleChange = jest.fn();
    const component = shallow(<BigCalendar />);
    const wrapper = component.find('#select-brand');
    wrapper.prop('onChange')(mockItem2, mockHandleChange());
    expect(component.state().selectedEvent).toEqual([]);
    wrapper.prop('onChange')(mockItem, mockHandleChange());
    expect(component.state().selectedEvent).toEqual(mockEvent);
  });

  it('should show popup when select specific event', () => {
    const mockSwal = jest.fn();
    const component = shallow(<BigCalendar />);
    const calendar = component.find('#BigCalendar');
    calendar.prop('onSelectEvent')(stubEvent, mockSwal());
    expect(mockSwal).toHaveBeenCalledTimes(1);
  });
});
