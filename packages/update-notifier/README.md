<div align="center">
  <h1>Update-notifier</h1>
</div>
<div align="center">

update-notifier是一个用于网站更新时通知用户更新网页内容的插件，支持IE10+，它使用了`web workers`来发送请求

<img src="https://img.shields.io/github/stars/overdev-l/terky" alt="stars">
<img src="https://badgen.net/npm/v/@terky/update-notifier" alt="Version" />
<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="licence">

</div>


## 使用
update-notifier导出了一个函数`useNotification`，接收以下的参数

| name     | required | type                            | default | remark         |
|----------|----------|---------------------------------|---------|----------------|
| delay    | true     | number                          | 180000  | 查询间隔       |
| loop     | false    | boolean                         | false   | 查询到更新后，是否继续查询       |
| init     | false    | string                          | `${window.origin}?t=${Date.now()}`     | 请求地址       |
| key      | true     | string                          |         | 要查询的字段   |
| init     | false    | Fetch.init  |    {method: "get"}     | fetch请求参数，[详情](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) |

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
      hash: new Data().getTime(),
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