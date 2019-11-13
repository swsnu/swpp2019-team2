import React from 'react';

const LipForm = (props) => (
  <div className="LipForm">
    <div>


      <section className="id">
        <h4 className="Lip_id">{props.id}</h4>
      </section>

      <section className="thumbnail">
        <img height="200" width="200" src={props.thumbnail} alt="new" />
      </section>

      <section className="name">
        <h4 id="Lip_name">{props.name}</h4>
      </section>


      <section className="price">
        <h4 className="Lip_price">
가격:&emsp;
          {props.price}
원
        </h4>
      </section>

      <section className="category">
        <h4 className="Lip_category">
카테고리:&emsp;
          {props.category}
        </h4>
      </section>

      <section className="category">
        <h4 className="Lip_form">
폼:&emsp;
          {props.form}
        </h4>
      </section>

      <section className="brand">
        <h4 className="Lip_brand">
브랜드:&emsp;
          {props.brand}
        </h4>
      </section>
    </div>
  </div>
);
export default LipForm;
