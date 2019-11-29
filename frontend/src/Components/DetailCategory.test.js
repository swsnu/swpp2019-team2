import React from 'react';
import { shallow, mount } from 'enzyme';
import DetailCategory from './DetailCategory';

// <DetailCategory category="lip" selected={(selection === 'lip')} />

describe('<DetailCategory />', () => {
  it('should render without errors', () => {
    const component = shallow(<DetailCategory
      category="lip"
      selected
    />);
    const wrapper = component.find('div.detail-category');
    expect(wrapper.length).toBe(1);
  });

  it('should do when click color category', () => {
    const component = mount(<DetailCategory
      category="lip"
      selected
    />, { attachTo: document.body });
    const wrapper = component.find('input[id="color=RD&"]');
    const subColor = component.find('ul.detail-subcolor-visual#Red');
    wrapper.simulate('click');
    expect(subColor.instance().style.display).toEqual('none');
    wrapper.instance().checked = true;
    wrapper.simulate('click');
    expect(subColor.instance().style.display).toEqual('inline-block');
  });
});
