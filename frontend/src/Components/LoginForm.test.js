import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';


describe('<ProductForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<LoginForm />);
    const wrapper = component.find('#password-input');
    expect(wrapper.length).toBe(1);
  });
  it('should login if click enter', () => {
    const clickedSignin = jest.fn();
    const component = shallow(<LoginForm clickedSignin={clickedSignin} />);
    const wrapper = component.find('.makeStyles-root-1');
    wrapper.simulate('keyDown', { keyCode: 13 });
    expect(clickedSignin).toBeCalledTimes(1);
    wrapper.simulate('keyDown', { keyCode: 14 });
  });
});
