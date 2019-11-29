import React from 'react';
import './LipForm.css';
import Tooltip from 'react-tooltip-lite';
import CATEGORY from './ProductCategory';

const getKeyByValue = (object, value) => Object.keys(object).find((key) => object[key] === value);

const LipForm = (props) => {
  const {
    imgUrl, name, price, category, brand, form, colors, productUrl,
  } = props;
  const subcolor = colors.map((color) => {
    const style = { backgroundColor: color.color_hex };
    return (<li className="color-chip" key={color.optionName}><Tooltip key={color.optionName} content={color.optionName}><span data-tip={color.optionName} key={color.optionName} className="color-chip" style={style} /></Tooltip></li>);
  });
  const realCategory = getKeyByValue(CATEGORY.lip.category, category);
  const realForm = getKeyByValue(CATEGORY.lip.form, form);
  return (
    <li className="LipContainer">
      <a target="_blank" rel="noopener noreferrer" className="productItem" href={productUrl}>
        <section className="thumbnail">
          <img height="200" width="200" src={imgUrl} alt="new" />
        </section>
        <section className="Lip_name info_text">
          {name}
          {' / '}
          {brand}
        </section>
        <section className="color">
          <ul>{subcolor}</ul>
        </section>
        <section className="Lip_price info_text">
가격:&emsp;
          {price}
원
        </section>
        <section className="Lip_category info_text">
카테고리:&emsp;
          {realCategory}
        </section>
        <section className="Lip_form info_text">
제형:&emsp;
          {realForm}
        </section>
      </a>
    </li>

  );
};
export default LipForm;
