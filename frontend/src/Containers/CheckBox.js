import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import Select from 'react-select';


const selectOptions = [
  { value: 0, label: 'Face' },
  { value: 1, label: 'Skin' },
  { value: 2, label: 'Lip' },
];

const faceNode = [
  {
    value: '/Face/SkinType',
    label: 'SkinType',
    children: [
      {
        value: 1,
        label: 'Dry',
      },
      {
        value: 2,
        label: 'Oily',
      },
    ],
  },
  {
    value: '/Face/Coverage',
    label: 'Coverage',
    children: [
      {
        value: 3,
        label: 'High',
      },
      {
        value: 4,
        label: 'Medium',
      },
      {
        value: 5,
        label: 'Low',
      },
    ],
  },
];

const skinNode = [
  {
    value: '/Skin/SkinType',
    label: 'SkinType',
    children: [
      {
        value: 6,
        label: 'Dry',
      },
      {
        value: 7,
        label: 'Oily',
      },
    ],
  },
  {
    value: '/Skin/Coverage',
    label: 'Coverage',
    children: [
      {
        value: 8,
        label: 'High',
      },
      {
        value: 9,
        label: 'Medium',
      },
      {
        value: 10,
        label: 'Low',
      },
    ],
  },
];

const lipNode = [
  {
    value: '/Lip/Category',
    label: 'Category',
    children: [
      {
        value: 11,
        label: 'LipStick',
      },
      {
        value: 12,
        label: 'LipGloss',
      },
      {
        value: 13,
        label: 'Tint',
      },
      {
        value: 14,
        label: 'LipBalm',
      },
    ],
  },
  {
    value: '/Lip/Form',
    label: 'Form',
    children: [
      {
        value: 15,
        label: 'Matte',
      },
      {
        value: 16,
        label: 'Glossy',
      },
      {
        value: 17,
        label: 'None',
      },
    ],
  },
];

/* eslint-disable react/jsx-one-expression-per-line */
class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      expanded: [],
      selected: 0,
    };
  }

  onCheck = (checked) => {
    const { findUrl } = this.props;
    findUrl(checked);
    this.setState({ checked });
  }

  onExpand = (expanded) => {
    this.setState({ expanded });
  }

  handleSelect = (sel) => {
    this.props.findUrl('');
    this.setState({ expanded: [] });
    this.setState({ checked: [] });
    this.setState({ selected: sel.value });
  }

  render() {
    const { checked, expanded, selected } = this.state;
    let node = null;
    switch (selected) {
      case 0: {
        node = faceNode;
        break;
      }
      case 1: {
        node = skinNode;
        break;
      }
      case 2: {
        node = lipNode;
        break;
      }
      default: {
        node = null;
      }
    }
    return (
      <div className="clickable-labels">
        <Select
          id="select"
          isClearable
          placeholder="select cosmetic type..."
          options={selectOptions}
          onChange={(sel) => this.handleSelect(sel)}
          defaultValue={selectOptions[0]}
        />
        <CheckboxTree
          id="CheckboxTree"
          checked={checked}
          expanded={expanded}
          nodes={node}
          expandOnClick
          onlyLeafCheckboxes
          onClick={() => { }}
          onCheck={(chk) => this.onCheck(chk)}
          onExpand={(exp) => this.onExpand(exp)}
        />
      </div>
    );
  }
}

export default CheckBox;
