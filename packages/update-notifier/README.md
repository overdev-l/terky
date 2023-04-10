<div align="center">
  <h1>Update-notifier</h1>
</div>
<div align="center">

update-notifier是一个用于网站更新时通知用户更新网页内容的插件，支持IE10+，它使用了`web workers`来发送请求

<img src="https://img.shields.io/github/stars/overdev-l/terky" alt="stars">
<img src="https://badgen.net/npm/v/@terky/update-notifier" alt="Version" />
<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="licence">

</div>

## 安装
使用NPM
```bash
npm install -S @terky/update-notifier
```
使用Yarn
```bash
yarn add -S @terky/update-notifier
```
使用PNPM
```bash
pnpm add -S @terky/update-notifier
```

## 使用
update-notifier导出了一个函数`useNotification`，接收以下的参数

| name     | required | type                            | default | remark         |
|----------|----------|---------------------------------|---------|----------------|
| delay    | true     | number                          | 180000  | 查询间隔       |
| rootPath | false    | string                          | '/'     | 二级地址       |
| key      | true     | string                          |         | 要查询的字段   |
| request  | false    | function():Promise < string >   |         | 自定义查询函数 |

您可以放心，您传入的`request`函数也会在`web worker`中执行

## 例子
搭配`webpack`
> 您需要安装`html-webpack-plugin`，下面详细说明了如何使用
```js
module.exports = {
  ...
  plugins: [
    ...,
    new HtmlWebpackPlugin({
      title: 'title',
      hash: '[hash]',
      template: path.resolve(__dirname, '../index.html')
    })

  ],
  ...
}
```
在您的模版文件中
```html
<html>
...
<body data-hash="<%= htmlWebpackPlugin.options.hash %>">
  ...
</body>
</html>

```

在您项目入口位置

```js
import { useNotification } from '@terky/update-notifier'
...
useNotification({
  key: 'data-hash'
})
...



window.addEventListener('siteUpdate', function({ detail }) {
  if (detail.data) {
    // do something
  }
})
```