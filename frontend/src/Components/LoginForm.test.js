import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';


describe('<ProductForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<LoginForm />);
    const wrapper = component.find('#username-input');
    expect(wrapper.length).toBe(1);
  });
});
