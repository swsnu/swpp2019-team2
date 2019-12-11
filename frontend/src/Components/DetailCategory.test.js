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

  it('should do when click sub-color category', () => {
    const component = mount(<DetailCategory
      category="lip"
      selected
    />, { attachTo: document.body });
    const wrapper = component.find('input[id="color=LIP_RD&"]');
    const subColor = component.find('div.sub-color-visual').at(0);
    wrapper.simulate('click');
    expect(subColor.instance().style.display).toEqual('none');
    wrapper.instance().checked = true;
    wrapper.simulate('click');
    expect(subColor.instance().style.display).toEqual('block');
    wrapper.simulate('click');
    const subColorIn = component.find('input.color-selection-input-box').at(0);
    subColorIn.simulate('click');
    subColorIn.instance().checked = true;
    subColorIn.simulate('click');
    component.detach();
  });
});


describe('<DetailCategory />', () => {
  it('should do when click sub-color category', () => {
    const component = mount(<DetailCategory
      category="cheek"
      selected
    />, { attachTo: document.body });
    const wrapper = component.find('input[id="category=CHK_B&"]');
    const subColor = component.find('.detail-category#cheek .sub-select-container').at(0);
    wrapper.simulate('click');
    expect(subColor.instance().style.display).toEqual('none');
    wrapper.instance().checked = true;
    wrapper.simulate('click');
    expect(subColor.instance().style.display).toEqual('block');
    wrapper.simulate('click');
  });
});
