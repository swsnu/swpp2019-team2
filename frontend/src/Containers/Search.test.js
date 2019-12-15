/* eslint-disable no-unused-vars */
import React from 'react';
import { mount } from 'enzyme';
import {
  Route, Router, Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import 'jest-localstorage-mock';
import * as actions from '../store/actions/cosmos';
import { getMockStore } from '../Mocks/mocks';
import Search from './Search';

jest.mock('react-slideshow-image', () => ({
  Slide({ children }) {
    return (
      <div>
Hello
        {children}
      </div>
    );
  },
}));

const stubSeletedUserT = {
  result: [{
    id: 1, name: 'test_name', price: 5000, category: 'LIP_S', brand: 1, color: 1,
  },
  {
    id: 2, name: 'test_name2', price: 6000, category: 'LIP_T', brand: 1, color: 1,
  }],
  User: [{
    prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
  User2: [{
    email: 'a',
  }],
  token: null,
  loading: false,
  error: null,
};

const stubSeletedUserF = {
  result: [{
    id: 1, name: 'test_name', price: 5000, category: 'LIP_S', brand: 1, color: 1,
  },
  {
    id: 2, name: 'test_name2', price: 6000, category: 'LIP_T', brand: 1, color: 1,
  }],
  User: [{
    prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
  }],
  User2: [{
    email: 'a',
  }],
  token: 'a',
  loading: false,
  error: null,
};


jest.mock('../Components/ProductForm', () => jest.fn((props) => (
  <div className="spyLip">
    <div>
      <section className="Index">
        <h4 className="Lip_id">{props.id}</h4>
      </section>

      <section className="Index6">
        <img height="200" width="200" src={props.thumbnail} alt="new" />
      </section>

      <section className="Index1">
        <h4 id="Lip_name">{props.name}</h4>
      </section>

      <section className="Index2">
        <h4 className="Lip_price">
          {props.price}
원
        </h4>
      </section>

      <section className="Index3">
        <h4 className="Lip_category">{props.category}</h4>
      </section>

      <section className="Index4">
        <h4 className="Lip_brand">{props.brand_id}</h4>
      </section>

      <section className="Index5">
        <h4 className="Lip_color">{props.color}</h4>
      </section>


    </div>
  </div>
)));
const stubInitState = {
  result: [],
  User: [],
  token: null,
  loading: false,
  error: null,
  User2: [],
};
describe('<Liplist />', () => {
  const history = createBrowserHistory();
  let lipList;
  let spygetLips;
  let spylogout;
  let spyauthCheckState;
  let spyuserInfo;
  let spyuserInfo2;
  const mockStore = getMockStore(stubSeletedUserT);
  beforeEach(() => {
    lipList = (
      <Provider store={mockStore}>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => <Search {...props} />}
            />
          </Switch>
        </Router>
      </Provider>
    );
    jest.spyOn(window.localStorage, 'getItem');
    jest.spyOn(window.localStorage, 'setItem');
    spygetLips = jest.spyOn(actions, 'getProducts')
      .mockImplementation(() => (dispatch) => {});
    spylogout = jest.spyOn(actions, 'logout')
      .mockImplementation(() => (dispatch) => {});
    spyauthCheckState = jest.spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    spyuserInfo = jest.spyOn(actions, 'getUser')
      .mockImplementation(() => (dispatch) => {});
    spyuserInfo2 = jest.spyOn(actions, 'getUser2')
      .mockImplementation(() => (dispatch) => {});
  });
  afterEach(() => { jest.clearAllMocks(); });
  it('should click logout', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('nickname', 'test_nickname');
    const component = mount(lipList);
    const button = component.find('#log-out-button');
    button.simulate('click');
    const wrapper = component.find('.spyLip');
    expect(spyauthCheckState).toHaveBeenCalledTimes(2);
  });
  it('should click login', () => {
    localStorage.removeItem('token');
    const component = mount(lipList);
    const button = component.find('#log-in-button');
    button.simulate('click');
    const wrapper = component.find('.spyLip');
    expect(spyauthCheckState).toHaveBeenCalledTimes(1);
  });
  it('should click mypage', () => {
    const component = mount(lipList);
    const button = component.find('#my-page-button');
    button.simulate('click');
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });
  it('should click search-button', () => {
    const component = mount(lipList);
    const newInstance = component.find(Search.WrappedComponent).instance();
    newInstance.setState({ selection: 'lip' });
    const button = component.find('.searchProduct').at(0);
    button.simulate('click');
    expect(spygetLips).toHaveBeenCalledTimes(1);
  });
  it('should change visible category when clicked', () => {
    const component = mount(lipList);
    const newInstance = component.find(Search.WrappedComponent).instance();
    newInstance.setState({ selection: 'lip' });
    const button = component.find('button.Product#base');
    button.simulate('click');
    expect(newInstance.state).toEqual({
      searched: null,
      selection: 'base',
    });
    button.simulate('click');
    expect(newInstance.state).toEqual({
      // nickName: 'a',
      // preferBase: '19',
      // preferBrand: '라네즈',
      // preferColor: 'red',
      selection: 'base',
      searched: null,
    });
  });
});

describe('<Liplist />', () => {
  const history = createBrowserHistory();
  let lipList;
  let spygetLips;
  let spylogout;
  let spyauthCheckState;
  const mockStoreAuth = getMockStore(stubSeletedUserF);
  beforeEach(() => {
    localStorage.clear();
    lipList = (
      <Provider store={mockStoreAuth}>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => <Search {...props} />}
            />
          </Switch>
        </Router>
      </Provider>
    );
    spygetLips = jest.spyOn(actions, 'getProducts')
      .mockImplementation(() => (dispatch) => {});
    spylogout = jest.spyOn(actions, 'logout')
      .mockImplementation(() => (dispatch) => {});
    spyauthCheckState = jest.spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
  });
  afterEach(() => { jest.clearAllMocks(); });
  it('should click mypage', () => {
    const component = mount(lipList);
    const button = component.find('#my-page-button');
    button.simulate('click');
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });
  it('should click mypage', () => {
    const component = mount(lipList);
    const button = component.find('#personal-selection');
    button.simulate('click');
    expect(spygetLips).toHaveBeenCalledTimes(0);
    localStorage.setItem('token', 'test-token');
    button.simulate('click');
    expect(spygetLips).toHaveBeenCalledTimes(0);
  });
  it('should click mystore - lipcolor', () => {
    localStorage.setItem('preferColor', 'pink');
    localStorage.setItem('token', 'test-token');
    const component = mount(lipList);
    const button = component.find('#personal-selection');
    button.simulate('click');
  });
  it('should click mystore - basecolor', () => {
    localStorage.setItem('preferBase', '21');
    localStorage.setItem('token', 'test-token');
    const component = mount(lipList);
    const baseBtn = component.find('button.Product#base');
    baseBtn.simulate('click');
    const button = component.find('#personal-selection');
    button.simulate('click');
  });
  it('should click mystore - brand', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('preferBrand', 'INGA');
    const component = mount(lipList);
    const button = component.find('#personal-selection');
    localStorage.setItem('preferColor', 'pink');
    button.simulate('click');
    expect(spygetLips).toHaveBeenCalledTimes(1);
    localStorage.removeItem('preferBrand');
    button.simulate('click');
    expect(spygetLips).toHaveBeenCalledTimes(2);
  });
  it('should call with proper query string & remove see', () => {
    const component = mount(lipList, { attachTo: document.body });
    const newInstance = component.find(Search.WrappedComponent).instance();
    newInstance.setState({ selection: 'cheek', searched: 'cheek' });
    const button = component.find('button.Product#cheek');
    button.simulate('click');
    const wrapper = component.find('input.sub-toggle__input');
    wrapper.at(0).simulate('change', { target: { checked: true } });
    wrapper.at(0).instance().checked = true;
    const buttons = component.find('.searchProduct').at(0);
    buttons.simulate('click');
    expect(spygetLips).toHaveBeenLastCalledWith('cheek/color=CHK_RD&');
    component.find('button.Product#lip').simulate('click');
    component.detach();
  });
  it('should click remove all selection', () => {
    const component = mount(lipList, { attachTo: document.body });
    const newInstance = component.find(Search.WrappedComponent).instance();
    newInstance.setState({ selection: 'cheek', searched: 'cheek' });
    const button = component.find('button#remove-all-selection');
    component.find('.searchProduct').at(0).simulate('click');
    button.simulate('click');
    component.detach();
  });
});


