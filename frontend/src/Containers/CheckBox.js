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
  { value: 0, label: 'Lip' },
  { value: 1, label: 'Base' },
  { value: 2, label: 'Cheek' },
];

const baseNode = [
  {
    value: '/Base/Category',
    label: 'Category',
    children: [
      {
        value: 'category=BAS_P&',
        label: 'Powder',
      },
      {
        value: 'category=BAS_CU&',
        label: 'Cushion',
      },
      {
        value: 'category=BAS_C&',
        label: 'Concealer',
      },
      {
        value: 'category=BAS_F&',
        label: 'Foundation',
      },
      {
        value: 'category=BAS_PR&',
        label: 'Primer',
      },
      {
        value: 'category=BAS_B&',
        label: 'BB & CC',
      },
    ],
  },
  {
    value: '/Base/Color',
    label: 'Color',
    children: [
      {
        value: 'color=BAS_LT&',
        label: '19호 이하',
      },
      {
        value: 'color=BAS_MD&',
        label: '21호',
      },
      {
        value: 'color=BAS_DK&',
        label: '23호 이상',
      },
    ],
  },
  {
    value: '/Base/SubColor',
    label: 'SubColor',
    children: [
      {
        value: 'subcolor=BAS_WM&',
        label: 'Warm',
      },
      {
        value: 'subcolor=BAS_NT&',
        label: 'Neutral',
      },
      {
        value: 'subcolor=BAS_CL&',
        label: 'Cool',
      },
    ],
  },
];

const cheekNode = [
  {
    value: '/Cheek/Category',
    label: 'Category',
    children: [
      {
        value: 'category=CHK_B&',
        label: 'Blusher',
      },
      {
        value: 'category=CHK_C&',
        label: 'Contouring',
      },
      {
        value: 'category=CHK_H&',
        label: 'Highlighter',
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
        value: 'category=LIP_S&',
        label: 'LipStick',
      },
      {
        value: 'category=LIP_G&',
        label: 'LipGloss',
      },
      {
        value: 'category=LIP_B&',
        label: 'LipBalm',
      },
      {
        value: 'category=LIP_T&',
        label: 'Tint',
      },
    ],
  },
  {
    value: '/Lip/Form',
    label: 'Form',
    children: [
      {
        value: 'form=LIP_M&',
        label: 'Matte',
      },
      {
        value: 'form=LIP_G&',
        label: 'Glossy',
      },
      {
        value: 'form=LIP_N&',
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

  onClick(clicked) {
    this.setState({ clicked });
  }

  onExpand = (expanded) => {
    this.setState({ expanded });
  }

  onCheck(checked) {
    const { findUrl } = this.props;
    const { selected } = this.state;
    let tmpUrl = '';
    if (selected === 0) {
      tmpUrl = 'lip/';
    } else if (selected === 1) {
      tmpUrl = 'base/';
    } else { // (selected === 2)
      tmpUrl = 'cheek/';
    }

    for (let i = 0; i < checked.length; i++) {
      tmpUrl += checked[i];
    }
    findUrl(tmpUrl);
    this.setState({ checked });
  }

  handleSelect = (sel) => {
    this.props.findUrl('');
    this.setState({ expanded: [] });
    this.setState({ checked: [] });
    if (sel !== null) {
      this.setState({ selected: sel.value });
    }
  }

  render() {
    const { checked, expanded, selected } = this.state;
    let node = lipNode;
    switch (selected) {
      case 0: {
        node = lipNode;
        break;
      }
      case 1: {
        node = baseNode;
        break;
      }
      case 2: {
        node = cheekNode;
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
