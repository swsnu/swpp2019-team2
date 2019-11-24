import React from 'react';
import CATEGORY from './ProductCategory';
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
    return (
      <div style={style} className="detail-category" id={category}>{sub}
        <h4><button type="button" className="searchProduct" onClick={this.props.clickSearch}> Search </button></h4>
      </div>
    );
  }
}

export default DetailCategory;
