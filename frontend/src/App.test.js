import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

const mockStore = getMockStore({ Articles : [], selectedArticle:null,
    Comments : [], selectedComment:null,
    Users : [], selectedUser: null,});


describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history}/>
      </Provider>
    )
  });

  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });

});