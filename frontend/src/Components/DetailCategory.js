import React from 'react';
import { CATEGORY } from './ProductCategory';
import './DetailCategory.css';

class DetailCategory extends React.Component {
  

  getCategory = (id) => {
    const index = CATEGORY[id];
    const res = Object.keys(index).map((key) => { // key = category, form, color
      if (index[key][0]) { // true : subcategory가 있다
        if (index[key][1] === 'color'){ // string 없이 색상 선택으로
          const colorData = index[key][2];
          const colors = Object.keys(colorData).map((colorKey) => {
            // colorKey : Red, Pink, Orange, Purple
            // colorData : {Red: [], Pink: [], Orange: [], Purple: []}
            const subkeyId = `${key}=${colorData[colorKey][0]}&`;
            const subColors = colorData[colorKey][1].map((hex) => {
              const style = { backgroundColor: hex };
              const colorId = `sub_color=${hex}&`;
              return (
              <label htmlFor={colorId} className="color-selection-chip" key={hex} style={style}>
                  <input className="color-selection-input-box" id={colorId} type="checkbox" />
                </label>
              );
            });
            return(
            <div key={colorKey}>
              <label className="selectionValue" key={colorKey} htmlFor={subkeyId}>
        {colorKey}
        <input type="checkbox" value={colorKey} id={subkeyId}/>
      </label>
      <div className="sub-color-visual">{subColors}</div>
              </div>
              );
          }
          );
          return (
            <div className="detail-sub-category" key={key}>
            <h4>{key}</h4>
            {colors}
          </div>
          );
        } else {
          const data = index[key][2];
          const subres = Object.keys(data).map((value) => {
            let xxx = null;
            if (data[value][1].length > 0) {
              const subdata = data[value][1][1];
              xxx = Object.keys(subdata).map((x) => {
                const subKey = `${data[value][1][0]}=${subdata[x]}&`;
                return (<label key={subKey} htmlFor={subKey}>
                  <input type="checkbox" value={x} id={subKey} />
                  {x}
                </label>)
              })
            }
            const keyId = `${key}=${data[value][0]}&`;
            return (<div key={keyId}>
              <label className="selectionValue" htmlFor={keyId}>
        {value}
        <input type="checkbox" value={value} id={keyId} />
      </label>
              {xxx}</div>)
          });
          
        return (
          // 카테고리면 카테고리 + 그 옵션. 폼 + 그 옵션 
          <div className="detail-sub-category" key={key}>
            <h4>{key}</h4>
            {subres}
          </div>
        );
        }
      } else { // false : subcategory 없음
        const data = index[key][1]; // object
        const subres = Object.keys(data).map((subkey) => {
          const subkeyId = `${key}=${data[subkey]}&`; 
          // subres = 체크박스 1개들의 목록
          return (
          <label className="selectionValue" key={subkey} htmlFor={subkeyId}>
            {subkey}
            <input type="checkbox" id={subkeyId} />
          </label>
          );
        });
        return (
          // 카테고리면 카테고리 + 그 옵션. 폼 + 그 옵션 
          <div className="detail-sub-category" key={key}>
            <h4>{key}</h4>
            {subres}
          </div>
        );
      }
    });
    return res;
  }

  render() {
    const { category, selected } = this.props;
    const style = selected ? { display: 'inline-flex' } : { display: 'none' };
    const sub = this.getCategory(category, selected);
    const { clickSearch } = this.props;
    return (
      <div style={style} className="detail-category" id={category}>
        {sub}
        <button type="button" className="searchProduct" category={category} onClick={clickSearch}> Search </button>
      </div>
    );
  }
}

export default DetailCategory;
