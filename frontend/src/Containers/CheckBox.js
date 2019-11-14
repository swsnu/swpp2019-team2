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
            value: '/Face/SkinType/Dry',
            label: 'Dry',
          },
          {
            value: '/Face/SkinType/Oily',
            label: 'Oily',
          },
        ],
      },
      {
        value: '/Face/Coverage',
        label: 'Coverage',
        children: [
          {
            value: '/Face/Coverage/High',
            label: 'High',
          },
          {
            value: '/Face/Coverage/Medium',
            label: 'Medium',
          },
          {
            value: '/Face/Coverage/Low',
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
            value: '/Skin/SkinType/Dry',
            label: 'Dry',
          },
          {
            value: '/Skin/SkinType/Oily',
            label: 'Oily',
          },
        ],
      },
      {
        value: '/Skin/Coverage',
        label: 'Coverage',
        children: [
          {
            value: '/Skin/Coverage/High',
            label: 'High',
          },
          {
            value: '/Skin/Coverage/Medium',
            label: 'Medium',
          },
          {
            value: '/Skin/Coverage/Low',
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
            value: '/Lip/Category/LipStick',
            label: 'LipStick',
          },
          {
            value: '/Lip/Category/LiGloss',
            label: 'LipGloss',
          },
          {
            value: '/Lip/Category/Tint',
            label: 'Tink',
          },
          {
            value: '/Lip/Category/LipBalm',
            label: 'LipBalm',
          },
        ],
      },
      {
        value: '/Lip/Form',
        label: 'Form',
        children: [
          {
            value: '/Lip/Form/Matte',
            label: 'Matte',
          },
          {
            value: '/Lip/Form/Glossy',
            label: 'Glossy',
          },
          {
            value: '/Lip/Form/None',
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
    this.onClick = this.onClick.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.state = {
      checked: [],
      expanded: [],
      clicked: {},
    };
  }


  onCheck(checked) {
    this.setState({ checked });
  }

  onClick(clicked) {
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
        <div className="clickable-labels-info">
          <strong>Checked Node</strong>: {checked}
        </div>
      </div>
    );
  }
}

export default CheckBox;
