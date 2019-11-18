import React from 'react';
import './LipForm.css';

const LipForm = (props) => {
  const {
    imgUrl, name, price, category, brand, form,
  } = props;
  return (
    <li className="LipContainer">
      <div>
        <section className="thumbnail">
          <img height="200" width="200" src={imgUrl} alt="new" />
        </section>
        <section className="name">
          <h4 id="Lip_name">{name}</h4>
        </section>
        <section className="price">
          <h4 className="Lip_price">
가격:&emsp;
            {price}
원
          </h4>
        </section>
        <section className="category">
          <h4 className="Lip_category">
카테고리:&emsp;
            {category}
          </h4>
        </section>
        <section className="category">
          <h4 className="Lip_form">
폼:&emsp;
            {form}
          </h4>
        </section>
        <section className="brand">
          <h4 className="Lip_brand">
브랜드:&emsp;
            {brand}
          </h4>
        </section>
      </div>
    </li>
  );
};
export default LipForm;
