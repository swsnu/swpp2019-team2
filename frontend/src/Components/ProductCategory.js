
export const CATEGORY = {
  lip:{
    category: [
      false, 
      {
        LipStick: 'S',
        LipGloss: 'G',
        LipBalm: 'B',
        Tint: 'T',
      }
    ],
    form: [false,
      {
        Matte: 'M',
        Glossy: 'G',
        None: 'N',
      }
    ],
    color: [true,
      'color',
      {
        Red:['RD',
        [
          '#ff7875',
          '#ff6371',
          '#ff585d',
          '#e03e52',
          '#ef3340',
          '#b83a4b',
          '#ac145a',
          '#990000',
          '#8a1538',
          '#6f263d',
        ]
      ],
      Pink: ['PK', [
        '#ffcae2',
        '#ecc7cd',
        '#fcaebb',
        '#ff8da1',
        '#fb84ba',
        '#f16ab7',
        '#e06287',
        '#f74a83',
        '#e10098',
        '#ec005f',
      ]
    ],
      Orange: ['OR', [
        '#ffbda7',
        '#ffbab3',
        '#ff8d6d',
        '#ff7e71',
        '#ff8b53',
        '#ff9955',
        '#ff870f',
        '#f86627',
        '#fe5000',
        '#e1471a',
      ]],
    }]
  },
  base: {
    category: [
      false, {
        Powder: 'P',
        Cushion: 'CU',
        Concealer: 'C',
        Foundation: 'F',
        Primer: 'PR',
        'BB & CC': 'B',
      }
    ],
    color: [
      false, {
        '19호 이하': 'LT',
        '21호': 'MD',
        '23호 이상': 'DK',
      }
    ],
    subcolor: [
      true,
      'color',
      {
        Warm: ['WM', [
        ]],
        Neutral: ['NT', []],
        Cool: ['CL', []],
      }
    ]
  },
  cheek: {
    category: [
      true,
      'category',
      {
        Blusher: ['B',[
          'color',
          {
            Red: 'RD',
            Pink: 'PK',
            Orange: 'OR'
          }
        ]],
        Contouring: ['C', []],
        Highlighter: ['H', []]
      }
    ],
    xx: [ // for Test
      true,
      'color',
      {
        First: ['WM', [
          '#ff585d',
          '#e03e52',
        ]],
        Second: ['NT', [
          '#f74a83',
        '#e10098',
        ]],
        Third: ['CL', [
          '#ffbda7',
        '#ffbab3',
        ]],
      }

    ]
  },
};

export const CATEGORY_KOREAN = {
  form: '제형',
  category: '카테고리',
  lip: {
    category: {
      S: '립스틱',
      G: '립글로즈',
      B: '립밤',
      T: '틴트',
    },
    form: {
      M: '매트',
      G: '글로시',
      N: '정보없음',
    },
  },
  base: {
    category: {
      P: '파우더',
      CU: '쿠션',
      C: '컨실러',
      F: '파운데이션',
      PR: '프라이머',
      B: 'BB & CC',
    },
  },
};

export const CATEGORY_PRIORITY = {
  category: 0,
  form: 1,
};
/* 

if (key === 'color' && id === 'lip') {
  const colorKeys = Object.keys(index.color);
  const colors = colorKeys.map((colorKey) => {
    const subcolorID = `${key}=${index.color[colorKey][0]}&`;
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
    if (index.color[colorKey].length > 1) return true;
    return false;
  }).map((colorKey) => {
    const colorData = index.color[colorKey];
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

*/