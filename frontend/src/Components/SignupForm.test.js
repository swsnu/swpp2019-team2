import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from './SignupForm';


describe('<SignupForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<SignupForm />);
    const wrapper = component.find('#password-input');
    expect(wrapper.length).toBe(1);
  });
});
