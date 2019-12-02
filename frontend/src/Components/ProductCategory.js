
export const CATEGORY = {
  lip: {
    category: {
      LipStick: 'S',
      LipGloss: 'G',
      LipBalm: 'B',
      Tint: 'T',
    },
    form: {
      Matte: 'M',
      Glossy: 'G',
      None: 'N',
    },
    color: {
      Red: ['RD', [
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
      ]],
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
      ]],
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
    },
  },
  base: {
    category: {
      Powder: 'P',
      Cushion: 'CU',
      Concealer: 'C',
      Foundation: 'F',
      Primer: 'PR',
      'BB & CC': 'B',
    },
    color: {
      '19호 이하': 'LT',
      '21호': 'MD',
      '23호 이상': 'DK',
    },
    subcolor: {
      Warm: 'WM',
      Neutral: 'NT',
      Cool: 'CL',
    },
  },
  cheek: {
    color: {
      Red: ['RD'],
      Pink: ['PK'],
      Orange: ['OR'],
    },
    form: {
      Powder: 'P',
      Liquid: 'L',
      Cream: 'C',
    },
  },
  skincare: {
    category: {
      Skin: 'SK',
      Lotion: 'LO',
      Essence: 'ES',
      Cream: 'CR',
      Eyecream: 'EC',
      Mist: 'MI',
      Suncare: 'SU',
      Specialcare: 'SP',
    },
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
