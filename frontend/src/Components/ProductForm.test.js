import React from 'react';
import { shallow } from 'enzyme';
import ProductForm from './ProductForm';


describe('<ProductForm />', () => {
  it('should render without errors', () => {
    const res = {
      brand: 'product_brand1',
      category: 'T',
      form: 'S',
      id: 120,
      img_url: '//:0',
      product_url: '//:0',
      price: 10000,
      name: 'product_name1',
      color: [{
        color: 'RD',
        color_hex: '#791c2c',
        optionName: 'colorOptionName',
        sub_color: '#6f263d',

      }],
    };
    const component = shallow(<ProductForm
      selection="lip"
      key={120}
      info={res}
    />);
    const wrapper = component.find('li.ProductContainer');
    expect(wrapper.length).toBe(1);
  });
  it('should render correctly without color option', () => {
    const res = {
      brand: 'product_brand1',
      category: 'T',
      form: 'S',
      id: 120,
      img_url: '//:0',
      product_url: '//:0',
      price: 10000,
      name: 'product_name1',
    };
    const component = shallow(<ProductForm
      selection="lip"
      key={120}
      info={res}
    />);
    const wrapper = component.find('section.info_text');
    expect(wrapper.length).toBe(4);
  });
});
