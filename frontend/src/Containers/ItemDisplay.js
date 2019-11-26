import React from 'react';

const ItemShow = ({ combination }) => {
  let sum = 0;
  for (let i = 0; i < combination.length; i++) {
    sum += combination[i].price;
  }
  const relativeWidth = 165 * (5 / combination.length);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {combination.map((item) => (
          <div key={item.name + String(item.price)} style={{ backgroundColor: '#EEEFFF', borderRadius: 8, padding: 5 }}>
            <div style={{ height: relativeWidth, width: relativeWidth, backgroundColor: '#EFEFEF' }}><h2>thumbnail</h2></div>
            <p>
              이름 :
              {' '}
              {item.name}
            </p>
            <p>브랜드 : dummy</p>
            <p>
              가격:
              {' '}
              {item.price}
            </p>
          </div>
        ))}
      </div>
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
  if (combinations.length === 0) {
    return (
      <div>
        <h1>No Result!</h1>
      </div>
    );
  }
  return (
    <div>
      {combinations.map((c) => (<ItemShow className="ItemShow" combination={c} key={c[0].name + c[1].name} />))}
    </div>
  );
};

export default ItemDisplay;
