import React from 'react';
import { shallow } from 'enzyme';
import ProductForm from './ProductForm';


describe('<ProductForm />', () => {
  it('should render without errors', () => {
    const component = shallow(<ProductForm
      colors={[{
        color: 'RD',
        color_hex: '#ef3340',
        optionName: 'option',
        sub_color: '#ff7875',
      },
      ]}
      key="key"
      imgUrl="//:0"
      productUrl="//:0"
      name="lip_product1"
      price={10000}
      category="L"
      form="M"
      brand="lip_brand1"
    />);
    const wrapper = component.find('li.ProductContainer');
    expect(wrapper.length).toBe(1);
  });
});
