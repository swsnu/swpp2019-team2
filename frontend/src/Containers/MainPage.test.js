/* eslint-disable no-unused-vars */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { getMockStore } from '../Mocks/mocks';
import MainPage from './MainPage';
import * as actionCreators from '../store/actions/cosmos';

const history = createBrowserHistory();
const stubSeletedUserF = {
  id: '7',
  logged_in: false,
};
const stubSeletedUserT = {
  id: '7',
  logged_in: true,
};
const stubStateC = {
  Users: [],
  isAuthenticated: false,
};
describe('<MainPage/>', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render and call getUser,getUsers', () => {
    const spyGetUser = jest
      .spyOn(actionCreators, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    const mockStore = getMockStore(stubStateC);

    const component = mount(
      <Provider store={mockStore}>
        <BrowserRouter history={history}>
          <MainPage selectedUser={stubSeletedUserT} />
        </BrowserRouter>
      </Provider>,
    );
    expect(spyGetUser).toHaveBeenCalledTimes(1);
  });
  it('should not set state id when user is not logged in', () => {
    const spyGetUser = jest
      .spyOn(actionCreators, 'authCheckState')
      .mockImplementation(() => (dispatch) => {});
    const mockStore = getMockStore(stubStateC);
    const mockOnGetUser = jest.fn();
    const component = mount(
      <Provider store={mockStore}>
        <BrowserRouter history={history}>
          <MainPage selectedUser={stubSeletedUserT} />
        </BrowserRouter>
      </Provider>,
    );
    expect(spyGetUser).toHaveBeenCalledTimes(1);
  });
  it('should render', () => {
    const component = shallow(<MainPage.WrappedComponent />);
    const wrapper = component.find('.MainPage');
    expect(wrapper.length).toBe(1);
  });
  it('should redirect to login page when not logged in', () => {
    const component = shallow(
      <MainPage.WrappedComponent selectedUser={stubSeletedUserF} />,
    );
    const redirect = component.find('Redirect');
    expect(redirect.props().to).toEqual('/login');
  });
  it('should not redirect stay when logged in', () => {
    const component = shallow(
      <MainPage.WrappedComponent selectedUser={stubSeletedUserT} />,
    );
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(1);
  });
  it('should redirect stay when logged in', () => {
    const component = shallow(
      <MainPage.WrappedComponent isAuthenticated={stubStateC} />,
    );
    const redirect = component.find('Redirect');
    expect(redirect.length).toBe(0);
  });
  it('should call searchHandler when clicking search tag button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = shallow(<MainPage.WrappedComponent history={history} />);
    const button = component.find('#search-tag');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../search');
  });
  it('should call budgetHandler when clicking budget search button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = shallow(<MainPage.WrappedComponent history={history} />);
    const button = component.find('#budget-search');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../budget');
  });
  it('should call toneHandler when clicking tone analysis button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = shallow(<MainPage.WrappedComponent history={history} />);
    const button = component.find('#tone-analysis');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../skintone');
  });
  it('should call saleHandler when clicking sale information button', () => {
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = shallow(<MainPage.WrappedComponent history={history} />);
    const button = component.find('#sale-information');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../sale');
  });
  it('should call mypageHandler when clicking mypage button', () => {
    const mockStore = getMockStore(stubStateC);
    const spyHistoryReplace = jest
      .spyOn(history, 'replace')
      .mockImplementation(() => {});
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <MainPage selectedUser={stubSeletedUserT} history={history} />
        </ConnectedRouter>
      </Provider>,
    );
    const button = component.find('#my-page-button');
    button.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledWith('../mypage/');
  });

  it('should call logoutHandler when clicking logout button', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {});
    const mockUserLogOut = jest.fn();
    const mockOnGetUser = jest.fn();
    const component = shallow(
      <MainPage.WrappedComponent
        onTryAutoSignup={mockOnGetUser}
        Logout={mockUserLogOut}
        history={history}
      />,
    );
    const button = component.find('#log-out-button');
    button.simulate('click');
    expect(mockUserLogOut).toHaveBeenCalledTimes(1);
  });
  it('should have no case that can see logout button without user logged in', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(() => {});
    const mockUserLogOut = jest.fn();
    const mockOnGetUser = jest.fn();
    const component = shallow(
      <MainPage.WrappedComponent
        selectedUser={null}
        onTryAutoSignup={mockOnGetUser}
        Logout={mockUserLogOut}
        history={history}
      />,
    );
    const button = component.find('#log-out-button');
    button.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(0);
  });
  it('should call logoutHandler when clicking logout button', () => {
    const spyPutUser = jest
      .spyOn(actionCreators, 'logout')
      .mockImplementation((user) => (dispatch) => {});
    const mockStore = getMockStore(stubStateC);

    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <MainPage selectedUser={stubSeletedUserT} />
        </ConnectedRouter>
      </Provider>,
    );

    const button = component.find('#log-out-button');
    button.simulate('click');

    expect(spyPutUser).toHaveBeenCalledTimes(1);
  });
});
