// 公用样式
const commonConfig = [
  {
    prop: 'x',
    value: 0,
    field: 'input-number',
    label: 'x'
  },
  {
    prop: 'y',
    value: 0,
    field: 'input-number',
    label: 'y'
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
    prop: 'borderWidth',
    value: 1,
    field: 'input-number',
    label: '宽度'
  },
  {
    prop: 'borderRadius',
    value: 0,
    field: 'input-number',
    label: '弧度'
  },
  {
    prop: 'borderStyle',
    value: 0,
    field: 'select',
    options: ['solid', 'dashed', 'dotted'],
    label: '样式'
  },
  {
    prop: 'borderColor',
    value: '#333',
    field: 'color-picker',
    label: '颜色'
  },
  {
    prop: 'background',
    value: 0,
    field: 'color-picker',
    label: '背景'
  }
]

// 字体样式
const fontConfig = [
  {
    prop: 'text',
    value: '输入文案',
    field: 'input',
    label: '文案'
  },
  {
    prop: 'fontSize',
    value: 12,
    field: 'input-number',
    label: '大小'
  },
  {
    prop: 'color',
    value: '#333',
    field: 'color-picker',
    label: '颜色'
  }
]

const imageConfig = [
  {
    label: '',
    value: '',
    field: 'upload',
    prop: 'image'
  }
]

export default {
  // 块
  block: [
    {
      type: 'border',
      group: '边框设置',
      data: borderConfig
    },
    {
      type: 'base',
      group: '基础设置',
      data: commonConfig
    }
  ],

  // 图片
  picture: [
    {
      type: 'upload',
      group: '图片上传',
      data: imageConfig
    },
    {
      type: 'base',
      group: '基础设置',
      data: commonConfig
    }
  ],

  // 文本
  text: [
    {
      type: 'text',
      group: '文本设置',
      data: fontConfig
    },
    {
      type: 'base',
      group: '基础设置',
      data: commonConfig
    }
  ],

  // 按钮
  button: [
    {
      type: 'text',
      group: '文本设置',
      data: fontConfig
    },
    {
      type: 'border',
      group: '边框设置',
      data: borderConfig
    },
    {
      type: 'base',
      group: '基础设置',
      data: commonConfig
    }
  ]
}
