
export const CATEGORY = {
  lip: {
    category: [
      false,
      {
        LipStick: 'LIP_S',
        LipGloss: 'LIP_G',
        LipBalm: 'LIP_B',
        Tint: 'LIP_T',
      },
    ],
    form: [false,
      {
        Matte: 'LIP_M',
        Glossy: 'LIP_G',
        None: 'LIP_N',
      },
    ],
    color: [true,
      'color',
      {
        Red: ['LIP_RD',
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
          ],
        ],
        Pink: ['LIP_PK', [
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
        ],
        ],
        Orange: ['LIP_OR', [
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
        Purple: ['LIP_PU', [
          '#dacfdd',
          '#c5b4e3',
          '#8b84d7',
          '#d79fbf',
          '#b9578f',
          '#bb29bb',
          '#64307a',
          '#813661',
          '#653165',
          '#3f2a56',
        ],

        ],
      }],
  },
  base: {
    category: [
      false, {
        Powder: 'BAS_P',
        Cushion: 'BAS_CU',
        Concealer: 'BAS_C',
        Foundation: 'BAS_F',
        Primer: 'BAS_PR',
        'BB & CC': 'BAS_B',
      },
    ],
    color: [
      false, {
        '19호 이하': 'BAS_LT',
        '21호': 'BAS_MD',
        '23호 이상': 'BAS_DK',
      },
    ],
    subcolor: [
      true,
      'color',
      {
        Warm: ['BAS_WM', [
        ]],
        Neutral: ['BAS_NT', []],
        Cool: ['BAS_CL', []],
      },
    ],
  },
  cheek: {
    category: [
      true,
      'category',
      {
        Blusher: ['CHK_B', [
          'color',
          {
            Red: 'CHK_RD',
            Pink: 'CHK_PK',
            Orange: 'CHK_OR',
          },
        ]],
        Contouring: ['CHK_C', []],
        Highlighter: ['CHK_H', []],
      },
    ],
  },
};

export const CATEGORY_KOREAN = {
  form: '제형',
  category: '카테고리',
  lip: {
    category: {
      LIP_S: '립스틱',
      LIP_G: '립글로즈',
      LIP_B: '립밤',
      LIP_T: '틴트',
    },
    form: {
      LIP_M: '매트',
      LIP_G: '글로시',
      LIP_N: '없음',
    },
  },
  base: {
    category: {
      BAS_P: '파우더',
      BAS_CU: '쿠션',
      BAS_C: '컨실러',
      BAS_F: '파운데이션',
      BAS_PR: '프라이머',
      BAS_B: 'BB & CC',
    },
  },
  cheek: {
    category: {
      CHK_B: '블러셔',
      CHK_C: '컨투어링',
      CHK_H: '하이라이터',
    },
  },
};

export const CATEGORY_PRIORITY = {
  category: 0,
  form: 1,
};
