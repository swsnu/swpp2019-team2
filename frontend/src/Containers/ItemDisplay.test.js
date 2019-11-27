import React from 'react';
import { mount } from 'enzyme';
import ItemDisplay from './ItemDisplay';

const mockCombinations = [
  [{ name: 'a1', price: 10 }, { name: 'a2', price: 20 }],
  [{ name: 'b1', price: 30 }, { name: 'b2', price: 40 }],
];

describe('<ItemDisplay />', () => {
  it('should render without error', () => {
    const component = mount(<ItemDisplay combinations={mockCombinations} />);
    const wrapper = component.find('.ItemShow');
    expect(wrapper.length).toBe(2);
  });

  it('should render no result page when there is no result', () => {
    const component = mount(<ItemDisplay combinations={[]} />);
    const wrapper = component.find('.NoResult');
    expect(wrapper.length).toBe(1);
  });
});
