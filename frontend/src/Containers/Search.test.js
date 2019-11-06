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

const stubSeletedUserT = {
  Lips: [{
    id: 1, name: 'test_name', price: 5000, category: '립스틱', brand: 1, color: 1,
  },
  {
    id: 2, name: 'test_name2', price: 6000, category: '틴트', brand: 1, color: 1,
  }],
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};
const stubStateC = {
  isAuthenticated: false,
};


jest.mock('../Components/LipForm', () => jest.fn((props) => (
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
  Lips: [{
    id: 1, name: 'test_name', price: 5000, category: '립스틱', brand: 1, color: 1,
  },
  {
    id: 2, name: 'test_name2', price: 6000, category: '틴트', brand: 1, color: 1,
  }],
  User: [],
  token: null,
  loading: false,
  error: null,
};
describe('<Liplist />', () => {
  const history = createBrowserHistory();


  let spygetLips;
  let spylogout;
  let spyauthCheckState;
  const mockStore = getMockStore(stubInitState);
  beforeEach(() => {
    spygetLips = jest.spyOn(actions, 'getLips')
      .mockImplementation(() => (dispatch) => {});
    spylogout = jest.spyOn(actions, 'logout')
      .mockImplementation();
    spyauthCheckState = jest.spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
  });
  it('should render Articles', () => {
    const component = mount(
      <Provider store={mockStore}>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => <Search title="Search" {...props} />}
            />
          </Switch>
        </Router>
      </Provider>,
    );
    const wrapper = component.find('.spyLip');
    expect(wrapper.length).toBe(0);
    expect(spygetLips).toBeCalledTimes(1);
  });


  it('should render logout', () => {
    const component = mount(
      <Provider store={mockStore}>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => <Search title="Search" {...props} />}
            />
          </Switch>
        </Router>
      </Provider>,
    );
    const wrapper = component.find('#log-out-button');
    expect(wrapper.length).toBe(1);
    expect(spyauthCheckState).toBeCalledTimes(2);
  });
});


