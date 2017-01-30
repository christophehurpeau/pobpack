# pobpack-node [![NPM version][npm-image]][npm-url]

Build and run node projects with webpack.

[![Dependency ci Status][dependencyci-image]][dependencyci-url]
[![Dependency Status][daviddm-image]][daviddm-url]

* [Features](#features)
* [Install](#install)
* [Usage](#usage)
* [Hot Reload](#hot-reload)
* [Configuration Options](#configuration-options)
* [Configuration Examples](#configuration-examples)
* [Alternatives](#alternatives)

## Screenshot

![hello-example](example/tty.gif?raw=true)

## Features

- Start without config
- Hot Module Reload
- Human readable errors
- You can override everything in the webpack config

## Install

```bash
npm install --save pobpack-node
```

## Usage

> package.json

```json
{
  "scripts": {
    "build": "pobpack-node build",
    "start": "pobpack-node"
  }
}
```

```bash
npm run start
```

## Configuration Options

You can create a file named `createWebpackConfig.js` next to `package.json`:

```js
module.exports = function (config, options) {
  return config({
    ...options,
    babel: {}, // babel config (see below)
    jsLoaders: {}, // add more webpack loaders to js/jsx (see below)
    moduleRules: [], // add more webpack rules
    prependPlugins: [], // prepend plugins
    plugins: [], // append plugins
    paths: { src: 'src', build: 'build' },
  });
};
```


## Hot Reload

You should read [webpack documentation about HMR](https://webpack.github.io/docs/hot-module-replacement.html)

You can activate accept hot-reload by default with [webpack-module-hot-accept](https://www.npmjs.com/package/webpack-module-hot-accept)

```bash
npm install --save-dev webpack-module-hot-accept
```

> createWebpackConfig.js

```js
module.exports = function (config, options) {
  return config(Object.assign({}, options, {
    jsLoaders: [
      'webpack-module-hot-accept',
    ]
  }));
};
```

## Configuration examples

```js
module.exports = function (config, options) {
  return config(Object.assign({}, options, {
  }));
};
```

### Add a webpack plugin

```js
module.exports = function (config, options) {
  return config(Object.assign({}, options, {
    plugins: [new WebPackPlugin()],
  }));
};
```

You can also do:

```js
module.exports = function (config, options) {
  config = config(options);
  config.plugins.push(new WebPackPlugin());
  return config;
};
```

### Add a babel plugin

```js
const babelPlugin = require('babel-plugin-example');

module.exports = function (config, options) {
  return config(Object.assign({}, options, {
    babel: {
      plugins: [babelPlugin]
    }
  }));
};
```

### Override babel preset

```js
const babelPlugin = require('babel-plugin-example');

module.exports = function (config, options) {
  return config(Object.assign({}, options, {
    babel: {
      presets: [
        'pobpack/babel',
        'stage-1',
      ]
    }
  }));
};
```

### Add webpack loaders

pobpack handle `json` and `js`/`jsx` files

```js
const babelPlugin = require('babel-plugin-example');

module.exports = function (config, options) {
  return config(Object.assign({}, options, {
    loaders: [
      // add your loaders
    ]
  }));
};
```

### Add js/jsx loaders

```js
const babelPlugin = require('babel-plugin-example');

module.exports = function (config, options) {
  return config(Object.assign({}, options, {
    jsLoaders: [
      // add your loaders
    ]
  }));
};
```

## Alternatives

- [backpack](https://www.npmjs.com/package/backpack-core)
- [vitaminjs](https://www.npmjs.com/package/vitaminjs)

[npm-image]: https://img.shields.io/npm/v/pobpack-node.svg?style=flat-square
[npm-url]: https://npmjs.org/package/pobpack-node
[daviddm-image]: https://david-dm.org/christophehurpeau/pobpack-node.svg?style=flat-square
[daviddm-url]: https://david-dm.org/christophehurpeau/pobpack-node
[dependencyci-image]: https://dependencyci.com/github/christophehurpeau/pobpack-node/badge?style=flat-square
[dependencyci-url]: https://dependencyci.com/github/christophehurpeau/pobpack-node
