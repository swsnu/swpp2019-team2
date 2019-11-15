import React from 'react';
import { shallow } from 'enzyme';
import CheckBox from './CheckBox';


describe('<CheckBox />', () => {
  it('should render', () => {
    const component = shallow(<CheckBox />);
    const wrapper = component.find('#CheckboxTree');
    expect(wrapper.length).toBe(1);
  });
  it('shoudl call onCheck and findUrl', () => {
    const mockFind = jest.fn();
    const mockOnCheck = jest.fn();
    const component = shallow(<CheckBox findUrl={mockFind} />);
    const wrapper = component.find('#CheckboxTree');
    wrapper.prop('onCheck')('checked', mockOnCheck());
    expect(mockOnCheck).toHaveBeenCalledTimes(1);
    expect(mockFind).toHaveBeenCalledTimes(1);
  });
  it('shoudl call onExpand', () => {
    const mockOnExpand = jest.fn();
    const component = shallow(<CheckBox />);
    const wrapper = component.find('#CheckboxTree');
    wrapper.prop('onExpand')('expanded', mockOnExpand());
    expect(mockOnExpand).toHaveBeenCalledTimes(1);
  });
});
