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
            const style = {display:'none'};
            const onClick = (e) => {
              const lb = e.target;
              const styleStr = lb.checked? 'display:block;' : 'display:none;';
              lb.parentElement.nextElementSibling.style = styleStr;
            }
            return(
            <div key={colorKey} className="select-container">
              <label className="selectionValue" key={colorKey} htmlFor={subkeyId}>
        {colorKey}
        <input type="checkbox" onClick={onClick} value={colorKey} id={subkeyId}/>
      </label>
      <div style={style} className="sub-color-visual sub-select-container">{subColors}</div>
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
                return (<label className="sub-selection-chip" key={subKey} htmlFor={subKey}>
                  <input className="sub-selection-chip" type="checkbox" value={x} id={subKey} />
                  {x}
                </label>)
              })
            }
            const keyId = `${key}=${data[value][0]}&`;
            const style = {display:'none'};
            const onClick = (e) => {
              const lb = e.target;
              const styleStr = lb.checked? 'display:block;' : 'display:none;';
              lb.parentElement.nextElementSibling.style = styleStr;
              if (!lb.checked){
                lb.parentElement.nextElementSibling.querySelectorAll("input").forEach(i => {
                  i.checked = false;
                });
              }
            }
            return (<div className="select-container" key={keyId}>
              <label className="selectionValue" htmlFor={keyId}>
        {value}
        <input type="checkbox" onClick={onClick} value={value} id={keyId} />
      </label>
      <div style={style} className="sub-select-container">{xxx}</div>
              </div>)
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
            <div key={subkey} className="select-container">
          <label className="selectionValue" htmlFor={subkeyId}>
            {subkey}
            <input type="checkbox" id={subkeyId} />
          </label>
          </div>
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
    const style = selected ? { display: 'block' } : { display: 'none' };
    const sub = this.getCategory(category, selected);
    const { clickSearch } = this.props;
    return (
      <div style={style} className="detail-category" id={category}>
        <button type="button" className="searchProduct" category={category} onClick={clickSearch}> Search </button>
        {sub}
      </div>
    );
  }
}

export default DetailCategory;
