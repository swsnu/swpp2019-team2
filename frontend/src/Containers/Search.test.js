/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  BrowserRouter, Route, Router, Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import * as actions from '../store/actions/cosmos';
import { getMockStore } from '../Mocks/mocks';
import Search from './Search';
import { Slide } from 'react-slideshow-image';

const stubSeletedUserT = {
  result: [{
    id: 1, name: 'test_name', price: 5000, category: 'LIP_S', brand: 1, color: 1,
  },
  {
    id: 2, name: 'test_name2', price: 6000, category: 'LIP_T', brand: 1, color: 1,
  }],
  User: [{
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
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
    nick_name: 'a', prefer_color: 'red', prefer_base: '19', prefer_brand: '라네즈',
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
};
describe('<Liplist />', () => {
  const history = createBrowserHistory();
  let lipList;
  let spygetLips;
  let spylogout;
  let spyauthCheckState;
  let spyuserInfo;
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
    spygetLips = jest.spyOn(actions, 'getProducts')
      .mockImplementation(() => (dispatch) => {});
    spylogout = jest.spyOn(actions, 'logout')
      .mockImplementation(() => (dispatch) => {});
    spyauthCheckState = jest.spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    spyuserInfo = jest.spyOn(actions, 'getUser')
      .mockImplementation(() => (dispatch) => {});
  });
  it('should click logout', () => {
    const component = mount(lipList);
    const button = component.find('#log-out-button');
    button.simulate('click');
    const wrapper = component.find('.spyLip');
    expect(spyauthCheckState).toHaveBeenCalledTimes(2);
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
  it('should click searchtag-button', () => {
    const component = mount(lipList);
    const button = component.find('#Searchmenu');
    button.simulate('click');
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });
  it('should click budget-button', () => {
    const component = mount(lipList);
    const button = component.find('#Budgetmenu');
    button.simulate('click');
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });
  it('should click tonemenu-button', () => {
    const component = mount(lipList);
    const button = component.find('#Tonemenu');
    button.simulate('click');
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });
  it('should click salemenu-button', () => {
    const component = mount(lipList);
    const button = component.find('#Salemenu');
    button.simulate('click');
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });
  it('should change visible category when clicked', () => {
    const component = mount(lipList);
    const newInstance = component.find(Search.WrappedComponent).instance();
    newInstance.setState({ selection: 'lip' });
    const button = component.find('button.Product#base');
    button.simulate('click');
    expect(newInstance.state).toEqual({
      // nickName: 'a',
      // preferBase: '19',
      // preferBrand: '라네즈',
      searched: null,
      // preferColor: 'red',
      call: false,
      selection: 'base',
    });
    button.simulate('click');
    expect(newInstance.state).toEqual({
      // nickName: 'a',
      // preferBase: '19',
      // preferBrand: '라네즈',
      // preferColor: 'red',
      call: false,
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
  it('should call with proper query string', () => {
    const component = mount(lipList, { attachTo: document.body });
    const newInstance = component.find(Search.WrappedComponent).instance();
    newInstance.setState({ selection: 'cheek', searched: 'cheek' });
    const button = component.find('button.Product#cheek');
    button.simulate('click');
    const wrapper = component.find('input.sub-selection-chip');
    wrapper.at(0).simulate('change', { target: { checked: true } });
    wrapper.at(0).instance().checked = true;
    const buttons = component.find('.searchProduct').at(0);
    buttons.simulate('click');
    expect(spygetLips).toHaveBeenLastCalledWith('cheek/color=CHK_RD&');
    component.find('button.Product#lip').simulate('click');
  });
});
