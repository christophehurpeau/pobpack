<h3 align="center">
  pobpack-browser
</h3>

<p align="center">
  Build and run browser projects with webpack and webpack-dev-server.
</p>

<p align="center">
  <a href="https://npmjs.org/package/pobpack-browser"><img src="https://img.shields.io/npm/v/pobpack-browser.svg?style=flat-square"></a>
  <a href="https://david-dm.org/christophehurpeau/pobpack?path=packages/pobpack-browser"><img src="https://david-dm.org/christophehurpeau/pobpack?path=packages/pobpack-browser.svg?style=flat-square"></a>
</p>

* [Features](#features)
* [Install](#install)
* [Usage](#usage)
* [Hot Reload](#hot-reload)
* [Configuration Options](#configuration-options)
* [Configuration Examples](#configuration-examples)
* [Alternatives](#alternatives)

## Features

- Start without config
- Hot Module Reload
- Human readable errors
- You can override everything in the webpack config

## Install

```bash
yarn add pobpack-browser
npm install --save pobpack-browser
```

## Usage

> package.json

```json
{
  "scripts": {
    "build": "pobpack-browser build",
    "start": "pobpack-browser"
  }
}
```

```bash
npm run start
```

## Targets

There is two targets : `modern` and `all`.

You can use `modern` to build a specific file for browsers that supports es modules, and import like this:

```html
<script defer src="/all.js" nomodule></script>
<script defer src="/modern.js" type="module"></script>
```

You should also use [polyfill.io](https://polyfill.io) to import polyfills and reduce build size. Some modules are removed for their native implementation:

- [object-assign](https://www.npmjs.com/package/object-assign)

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
    paths: { src: 'src', build: 'public' },
  });
};
```


## Hot Reload

You should read [webpack documentation about HMR](https://webpack.github.io/docs/hot-module-replacement.html)

[react-hot-loader 3](https://www.npmjs.com/package/react-hot-loader) is included

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

- [vitaminjs](https://www.npmjs.com/package/vitaminjs)
