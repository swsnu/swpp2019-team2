import React from 'react';
import { shallow } from 'enzyme';
import LipForm from './LipForm';


describe('<LipForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<LipForm />);
    const wrapper = component.find('.LipForm');
    expect(wrapper.length).toBe(1);
  });
});
