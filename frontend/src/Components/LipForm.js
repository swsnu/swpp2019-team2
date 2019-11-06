import React from 'react';

const LipForm = (props) => (
  <div className="LipForm">
    <div>


      <section className="Index">
        <h4 className="Lip_id">{props.id}</h4>
      </section>

      <section className="Index6">
        <img height="200" width="200" src={props.thumbnail} alt="new" />
      </section>

      <section className="Index1">
        <h4 id="Lip_name">{props.name}</h4>
      </section>


      <section className="Index2">
        <h4 className="Lip_price">
가격:&emsp;
          {props.price}
원
        </h4>
      </section>

      <section className="Index3">
        <h4 className="Lip_category">
카테고리:&emsp;
          {props.category}
        </h4>
      </section>

      <section className="Index4">
        <h4 className="Lip_brand">
브랜드:&emsp;
          {props.brand}
        </h4>
      </section>

      <section className="Index5">
        <h4 className="Lip_color">{props.color}</h4>
      </section>


    </div>
  </div>
);
export default LipForm;