describe('<Search />', () => {
  it('should render correctly', () => {
    const mockonTryAutoSignup = jest.fn();
    const mockononGetLip = jest.fn();
    const component = mount(
      <BrowserRouter>
        <Search.WrappedComponent
          onTryAutoSignup={mockonTryAutoSignup}
          onGetLip={mockononGetLip}
        />
      </BrowserRouter>,
    );

    const wrapper = component.find('.Search');
    expect(wrapper.length).toBe(1);
    expect(mockonTryAutoSignup).toHaveBeenCalledTimes(1);
  });
  it('should go back to main page when clicking button', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#back-button');
    button.simulate('click');
    expect(component.state().back).toBe(true);
  });
  it('should log out when clicking button', () => {
    const mockLogout = jest.fn();
    const mockonTryAutoSignup = jest.fn();
    const component = shallow(
      <Search.WrappedComponent
        Logout={mockLogout}
        onTryAutoSignup={mockonTryAutoSignup}
      />,
    );
    const button = component.find('#log-out-button');
    button.simulate('click');
    expect(mockonTryAutoSignup).toHaveBeenCalledTimes(1);
  });
  it('should handle click_facetag', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_face');
    button.simulate('click');
    expect(component.state().button_face).toBe(true);
  });
  it('should handle click_skintag', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_skin');
    button.simulate('click');
    expect(component.state().button_skin).toBe(true);
  });
  it('should handle click_liptag', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_lip');
    button.simulate('click');
    expect(component.state().button_lip).toBe(true);
  });
  it('should handle click_dry correctly', () => { // dadasdas
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_face');
    button.simulate('click');
    const button2 = component.find('#SkinTypes-dry');
    button2.simulate('click');
    expect(component.state().button_dry).toBe(true);
  });
  it('should handle click_oily correctly', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_face');
    button.simulate('click');
    const button2 = component.find('#SkinTypes-oily');
    button2.simulate('click');
    expect(component.state().button_oily).toBe(true);
  });
  it('should handle click_stick correctly', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_lip');
    button.simulate('click');
    const button2 = component.find('#lip-stick');
    button2.simulate('click');
    expect(component.state().button_lip_stick).toBe(true);
  });
  it('should handle click_gloss correctly', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_lip');
    button.simulate('click');
    const button2 = component.find('#lip-gloss');
    button2.simulate('click');
    expect(component.state().button_lip_gloss).toBe(true);
  });
  it('should handle click_tint correctly', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_lip');
    button.simulate('click');
    const button2 = component.find('#lip-tint');
    button2.simulate('click');
    expect(component.state().button_lip_tint).toBe(true);
  });
  it('should handle click_tone1 correctly', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_face');
    button.simulate('click');
    const button2 = component.find('#SkinTone-1');
    button2.simulate('click');
    expect(component.state().button_tone1).toBe(true);
  });
  it('should handle click_tone2 correctly', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_face');
    button.simulate('click');
    const button2 = component.find('#SkinTone-2');
    button2.simulate('click');
    expect(component.state().button_tone2).toBe(true);
  });
  it('should handle click_high correctly', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_face');
    button.simulate('click');
    const button2 = component.find('#Coverage-high');
    button2.simulate('click');
    expect(component.state().button_high).toBe(true);
  });
  it('should handle click_medium correctly', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_face');
    button.simulate('click');
    const button2 = component.find('#Coverage-medium');
    button2.simulate('click');
    expect(component.state().button_medium).toBe(true);
  });
  it('should handle click_low correctly', () => {
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_face');
    button.simulate('click');
    const button2 = component.find('#Coverage-low');
    button2.simulate('click');
    expect(component.state().button_low).toBe(true);
  });
  it('should not search if tag is chosed1', () => {
    const component = shallow(<Search.WrappedComponent props={stubInitState} />);
    const button = component.find('#Category_lip');
    button.simulate('click');
    const button2 = component.find('#lip-stick');
    button2.simulate('click');
    const button3 = component.find('#SkinTone-1');
    button3.simulate('click');
    expect(component.state().search_init).toBe(false);
  });
  it('should not search if tag is chosed2', () => {
    const history = createBrowserHistory();
    const mockStore = getMockStore(stubInitState);
    const mockonTryAutoSignup = jest.fn();
    const mockononGetLip = jest.fn();
    const component = shallow(<Search.WrappedComponent />);
    const button = component.find('#Category_lip');
    button.simulate('click');
    const button2 = component.find('#lip-tint');
    button2.simulate('click');
    const button3 = component.find('#SkinTone-2');
    button3.simulate('click');

    expect(component.state().button_lip_tint).toBe(true);
  });
});

describe('<Liplist />', () => {
  const history = createBrowserHistory();

  let spygetLips;
  let spylogout;
  let spyauthCheckState;
  const mockStore = getMockStore(stubInitState);
  beforeEach(() => {
    spygetLips = jest.spyOn(actions, 'getLips')
      .mockImplementation(() => (dispatch) => {});
    spylogout = jest.spyOn(actions, 'logout')
      .mockImplementation();
    spyauthCheckState = jest.spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
  });
  it('should render Articles', () => {
    const component = mount(
      <Provider store={mockStore}>
        <Router history={history}>
          <Switch>
            <Route
              path="/"
              render={(props) => <Search title="Search" {...props} />}
            />
          </Switch>
        </Router>
      </Provider>,
    );
  });
  it('should not redirect stay when logged in', () => {
    const component = shallow(
      <Search.WrappedComponent isAuthenticated={stubStateC} />,
    );
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });
});


describe('<Search/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render and call getUser,getUsers', () => {
    const spyGetUser = jest
      .spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    const mockStore = getMockStore(stubStateC);

    const component = mount(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Search selectedUser={stubSeletedUserT} />
        </BrowserRouter>
      </Provider>,
    );
  });
  it('should call logoutHandler when clicking logout button', () => {
    const spyGetUser = jest
      .spyOn(actions, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    const spyLogout = jest
      .spyOn(actions, 'logout')
      .mockImplementation(() => (dispatch) => {});
    const mockUserLogOut = jest.fn();
    const mockOnGetUser = jest.fn();
    const component = shallow(
      <Search.WrappedComponent
        onTryAutoSignup={spyGetUser}
        Logout={spyLogout}
      />,
    );
    const button = component.find('#log-out-button');
    button.simulate('click');
    expect(spyLogout).toHaveBeenCalledTimes(1);
  });
});
