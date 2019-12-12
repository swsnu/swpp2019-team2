/* eslint-disable react/no-array-index-key */
import React from 'react';
import { List } from 'react-virtualized';

// eslint-disable-next-line arrow-body-style
const ItemDisplay = ({ combinations }) => {
  const ItemShow = ({ index }) => {
    const combination = combinations[index];
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
              <img height={relativeWidth} width={relativeWidth} src={item.img_url} alt="" />
              <p>
                이름 :
                {' '}
                {item.name}
              </p>
              <p>
                브랜드 :
                {' '}
                {item.brand}
              </p>
              <p>
                가격:
                {' '}
                {item.price}
                원
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

  if (combinations.length === 0) {
    return (
      <div className="NoResult">
        <h1>No Result!</h1>
      </div>
    );
  }

  return (
    <List
      className="CombinationList"
      width={980}
      height={480}
      rowCount={combinations.length}
      rowHeight={558}
      rowRenderer={ItemShow}
      list={combinations}
      style={{ outline: 'none', backgroundColor: '#FCFCFC' }}
    />
  );
};

export default ItemDisplay;


/*


  return (
    <div>
  {combinations.map((c, index) => (<ItemShow className="ItemShow" combination={c} key={index} />))}
    </div>
  );
*/
