/* eslint-disable react/no-array-index-key */
import React from 'react';
import { List } from 'react-virtualized';

// eslint-disable-next-line arrow-body-style
const ItemShow = ({ combination, sum }) => {
  return (
    <div className="budget-search-result">
      <div className="budget-result-product-container">
        {combination.map((item, idx) => {
          if (idx === combination.length - 1) return;
          // eslint-disable-next-line consistent-return
          return (
            <div className="budget-product" key={item.name + String(item.price)}>
              <a target="_blank" rel="noopener noreferrer" className="budgetProductItem" href={item.product_url}>
                <img className="budget-product-image" src={item.img_url} alt="" />
                <p className="budget-product-name">{` ${item.name}`}</p>
                <p className="budget-product-info">{`브랜드 : ${item.brand}`}</p>
                <p className="budget-product-info">{`${item.price} 원`}</p>
              </a>
            </div>
          );
        })}
      </div>
      <p className="budget-container-price">{`총 ${sum} 원`}</p>
    </div>
  );
};

const ItemDisplay = ({ combinations, itemNum }) => {
  if (combinations.length === 0) {
    return (
      <div className="NoResult">
        <h1>No Result!</h1>
      </div>
    );
  }

  return (
    <div className="budget-result-container">
      {combinations.map((c, index) => (<ItemShow className="ItemShow" sum={c[itemNum]} combination={c} key={index} />))}
    </div>
  );
};
List.displayName = 'CombiList';
export default ItemDisplay;
