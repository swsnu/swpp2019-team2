import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import Select from 'react-select';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare, faSquare, faFolder, faFolderOpen,
  faFile, faChevronRight, faChevronDown, faPlusSquare, faMinusSquare,
} from '@fortawesome/free-solid-svg-icons';

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
        value: 'Alpha',
        label: 'Dry',
      },
      {
        value: 'Beta',
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
    this.onCheck = this.onCheck.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onExpand = this.onExpand.bind(this);

    this.state = {
      checked: [],
      expanded: [],
      clicked: {},
      selected: 0,
    };
  }

  onCheck(checked) {
    const { findUrl } = this.props;
    findUrl(checked);
    this.setState({ checked });
  }

  onClick(clicked) {
    this.setState({ clicked });
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
    let node = faceNode;
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
          className="CheckboxTree"
          checked={checked}
          expanded={expanded}
          nodes={node}
          expandOnClick
          onlyLeafCheckboxes
          onClick={this.onClick}
          onCheck={this.onCheck}
          onExpand={(exp) => this.onExpand(exp)}
          icons={{
            check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon={faCheckSquare} />,
            uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={faSquare} />,
            halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon={faCheckSquare} />,
            expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon={faChevronRight} />,
            expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon={faChevronDown} />,
            expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon={faPlusSquare} />,
            collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon={faMinusSquare} />,
            parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon={faFolder} />,
            parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon={faFolderOpen} />,
            leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon={faFile} />,
          }}
        />
      </div>
    );
  }
}
Select.displayName = 'Select';
CheckboxTree.displayName = 'CheckboxTree';
export default CheckBox;
