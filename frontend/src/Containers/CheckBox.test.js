import React from 'react';
import { shallow } from 'enzyme';
import CheckBox from './CheckBox';


describe('<CheckBox />', () => {
  it('should render checkbox', () => {
    const component = shallow(<CheckBox />);
    const wrapper = component.find('CheckboxTree');
    expect(wrapper.length).toBe(1);
  });
  it('should render dropdown menu', () => {
    const component = shallow(<CheckBox />);
    const wrapper = component.find('Select');
    expect(wrapper.length).toBe(1);
  });
  it('should call handleSelect', () => {
    const mockFind = jest.fn();
    const mockHandleSelect = jest.fn();
    const component = shallow(<CheckBox findUrl={mockFind} />);
    const wrapper = component.find('Select');
    for (let i = 0; i < 3; i++) {
      wrapper.prop('onChange')({ value: i }, mockHandleSelect());
      expect(component.state().selected).toBe(i);
    }
    wrapper.prop('onChange')({ value: null }, mockHandleSelect());
    expect(component.state().selected).toBe(null);
  });
  it('shoudl call onCheck and findUrl', () => {
    const mockFind = jest.fn();
    const mockOnCheck = jest.fn();
    const mockHandleSelect = jest.fn();
    const component = shallow(<CheckBox findUrl={mockFind} />);
    const wrapper1 = component.find('Select');
    const wrapper2 = component.find('.CheckboxTree');
    for (let i = 0; i < 3; i++) {
      wrapper1.prop('onChange')({ value: i }, mockHandleSelect());
      wrapper2.prop('onCheck')('checked', mockOnCheck());
      expect(mockFind).toHaveBeenCalledWith('');
    }

    // expect(mockOnCheck).toHaveBeenCalledTimes(1);
  });
  it('shoudl call onExpand', () => {
    const mockOnExpand = jest.fn();
    const component = shallow(<CheckBox />);
    const wrapper = component.find('CheckboxTree');
    wrapper.prop('onExpand')('expanded', mockOnExpand());
    expect(mockOnExpand).toHaveBeenCalledTimes(1);
  });
  it('shoudl call onClick for leaf node', () => {
    const mockOnClick = jest.fn();
    const component = shallow(<CheckBox />);
    const wrapper = component.find('CheckboxTree');
    wrapper.prop('onClick')({ value: 'v', isLeaf: true }, mockOnClick());
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it('shoudl call onClick for non-leaf node', () => {
    const mockOnClick = jest.fn();
    const component = shallow(<CheckBox />);
    const wrapper = component.find('CheckboxTree');
    wrapper.prop('onClick')({ value: 'v', isLeaf: false }, mockOnClick());
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
