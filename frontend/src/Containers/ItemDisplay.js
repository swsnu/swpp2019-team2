import React from 'react';

const ItemShow = ({ combination }) => {
  let sum = 0;
  for (let i = 0; i < combination.length; i++) {
    sum += combination[i].price;
  }

  return (
    <div>
      {combination.map((item) => (
        <p key={item.name + String(item.price)}>
          {item.name}
          {' '}
          :
          {' '}
          {item.price}
          원
          {' '}
        </p>
      ))}
      <p>
        총
        {' '}
        {sum}
        원
      </p>
      <hr />
    </div>
  );
};

// eslint-disable-next-line arrow-body-style
const ItemDisplay = ({ combinations }) => {
  return (
    <div>
      {combinations.map((c) => (<ItemShow className="ItemShow" combination={c} key={c[0].name + c[1].name} />))}
    </div>
  );
};

export default ItemDisplay;
