// 公用样式
const commonConfig = [
  {
    prop: 'x',
    value: 0,
    field: 'input-number',
    label: 'x轴'
  },
  {
    prop: 'y',
    value: 0,
    field: 'input-number',
    label: 'y轴'
  },
  {
    prop: 'width',
    field: 'input-number',
    value: 0,
    label: '宽'
  },
  {
    prop: 'height',
    field: 'input-number',
    value: 0,
    label: '高'
  },
  {
    prop: 'zIndex',
    field: 'input-number',
    value: 0,
    label: '层级'
  },
  {
    prop: 'link',
    field: 'input',
    value: '',
    label: '链接'
  }
]

// 边框样式
const borderConfig = [
  {
    prop: 'background',
    value: 'transparent',
    label: '背景'
  },
  {
    prop: 'borderWidth',
    value: 1,
    field: 'input-number',
    label: '边框宽度'
  },
  {
    prop: 'borderStyle',
    value: 'solid',
    field: 'select',
    label: '边框样式'
  },
  {
    prop: 'borderColor',
    value: '#333',
    label: '边框颜色'
  },
  {
    prop: 'borderRadius',
    value: 0,
    field: 'input-number',
    label: '边框弧度'
  }
]

// 字体样式
const fontConfig = [
  {
    prop: 'fontSize',
    value: 12,
    field: 'input-number',
    label: '字体大小'
  },
  {
    prop: 'color',
    value: '#333',
    field: 'input',
    label: '字体颜色'
  },
  {
    prop: 'text',
    value: '',
    field: 'input',
    label: '文案'
  }
]

export default {
  // 块
  block: [...commonConfig, ...borderConfig],

  // 图片
  picture: [...commonConfig],

  // 文本
  text: [...fontConfig, ...commonConfig],

  // 按钮
  button: [...fontConfig, ...borderConfig, ...commonConfig]
}
