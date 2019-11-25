
const CATEGORY = {
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
  },
  eye: {
    category: {
      EyeShadow: 'S',
      Mascara: 'M',
      EyeLiner: 'L',
      EyeBrow: 'B',
    },
  },
};

export default CATEGORY;
