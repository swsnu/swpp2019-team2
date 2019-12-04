import React from 'react';
import './ProductForm.css';
import Tooltip from 'react-tooltip-lite';
import { CATEGORY_KOREAN, CATEGORY_PRIORITY } from './ProductCategory';

/* const getKeyByValue = (object, value) => Object.keys(
  object).find((key) => object[key] === value
  ); */


const getColorOptionList = (colors) => {
  const subcolor = colors.map((color) => {
    const style = { backgroundColor: color.color_hex };
    return (<li className="color-chip" key={color.optionName}><Tooltip key={color.optionName} content={color.optionName}><span data-tip={color.optionName} key={color.optionName} className="color-chip" style={style} /></Tooltip></li>);
  });
  return subcolor;
};


const getOptionalInfo = (info, selection) => {
  const essentialInfo = ['name', 'brand', 'id', 'color', 'img_url', 'product_url', 'price'];
  const category = Object.keys(info).filter((x) => !essentialInfo.includes(x));
  category.sort((a, b) => {
    if (CATEGORY_PRIORITY[a] > CATEGORY_PRIORITY[b]) return 1;
    return -1;
  });
  const optionalInfo = category.map((cg) => {
    const categoryInfo = CATEGORY_KOREAN[selection][cg];
    return (
      <section key={`${info.id}_${cg}`} className="info_text">
        {`${CATEGORY_KOREAN[cg]} : ${categoryInfo[info[cg]]} `}
      </section>
    );
  });
  return optionalInfo;
};

const ProductForm = (props) => {
  let subcolor = null;
  const { info, selection } = props;
  if (Object.prototype.hasOwnProperty.call(info, 'color')) {
    subcolor = getColorOptionList(info.color);
  }

  const optionalInfo = getOptionalInfo(info, selection);
  return (
    <li className="ProductContainer">
      <a target="_blank" rel="noopener noreferrer" className="productItem" href={info.product_url}>
        <section className="thumbnail">
          <img height="200" width="200" src={info.img_url} alt="" />
        </section>
        <section className="info_text info_name">
          {info.name}
          {' / '}
          {info.brand}
        </section>
        <section className="info_text">
          가격 :
          {` ${info.price} `}
원
        </section>
        {optionalInfo}
        <section className="color">
          <ul>{subcolor}</ul>
        </section>
      </a>
    </li>

  );
};
export default ProductForm;