describe('<Liplist />', () => {
  const history = createBrowserHistory();
  let lipList;
  const resultState = {
    result: [{
      id: 1, name: 'test_name', price: 5000, category: 'LIP_S', brand: 1, color: 1,
    },
    {
      id: 2, name: 'test_name2', price: 6000, category: 'LIP_T', brand: 1, color: 1,
    },
    ],
  };
  beforeEach(() => {
    lipList = (
      <Provider store={getMockStore(resultState)}>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => <Search {...props} />}
            />
          </Switch>
        </Router>
      </Provider>
    );
  });
  afterEach(() => { jest.clearAllMocks(); });
  it('on scroll event', () => {
    const component = mount(lipList, { attachTo: document.body });
    const newInstance = component.find(Search.WrappedComponent).instance();
    newInstance.componentDidMount();
    newInstance.setState({ selection: 'lip', searched: 'lip' });
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
    const customEvent = new Event('scroll');
    window.dispatchEvent(customEvent);
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    window.dispatchEvent(customEvent);
    newInstance.componentWillUnmount();
    component.detach();
  });
  it('on resize event', () => {
    const component = mount(lipList, { attachTo: document.body });
    const newInstance = component.find(Search.WrappedComponent).instance();
    newInstance.componentDidMount();
    newInstance.setState({ selection: 'lip', searched: 'lip' });
    const customEvent = new Event('resize');
    window.dispatchEvent(customEvent);
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
    const customEvent2 = new Event('scroll');
    window.dispatchEvent(customEvent2);
  });
});
