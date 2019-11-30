import React from 'react';
import { CATEGORY } from './ProductCategory';
import './DetailCategory.css';

class DetailCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getCategory = (id) => {
    const LargeCategory = CATEGORY[id];
    const keys = Object.keys(LargeCategory);
    const res = keys.map((key) => {
      if (key === 'color' && id === 'lip') {
        const colorKeys = Object.keys(LargeCategory.color);
        const colors = colorKeys.map((colorKey) => {
          const subcolorID = `${key}=${LargeCategory.color[colorKey][0]}&`;
          const onClick = (e) => {
            if (e.target.checked) {
              document.querySelector(`ul.detail-subcolor-visual#${e.target.value}`).style = 'display:inline-block;';
            } else { document.querySelector(`ul.detail-subcolor-visual#${e.target.value}`).style = 'display:none;'; }
          };
          return (
            <label className="selectionValue" key={colorKey} htmlFor={subcolorID}>
              {colorKey}
              <input type="checkbox" onClick={onClick} value={colorKey} id={subcolorID} />
            </label>
          );
        });
        const subcolors = colorKeys.filter((colorKey) => {
          if (LargeCategory.color[colorKey].length > 1) return true;
          return false;
        }).map((colorKey) => {
          const colorData = LargeCategory.color[colorKey];
          const detailColors = colorData[1];

          const onClick = (e) => {
            const label = e.target.parentElement;
            const bg = label.style.backgroundColor;
            label.style = e.target.checked
              ? `opacity:40%; background-color:${bg};`
              : `opacity:100%; background-color:${bg};`;
          };
          const detailColorList = detailColors.map((hex) => {
            const style = { backgroundColor: hex };
            const colorId = `sub_color=${hex}&`;
            return (
              <label htmlFor={colorId} className="color-selection-chip" key={hex} style={style}>
                <input onClick={onClick} className="color-selection-input-box" id={colorId} type="checkbox" />
              </label>
            );
          });
          const ulColorKey = `subcolor-${colorData[0]}`;
          const style = { display: 'none' };
          return (<ul key={ulColorKey} className="detail-subcolor-visual" style={style} id={colorKey}>{detailColorList}</ul>);
        });

        return (
          <div className="detail-sub-category" key={key}>
            <div className="detail-sub-color-category">
              <h4>{key}</h4>
              <div>{colors}</div>
            </div>
            <div className="sub-color-visual">{subcolors}</div>
          </div>
        );
      }
      const subkeys = Object.keys(LargeCategory[key]);
      const subres = subkeys.map((subkey) => {
        const subkeyId = `${key}=${LargeCategory[key][subkey]}&`;
        return (
          <label className="selectionValue" key={subkey} htmlFor={subkeyId}>
            {subkey}
            <input type="checkbox" id={subkeyId} />
          </label>
        );
      });
      return (
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
