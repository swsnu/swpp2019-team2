import React from 'react';
import { CATEGORY } from './ProductCategory';
import './DetailCategory.css';
import check from '../image/checkmark.png';

class DetailCategory extends React.Component {
  getCategory = (id) => {
    const index = CATEGORY[id];
    const res = Object.keys(index).map((key) => { // key = category, form, color
      if (index[key][0]) { // true : subcategory가 있다
        if (index[key][1] === 'color') { // string 없이 색상 선택으로
          const colorData = index[key][2];
          const colors = Object.keys(colorData).map((colorKey) => {
            // colorKey : Red, Pink, Orange, Purple
            // colorData : {Red: [], Pink: [], Orange: [], Purple: []}
            const subkeyId = `${key}=${colorData[colorKey][0]}&`;
            const subColors = colorData[colorKey][1].map((hex) => {
              const style = { backgroundColor: hex };
              const colorId = `sub_color=${hex.replace('#', '')}&`;
              const onClickColor = (e) => {
                if (e.target.checked) {
                  e.target.nextElementSibling.firstChild.classList.add('on');
                } else {
                  e.target.nextElementSibling.firstChild.classList.remove('on');
                }
              };
              return (
                <label key={hex} htmlFor={colorId} className="color-selection-chip">
                  <input className="color-selection-input-box" onClick={onClickColor} id={colorId} type="checkbox" />
                  <span className="color-circle" style={style}>
                    <img className="checkmark" src={check} alt="" />
                  </span>
                </label>
              );
            });
            const style = { display: 'none' };
            const onClick = (e) => {
              const lb = e.target;
              const styleStr = lb.checked ? 'display:block;' : 'display:none;';
              lb.parentElement.nextElementSibling.style = styleStr;
            };
            return (
              <div key={colorKey} className="page__toggle">
                <label htmlFor={subkeyId} key={colorKey} className="toggle">
                  <input className="toggle__input" onClick={onClick} type="checkbox" value={colorKey} id={subkeyId} />
                  <span className="toggle__label">
                    <span className="toggle__text">{colorKey}</span>
                  </span>
                </label>
                <div style={style} className="sub-color-visual sub-select-container">{subColors}</div>
              </div>
            );
          });
          return (
            <div className="detail-sub-category" key={key}>
              <h4>{key}</h4>
              {colors}
            </div>
          );
        }
        const data = index[key][2];
        const subres = Object.keys(data).map((value) => {
          let xxx = null;
          if (data[value][1].length > 0) {
            const subdata = data[value][1][1];
            xxx = Object.keys(subdata).map((x) => {
              const subKey = `${data[value][1][0]}=${subdata[x]}&`;
              return (
                <label key={subKey} htmlFor={subKey} className="sub-toggle">
                  <input className="sub-toggle__input" type="checkbox" value={x} id={subKey} />
                  <span className="sub-toggle__label">
                    <span className="sub-toggle__text">{x}</span>
                  </span>
                </label>
              );
            });
          }
          const keyId = `${key}=${data[value][0]}&`;
          const style = { display: 'none' };
          const onClick = (e) => {
            const lb = e.target;
            const styleStr = lb.checked ? 'display:block;' : 'display:none;';
            lb.parentElement.nextElementSibling.style = styleStr;
            if (!lb.checked) {
              lb.parentElement.nextElementSibling.querySelectorAll('input').forEach((i) => {
                i.checked = false;
              });
            }
          };
          return (
            <div key={keyId} className="page__toggle">
              <label htmlFor={keyId} className="toggle">
                <input className="toggle__input" onClick={onClick} type="checkbox" value={value} id={keyId} />
                <span className="toggle__label">
                  <span className="toggle__text">{value}</span>
                </span>
              </label>
              <div style={style} className="sub-select-container">{xxx}</div>
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
      } // false : subcategory 없음
      const data = index[key][1]; // object
      const subres = Object.keys(data).map((subkey) => {
        const subkeyId = `${key}=${data[subkey]}&`;
        // subres = 체크박스 1개들의 목록
        return (
          <div key={subkey} className="page__toggle">
            <label htmlFor={subkeyId} className="toggle">
              <input className="toggle__input" type="checkbox" id={subkeyId} />
              <span className="toggle__label">
                <span className="toggle__text">{subkey}</span>
              </span>
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
    });
    return res;
  }

  render() {
    const { category, selected } = this.props;
    const style = selected ? { display: 'block' } : { display: 'none' };
    const sub = this.getCategory(category, selected);
    return (
      <div style={style} className="detail-category" id={category}>
        {sub}
      </div>
    );
  }
}

export default DetailCategory;
