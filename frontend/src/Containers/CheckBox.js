import React from 'react';
import CheckboxTree from 'react-checkbox-tree';

const nodes = [
  {
    value: '/Face',
    label: 'Face',
    children: [
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
    ],
  },
  {
    value: '/Skin',
    label: 'Skin',
    children: [
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
    ],
  },
  {
    value: '/Lip',
    label: 'Lip',
    children: [
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
    ],
  },
];

/* eslint-disable react/jsx-one-expression-per-line */
class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state = {
      checked: [],
      expanded: [],
      clicked: {},
    };
  }

  onCheck(checked) {
    const { findUrl } = this.props;
    findUrl(checked);
    this.setState({ checked });
  }

  onClick(clicked) {
    if (clicked.isLeaf) {
      const { checked } = this.state;
      checked.push(clicked.value);
    }
    this.setState({ clicked });
  }

  onExpand(expanded) {
    this.setState({ expanded });
  }

  render() {
    const { checked, expanded } = this.state;

    return (
      <div className="clickable-labels">
        <CheckboxTree
          id="CheckboxTree"
          checked={checked}
          expanded={expanded}
          nodes={nodes}
          expandOnClick
          onlyLeafCheckboxes
          onCheck={this.onCheck}
          onClick={this.onClick}
          onExpand={this.onExpand}
        />
      </div>
    );
  }
}

export default CheckBox;
