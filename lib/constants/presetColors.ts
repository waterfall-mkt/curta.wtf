import type { FlagColorConfig } from '@/lib/types/protocol';

export type FlagPresetColorConfig = FlagColorConfig & {
  name: string;
};

export const PRESET_FLAG_COLOR_CONFIGS: FlagPresetColorConfig[] = [
  {
    name: 'Waterfall',
    border: '#27303D',
    bg: '#181E28',
    text: '#F0F6FC',
    subtext: '#94A3B3',
    canvas: '#181E28',
  },
  {
    name: 'Nord',
    border: '#5E81AC',
    bg: '#2E3440',
    text: '#E5E9F0',
    subtext: '#D8DEE9',
    canvas: '#2E3440',
  },
  {
    name: 'dark_note',
    bg: '#1f1f1f',
    canvas: '#1f1f1f',
    border: '#f2c17b',
    subtext: '#768f95',
    text: '#d2dff4',
  },
  {
    name: 'viridescent',
    bg: '#2c3333',
    canvas: '#2c3333',
    border: '#95d5b2',
    subtext: '#84a98c',
    text: '#e9f5db',
  },
  {
    name: 'dark',
    bg: '#111',
    canvas: '#111',
    border: '#eee',
    subtext: '#444',
    text: '#eee',
  },
  {
    name: 'muted',
    bg: '#525252',
    canvas: '#525252',
    border: '#c5b4e3',
    subtext: '#939eae',
    text: '#b1e4e3',
  },
  {
    name: 'dark_magic_girl',
    bg: '#091f2c',
    canvas: '#091f2c',
    border: '#f5b1cc',
    subtext: '#93e8d3',
    text: '#a288d9',
  },
  {
    name: '8008',
    bg: '#333a45',
    canvas: '#333a45',
    border: '#f44c7f',
    subtext: '#939eae',
    text: '#e9ecf0',
  },
  {
    name: 'carbon',
    bg: '#313131',
    canvas: '#313131',
    border: '#f66e0d',
    subtext: '#616161',
    text: '#f5e6c8',
  },
  {
    name: 'our_theme',
    bg: '#ce1226',
    canvas: '#ce1226',
    border: '#fcd116',
    subtext: '#6d0f19',
    text: '#ffffff',
  },
  {
    name: 'dots',
    bg: '#121520',
    canvas: '#121520',
    border: '#fff',
    subtext: '#676e8a',
    text: '#fff',
  },
  {
    name: 'nautilus',
    bg: '#132237',
    canvas: '#132237',
    border: '#ebb723',
    subtext: '#0b4c6c',
    text: '#1cbaac',
  },
  {
    name: 'serika',
    bg: '#e1e1e3',
    canvas: '#e1e1e3',
    border: '#e2b714',
    subtext: '#aaaeb3',
    text: '#323437',
  },
  {
    name: 'serika_dark',
    bg: '#323437',
    canvas: '#323437',
    border: '#e2b714',
    subtext: '#646669',
    text: '#d1d0c5',
  },
  {
    name: 'bushido',
    bg: '#242933',
    canvas: '#242933',
    border: '#ec4c56',
    subtext: '#596172',
    text: '#f6f0e9',
  },
  {
    name: 'red_samurai',
    bg: '#84202c',
    canvas: '#84202c',
    border: '#c79e6e',
    subtext: '#55131b',
    text: '#e2dad0',
  },
  {
    name: 'rgb',
    bg: '#111',
    canvas: '#111',
    border: '#eee',
    subtext: '#444',
    text: '#eee',
  },
  {
    name: 'oblivion',
    bg: '#313231',
    canvas: '#313231',
    border: '#a5a096',
    subtext: '#5d6263',
    text: '#f7f5f1',
  },
  {
    name: 'magic_girl',
    bg: '#ffffff',
    canvas: '#ffffff',
    border: '#f5b1cc',
    subtext: '#93e8d3',
    text: '#00ac8c',
  },
  {
    name: 'metropolis',
    bg: '#0f1f2c',
    canvas: '#0f1f2c',
    border: '#56c3b7',
    subtext: '#326984',
    text: '#e4edf1',
  },
  {
    name: 'mountain',
    bg: '#0f0f0f',
    canvas: '#0f0f0f',
    border: '#e7e7e7',
    subtext: '#4c4c4c',
    text: '#e7e7e7',
  },
  {
    name: 'laser',
    bg: '#221b44',
    canvas: '#221b44',
    border: '#009eaf',
    subtext: '#b82356',
    text: '#dbe7e8',
  },
  {
    name: 'retro',
    bg: '#dad3c1',
    canvas: '#dad3c1',
    border: '#1d1b17',
    subtext: '#918b7d',
    text: '#1d1b17',
  },
  {
    name: 'dracula',
    bg: '#282a36',
    canvas: '#282a36',
    border: '#f2f2f2',
    subtext: '#bd93f9',
    text: '#f2f2f2',
  },
  {
    name: 'nord',
    bg: '#242933',
    canvas: '#242933',
    border: '#d8dee9',
    subtext: '#617b94',
    text: '#d8dee9',
  },
  {
    name: 'mr_sleeves',
    bg: '#d1d7da',
    canvas: '#d1d7da',
    border: '#daa99b',
    subtext: '#9a9fa1',
    text: '#1d1d1d',
  },
  {
    name: 'olivia',
    bg: '#1c1b1d',
    canvas: '#1c1b1d',
    border: '#deaf9d',
    subtext: '#4e3e3e',
    text: '#f2efed',
  },
  {
    name: 'bliss',
    bg: '#262727',
    canvas: '#262727',
    border: '#f0d3c9',
    subtext: '#665957',
    text: '#fff',
  },
  {
    name: 'mizu',
    bg: '#afcbdd',
    canvas: '#afcbdd',
    border: '#fcfbf6',
    subtext: '#85a5bb',
    text: '#1a2633',
  },
  {
    name: 'metaverse',
    bg: '#232323',
    canvas: '#232323',
    border: '#d82934',
    subtext: '#5e5e5e',
    text: '#e8e8e8',
  },
  {
    name: 'shadow',
    bg: '#000',
    canvas: '#000',
    border: '#eee',
    subtext: '#444',
    text: '#eee',
  },
  {
    name: 'mint',
    bg: '#05385b',
    canvas: '#05385b',
    border: '#5cdb95',
    subtext: '#20688a',
    text: '#edf5e1',
  },
  {
    name: 'miami',
    bg: '#f35588',
    canvas: '#f35588',
    border: '#05dfd7',
    subtext: '#94294c',
    text: '#f0e9ec',
  },
  {
    name: 'miami_nights',
    bg: '#18181a',
    canvas: '#18181a',
    border: '#e4609b',
    subtext: '#47bac0',
    text: '#fff',
  },
  {
    name: 'modern_dolch',
    bg: '#2d2e30',
    canvas: '#2d2e30',
    border: '#7eddd3',
    subtext: '#54585c',
    text: '#e3e6eb',
  },
  {
    name: 'botanical',
    bg: '#7b9c98',
    canvas: '#7b9c98',
    border: '#eaf1f3',
    subtext: '#495755',
    text: '#eaf1f3',
  },
  {
    name: '9009',
    bg: '#eeebe2',
    canvas: '#eeebe2',
    border: '#080909',
    subtext: '#99947f',
    text: '#080909',
  },
  {
    name: 'bingsu',
    bg: '#b8a7aa',
    canvas: '#b8a7aa',
    border: '#83616e',
    subtext: '#48373d',
    text: '#ebe6ea',
  },
  {
    name: 'terminal',
    bg: '#191a1b',
    canvas: '#191a1b',
    border: '#79a617',
    subtext: '#48494b',
    text: '#e7eae0',
  },
  {
    name: 'lavender',
    bg: '#ada6c2',
    canvas: '#ada6c2',
    border: '#e4e3e9',
    subtext: '#e4e3e9',
    text: '#2f2a41',
  },
  {
    name: 'taro',
    bg: '#b3baff',
    canvas: '#b3baff',
    border: '#130f1a',
    subtext: '#6f6c91',
    text: '#130f1a',
  },
  {
    name: 'striker',
    bg: '#124883',
    canvas: '#124883',
    border: '#d7dcda',
    subtext: '#0f2d4e',
    text: '#d6dbd9',
  },
  {
    name: 'gruvbox_dark',
    bg: '#282828',
    canvas: '#282828',
    border: '#d79921',
    subtext: '#665c54',
    text: '#ebdbb2',
  },
  {
    name: 'gruvbox_light',
    bg: '#fbf1c7',
    canvas: '#fbf1c7',
    border: '#689d6a',
    subtext: '#a89984',
    text: '#3c3836',
  },
  {
    name: 'monokai',
    bg: '#272822',
    canvas: '#272822',
    border: '#a6e22e',
    subtext: '#e6db74',
    text: '#e2e2dc',
  },
  {
    name: 'sonokai',
    bg: '#2c2e34',
    canvas: '#2c2e34',
    border: '#9ed072',
    subtext: '#e7c664',
    text: '#e2e2e3',
  },
  {
    name: 'camping',
    bg: '#faf1e4',
    canvas: '#faf1e4',
    border: '#618c56',
    subtext: '#c2b8aa',
    text: '#3c403b',
  },
  {
    name: 'voc',
    bg: '#190618',
    canvas: '#190618',
    border: '#e0caac',
    subtext: '#4c1e48',
    text: '#eeeae4',
  },
  {
    name: 'vaporwave',
    bg: '#a4a7ea',
    canvas: '#a4a7ea',
    border: '#e368da',
    subtext: '#7c7faf',
    text: '#f1ebf1',
  },
  {
    name: 'pulse',
    bg: '#181818',
    canvas: '#181818',
    border: '#17b8bd',
    subtext: '#53565a',
    text: '#e5f4f4',
  },
  {
    name: 'matrix',
    bg: '#000000',
    canvas: '#000000',
    border: '#15ff00',
    subtext: '#003b00',
    text: '#d1ffcd',
  },
  {
    name: 'olive',
    bg: '#e9e5cc',
    canvas: '#e9e5cc',
    border: '#92946f',
    subtext: '#b7b39e',
    text: '#373731',
  },
  {
    name: 'strawberry',
    bg: '#f37f83',
    canvas: '#f37f83',
    border: '#fcfcf8',
    subtext: '#e53c58',
    text: '#fcfcf8',
  },
  {
    name: 'night_runner',
    bg: '#212121',
    canvas: '#212121',
    border: '#feff04',
    subtext: '#5c4a9c',
    text: '#e8e8e8',
  },
  {
    name: 'cyberspace',
    bg: '#181c18',
    canvas: '#181c18',
    border: '#00ce7c',
    subtext: '#9578d3',
    text: '#c2fbe1',
  },
  {
    name: 'joker',
    bg: '#1a0e25',
    canvas: '#1a0e25',
    border: '#99de1e',
    subtext: '#7554a3',
    text: '#e9e2f5',
  },
  {
    name: 'dualshot',
    bg: '#737373',
    canvas: '#737373',
    border: '#212222',
    subtext: '#aaaaaa',
    text: '#212222',
  },
  {
    name: 'solarized_dark',
    bg: '#002b36',
    canvas: '#002b36',
    border: '#859900',
    subtext: '#2aa198',
    text: '#268bd2',
  },
  {
    name: 'solarized_light',
    bg: '#fdf6e3',
    canvas: '#fdf6e3',
    border: '#859900',
    subtext: '#2aa198',
    text: '#181819',
  },
  {
    name: 'terra',
    bg: '#0c100e',
    canvas: '#0c100e',
    border: '#89c559',
    subtext: '#436029',
    text: '#f0edd1',
  },
  {
    name: 'red_dragon',
    bg: '#1a0b0c',
    canvas: '#1a0b0c',
    border: '#ff3a32',
    subtext: '#e2a528',
    text: '#4a4d4e',
  },
  {
    name: 'hammerhead',
    bg: '#030613',
    canvas: '#030613',
    border: '#4fcdb9',
    subtext: '#213c53',
    text: '#e2f1f5',
  },
  {
    name: 'future_funk',
    bg: '#2e1a47',
    canvas: '#2e1a47',
    border: '#f7f2ea',
    subtext: '#c18fff',
    text: '#f7f2ea',
  },
  {
    name: 'milkshake',
    bg: '#ffffff',
    canvas: '#ffffff',
    border: '#212b43',
    subtext: '#62cfe6',
    text: '#212b43',
  },
  {
    name: 'aether',
    bg: '#101820',
    canvas: '#101820',
    border: '#eedaea',
    subtext: '#cf6bdd',
    text: '#eedaea',
  },
  {
    name: 'froyo',
    bg: '#e1dacb',
    canvas: '#e1dacb',
    border: '#7b7d7d',
    subtext: '#b29c5e',
    text: '#7b7d7d',
  },
  {
    name: 'retrocast',
    bg: '#07737a',
    canvas: '#07737a',
    border: '#88dbdf',
    subtext: '#f3e03b',
    text: '#ffffff',
  },
  {
    name: 'luna',
    bg: '#221c35',
    canvas: '#221c35',
    border: '#f67599',
    subtext: '#5a3a7e',
    text: '#ffe3eb',
  },
  {
    name: 'graen',
    bg: '#303c36',
    canvas: '#303c36',
    border: '#a59682',
    subtext: '#181d1a',
    text: '#a59682',
  },
  {
    name: 'bento',
    bg: '#2d394d',
    canvas: '#2d394d',
    border: '#ff7a90',
    subtext: '#4a768d',
    text: '#fffaf8',
  },
  {
    name: 'watermelon',
    bg: '#1f4437',
    canvas: '#1f4437',
    border: '#d6686f',
    subtext: '#3e7a65',
    text: '#cdc6bc',
  },
  {
    name: 'menthol',
    bg: '#00c18c',
    canvas: '#00c18c',
    border: '#ffffff',
    subtext: '#186544',
    text: '#ffffff',
  },
  {
    name: 'ishtar',
    bg: '#202020',
    canvas: '#202020',
    border: '#91170c',
    subtext: '#847869',
    text: '#fae1c3',
  },
  {
    name: 'mashu',
    bg: '#2b2b2c',
    canvas: '#2b2b2c',
    border: '#76689a',
    subtext: '#d8a0a6',
    text: '#f1e2e4',
  },
  {
    name: 'deku',
    bg: '#058b8c',
    canvas: '#058b8c',
    border: '#b63530',
    subtext: '#255458',
    text: '#f7f2ea',
  },
  {
    name: 'honey',
    bg: '#f2aa00',
    canvas: '#f2aa00',
    border: '#fff546',
    subtext: '#a66b00',
    text: '#f3eecb',
  },
  {
    name: 'shoko',
    bg: '#ced7e0',
    canvas: '#ced7e0',
    border: '#81c4dd',
    subtext: '#7599b1',
    text: '#3b4c58',
  },
  {
    name: 'norse',
    bg: '#242425',
    canvas: '#242425',
    border: '#2b5f6d',
    subtext: '#505b5e',
    text: '#ccc2b1',
  },
  {
    name: 'matcha_moccha',
    bg: '#523525',
    canvas: '#523525',
    border: '#7ec160',
    subtext: '#9e6749',
    text: '#ecddcc',
  },
  {
    name: 'cafe',
    bg: '#ceb18d',
    canvas: '#ceb18d',
    border: '#14120f',
    subtext: '#d4d2d1',
    text: '#14120f',
  },
  {
    name: 'alpine',
    bg: '#6c687f',
    canvas: '#6c687f',
    border: '#ffffff',
    subtext: '#9994b8',
    text: '#ffffff',
  },
  {
    name: 'superuser',
    bg: '#262a33',
    canvas: '#262a33',
    border: '#43ffaf',
    subtext: '#526777',
    text: '#e5f7ef',
  },
  {
    name: 'ms_cupcakes',
    bg: '#ffffff',
    canvas: '#ffffff',
    border: '#5ed5f3',
    subtext: '#d64090',
    text: '#0a282f',
  },
  {
    name: 'dollar',
    bg: '#e4e4d4',
    canvas: '#e4e4d4',
    border: '#6b886b',
    subtext: '#8a9b69',
    text: '#555a56',
  },
  {
    name: 'lime',
    bg: '#7c878e',
    canvas: '#7c878e',
    border: '#93c247',
    subtext: '#4b5257',
    text: '#bfcfdc',
  },
  {
    name: 'sweden',
    bg: '#0058a3',
    canvas: '#0058a3',
    border: '#ffcc02',
    subtext: '#57abdb',
    text: '#ffffff',
  },
  {
    name: 'wavez',
    bg: '#1c292f',
    canvas: '#1c292f',
    border: '#6bde3b',
    subtext: '#1f5e6b',
    text: '#e9efe6',
  },
  {
    name: 'nebula',
    bg: '#212135',
    canvas: '#212135',
    border: '#be3c88',
    subtext: '#19b3b8',
    text: '#838686',
  },
  {
    name: 'lil_dragon',
    bg: '#ebe1ef',
    canvas: '#ebe1ef',
    border: '#8a5bd6',
    subtext: '#a28db8',
    text: '#212b43',
  },
  {
    name: 'pastel',
    bg: '#e0b2bd',
    canvas: '#e0b2bd',
    border: '#fbf4b6',
    subtext: '#b4e9ff',
    text: '#6d5c6f',
  },
  {
    name: 'alduin',
    bg: '#1c1c1c',
    canvas: '#1c1c1c',
    border: '#dfd7af',
    subtext: '#444444',
    text: '#f5f3ed',
  },
  {
    name: 'paper',
    bg: '#eeeeee',
    canvas: '#eeeeee',
    border: '#444444',
    subtext: '#b2b2b2',
    text: '#444444',
  },
  {
    name: 'fundamentals',
    bg: '#727474',
    canvas: '#727474',
    border: '#7fa482',
    subtext: '#cac4be',
    text: '#131313',
  },
  {
    name: 'drowning',
    bg: '#191826',
    canvas: '#191826',
    border: '#4a6fb5',
    subtext: '#50688c',
    text: '#9393a7',
  },
  {
    name: 'iceberg_dark',
    bg: '#161821',
    canvas: '#161821',
    border: '#84a0c6',
    subtext: '#595e76',
    text: '#c6c8d1',
  },
  {
    name: 'iceberg_light',
    bg: '#e8e9ec',
    canvas: '#e8e9ec',
    border: '#2d539e',
    subtext: '#adb1c4',
    text: '#33374c',
  },
  {
    name: 'onedark',
    bg: '#2f343f',
    canvas: '#2f343f',
    border: '#61afef',
    subtext: '#eceff4',
    text: '#98c379',
  },
  {
    name: 'darling',
    bg: '#fec8cd',
    canvas: '#fec8cd',
    border: '#ffffff',
    subtext: '#a30000',
    text: '#ffffff',
  },
  {
    name: 'repose_dark',
    bg: '#2f3338',
    canvas: '#2f3338',
    border: '#d6d2bc',
    subtext: '#8f8e84',
    text: '#d6d2bc',
  },
  {
    name: 'repose_light',
    bg: '#efead0',
    canvas: '#efead0',
    border: '#5f605e',
    subtext: '#8f8e84',
    text: '#333538',
  },
  {
    name: 'horizon',
    bg: '#1c1e26',
    canvas: '#1c1e26',
    border: '#c4a88a',
    subtext: '#db886f',
    text: '#bbbbbb',
  },
  {
    name: 'rudy',
    bg: '#1a2b3e',
    canvas: '#1a2b3e',
    border: '#af8f5c',
    subtext: '#3a506c',
    text: '#c9c8bf',
  },
  {
    name: 'stealth',
    bg: '#010203',
    canvas: '#010203',
    border: '#383e42',
    subtext: '#5e676e',
    text: '#383e42',
  },
  {
    name: '80s_after_dark',
    bg: '#1b1d36',
    canvas: '#1b1d36',
    border: '#fca6d1',
    subtext: '#99d6ea',
    text: '#e1e7ec',
  },
  {
    name: 'arch',
    bg: '#0c0d11',
    canvas: '#0c0d11',
    border: '#7ebab5',
    subtext: '#454864',
    text: '#f6f5f5',
  },
  {
    name: 'rose_pine',
    bg: '#1f1d27',
    canvas: '#1f1d27',
    border: '#9ccfd8',
    subtext: '#c4a7e7',
    text: '#e0def4',
  },
  {
    name: 'rose_pine_moon',
    bg: '#2a273f',
    canvas: '#2a273f',
    border: '#9ccfd8',
    subtext: '#c4a7e7',
    text: '#e0def4',
  },
  {
    name: 'rose_pine_dawn',
    bg: '#fffaf3',
    canvas: '#fffaf3',
    border: '#56949f',
    subtext: '#c4a7e7',
    text: '#286983',
  },
  {
    name: 'copper',
    bg: '#442f29',
    canvas: '#442f29',
    border: '#b46a55',
    subtext: '#7ebab5',
    text: '#e7e0de',
  },
  {
    name: 'grand_prix',
    bg: '#36475c',
    canvas: '#36475c',
    border: '#c0d036',
    subtext: '#5c6c80',
    text: '#c1c7d7',
  },
  {
    name: 'peaches',
    bg: '#e0d7c1',
    canvas: '#e0d7c1',
    border: '#dd7a5f',
    subtext: '#e7b28e',
    text: '#5f4c41',
  },
  {
    name: 'bouquet',
    bg: '#173f35',
    canvas: '#173f35',
    border: '#eaa09c',
    subtext: '#408e7b',
    text: '#e9e0d2',
  },
  {
    name: 'midnight',
    bg: '#0b0e13',
    canvas: '#0b0e13',
    border: '#60759f',
    subtext: '#394760',
    text: '#9fadc6',
  },
  {
    name: 'blueberry_light',
    bg: '#dae0f5',
    canvas: '#dae0f5',
    border: '#506477',
    subtext: '#92a4be',
    text: '#678198',
  },
  {
    name: 'blueberry_dark',
    bg: '#212b42',
    canvas: '#212b42',
    border: '#add7ff',
    subtext: '#5c7da5',
    text: '#91b4d5',
  },
  {
    name: 'fledgling',
    bg: '#3b363f',
    canvas: '#3b363f',
    border: '#fc6e83',
    subtext: '#8e5568',
    text: '#e6d5d3',
  },
  {
    name: 'ez_mode',
    bg: '#0068c6',
    canvas: '#0068c6',
    border: '#fa62d5',
    subtext: '#138bf7',
    text: '#ffffff',
  },
  {
    name: 'vscode',
    bg: '#1e1e1e',
    canvas: '#1e1e1e',
    border: '#007acc',
    subtext: '#4d4d4d',
    text: '#d4d4d4',
  },
  {
    name: 'material',
    bg: '#263238',
    canvas: '#263238',
    border: '#80cbc4',
    subtext: '#4c6772',
    text: '#e6edf3',
  },
  {
    name: 'godspeed',
    bg: '#eae4cf',
    canvas: '#eae4cf',
    border: '#9abbcd',
    subtext: '#ada998',
    text: '#646669',
  },
  {
    name: 'witch_girl',
    bg: '#f3dbda',
    canvas: '#f3dbda',
    border: '#56786a',
    subtext: '#ddb4a7',
    text: '#56786a',
  },
  {
    name: 'terror_below',
    bg: '#0b1e1a',
    canvas: '#0b1e1a',
    border: '#66ac92',
    subtext: '#015c53',
    text: '#dceae5',
  },
  {
    name: 'sewing_tin',
    bg: '#241963',
    canvas: '#241963',
    border: '#f2ce83',
    subtext: '#446ad5',
    text: '#ffffff',
  },
  {
    name: 'soaring_skies',
    bg: '#fff9f2',
    canvas: '#fff9f2',
    border: '#55c6f0',
    subtext: '#1e107a',
    text: '#1d1e1e',
  },
  {
    name: 'sewing_tin_light',
    bg: '#ffffff',
    canvas: '#ffffff',
    border: '#2d2076',
    subtext: '#385eca',
    text: '#2d2076',
  },
  {
    name: 'chaos_theory',
    bg: '#141221',
    canvas: '#141221',
    border: '#fd77d7',
    subtext: '#676e8a',
    text: '#dde5ed',
  },
  {
    name: 'hanok',
    bg: '#d8d2c3',
    canvas: '#d8d2c3',
    border: '#513a2a',
    subtext: '#8b6f5c',
    text: '#393b3b',
  },
  {
    name: 'comfy',
    bg: '#4a5b6e',
    canvas: '#4a5b6e',
    border: '#f8cdc6',
    subtext: '#9ec1cc',
    text: '#f5efee',
  },
  {
    name: 'tiramisu',
    bg: '#cfc6b9',
    canvas: '#cfc6b9',
    border: '#c0976f',
    subtext: '#c0976f',
    text: '#7d5448',
  },
  {
    name: 'diner',
    bg: '#537997',
    canvas: '#537997',
    border: '#c3af5b',
    subtext: '#445c7f',
    text: '#dfdbc8',
  },
  {
    name: 'modern_ink',
    bg: '#ffffff',
    canvas: '#ffffff',
    border: '#ff360d',
    subtext: '#b7b7b7',
    text: '#000000',
  },
  {
    name: 'dev',
    bg: '#1b2028',
    canvas: '#1b2028',
    border: '#23a9d5',
    subtext: '#4b5975',
    text: '#ccccb5',
  },
  {
    name: 'moonlight',
    bg: '#191f28',
    canvas: '#191f28',
    border: '#c69f68',
    subtext: '#4b5975',
    text: '#ccccb5',
  },
  {
    name: 'pink_lemonade',
    bg: '#f6d992',
    canvas: '#f6d992',
    border: '#f6a192',
    subtext: '#f6b092',
    text: '#fcfcf8',
  },
  {
    name: 'creamsicle',
    bg: '#ff9869',
    canvas: '#ff9869',
    border: '#fcfcf8',
    subtext: '#ff661f',
    text: '#fcfcf8',
  },
  {
    name: 'beach',
    bg: '#ffeead',
    canvas: '#ffeead',
    border: '#96ceb4',
    subtext: '#ffcc5c',
    text: '#5b7869',
  },
  {
    name: 'desert_oasis',
    bg: '#fff2d5',
    canvas: '#fff2d5',
    border: '#d19d01',
    subtext: '#0061fe',
    text: '#332800',
  },
  {
    name: 'frozen_llama',
    bg: '#9bf2ea',
    canvas: '#9bf2ea',
    border: '#6d44a6',
    subtext: '#b690fd',
    text: '#ffffff',
  },
  {
    name: 'ryujinscales',
    bg: '#081426',
    canvas: '#081426',
    border: '#f17754',
    subtext: '#ffbc90',
    text: '#ffe4bc',
  },
  {
    name: 'trackday',
    bg: '#464d66',
    canvas: '#464d66',
    border: '#e0513e',
    subtext: '#5c7eb9',
    text: '#cfcfcf',
  },
  {
    name: 'fruit_chew',
    bg: '#d6d3d6',
    canvas: '#d6d3d6',
    border: '#5c1e5f',
    subtext: '#b49cb5',
    text: '#282528',
  },
  {
    name: 'evil_eye',
    bg: '#0084c2',
    canvas: '#0084c2',
    border: '#f7f2ea',
    subtext: '#01589f',
    text: '#171718',
  },
  {
    name: 'trance',
    bg: '#00021b',
    canvas: '#00021b',
    border: '#e51376',
    subtext: '#3c4c79',
    text: '#fff',
  },
  {
    name: 'fire',
    bg: '#0f0000',
    canvas: '#0f0000',
    border: '#b31313',
    subtext: '#683434',
    text: '#ffffff',
  },
  {
    name: 'aurora',
    bg: '#011926',
    canvas: '#011926',
    border: '#00e980',
    subtext: '#245c69',
    text: '#fff',
  },
  {
    name: 'leather',
    bg: '#a86948',
    canvas: '#a86948',
    border: '#ffe4bc',
    subtext: '#81482b',
    text: '#ffe4bc',
  },
  {
    name: 'fleuriste',
    bg: '#c6b294',
    canvas: '#c6b294',
    border: '#405a52',
    subtext: '#64374d',
    text: '#091914',
  },
  {
    name: 'dmg',
    bg: '#dadbdc',
    canvas: '#dadbdc',
    border: '#ae185e',
    subtext: '#3846b1',
    text: '#414141',
  },
  {
    name: 'catppuccin',
    bg: '#1e1e2e',
    canvas: '#1e1e2e',
    border: '#abe9b3',
    subtext: '#575268',
    text: '#d9e0ee',
  },
  {
    name: 'snes',
    bg: '#bfbec2',
    canvas: '#bfbec2',
    border: '#553d94',
    subtext: '#9f8ad4',
    text: '#2e2e2e',
  },
  {
    name: 'passion_fruit',
    bg: '#7c2142',
    canvas: '#7c2142',
    border: '#f4a3b4',
    subtext: '#9994b8',
    text: '#ffffff',
  },
  {
    name: 'blue_dolphin',
    bg: '#003950',
    canvas: '#003950',
    border: '#ffcefb',
    subtext: '#00e4ff',
    text: '#82eaff',
  },
  {
    name: 'mexican',
    bg: '#f8ad34',
    canvas: '#f8ad34',
    border: '#b12189',
    subtext: '#333',
    text: '#eee',
  },
  {
    name: 'husqy',
    bg: '#000000',
    canvas: '#000000',
    border: '#c58aff',
    subtext: '#972fff',
    text: '#ebd7ff',
  },
  {
    name: 'peach_blossom',
    bg: '#292929',
    canvas: '#292929',
    border: '#99b898',
    subtext: '#616161',
    text: '#fecea8',
  },
  {
    name: 'dino',
    bg: '#ffffff',
    canvas: '#ffffff',
    border: '#40d672',
    subtext: '#d5d5d5',
    text: '#1d221f',
  },
  {
    name: 'tron_orange',
    bg: '#0d1c1c',
    canvas: '#0d1c1c',
    border: '#f0e800',
    subtext: '#ff6600',
    text: '#ffffff',
  },
  {
    name: 'hedge',
    bg: '#415e31',
    canvas: '#415e31',
    border: '#6a994e',
    subtext: '#ede5b4',
    text: '#f7f1d6',
  },
  {
    name: 'modern_dolch_light',
    bg: '#dbdbdb',
    canvas: '#dbdbdb',
    border: '#8fd1c3',
    subtext: '#acacac',
    text: '#454545',
  },
  {
    name: 'iv_spade',
    bg: '#0c0c0c',
    canvas: '#0c0c0c',
    border: '#b7976a',
    subtext: '#404040',
    text: '#d3c2c3',
  },
  {
    name: 'iv_clover',
    bg: '#a0a0a0',
    canvas: '#a0a0a0',
    border: '#573e40',
    subtext: '#353535',
    text: '#3b2d3b',
  },
  {
    name: 'cheesecake',
    bg: '#fdf0d5',
    canvas: '#fdf0d5',
    border: '#8e2949',
    subtext: '#d91c81',
    text: '#3a3335',
  },
  {
    name: 'earthsong',
    bg: '#292521',
    canvas: '#292521',
    border: '#509452',
    subtext: '#f5ae2d',
    text: '#e6c7a8',
  },
  {
    name: 'purpurite',
    bg: '#1f2533',
    canvas: '#1f2533',
    border: '#9999ff',
    subtext: '#ccddff',
    text: '#9999ff',
  },
  {
    name: 'nord_light',
    bg: '#eceff4',
    canvas: '#eceff4',
    border: '#8fbcbb',
    subtext: '#6a7791',
    text: '#8fbcbb',
  },
  {
    name: 'slambook',
    bg: '#FFFDDE',
    canvas: '#FFFDDE',
    border: '#13005A',
    subtext: '#1c82adc4',
    text: '#125d98',
  },
];
