module.exports = {
  presets: [
    [
      '@vue/babel-preset-app',
      {
        targets: { node: true }
      }
    ]
  ],
  plugins: [
    'lodash',
    [
      'import',
      {
        libraryName: 'antd',
        style: true
      }
    ]
  ]
}
