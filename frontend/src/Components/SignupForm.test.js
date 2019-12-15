import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from './SignupForm';


describe('<SignupForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<SignupForm />);
    const wrapper = component.find('#password-input');
    expect(wrapper.length).toBe(1);
  });
  it('should signup if click enter', () => {
    const clickedSignup = jest.fn();
    const component = shallow(<SignupForm clickedSignup={clickedSignup} />);
    const wrapper = component.find('.makeStyles-root-2');
    wrapper.simulate('keyDown', { keyCode: 13 });
    expect(clickedSignup).toBeCalledTimes(1);
    wrapper.simulate('keyDown', { keyCode: 14 });
  });
});
