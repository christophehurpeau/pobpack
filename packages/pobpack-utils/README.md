<h3 align="center">
  pobpack-utils
</h3>

<p align="center">
  Utils for building projects with webpack.
</p>

<p align="center">
  <a href="https://npmjs.org/package/pobpack-utils"><img src="https://img.shields.io/npm/v/pobpack-utils.svg?style=flat-square"></a>
</p>

## See also

- [pobpack-cli](https://npmjs.org/package/pobpack-cli): generator to create projects with pobpack
- [pobpack-node](https://npmjs.org/package/pobpack-node): build projects for node
- [pobpack-browser](https://npmjs.org/package/pobpack-browser): build projects for browser
- [pobpack-fullstack](https://npmjs.org/package/pobpack-fullstack): build projects for node and browser

## API

use: `import {} from 'pobpack-utils';`

- webpack: export `webpack`.
- type Options
- type PobpackCompiler
- createAppWebpackConfig(createWebpackConfig: Function): WebpackConfig: wrapper arround a webpack config creator which calls `createAppWebpackConfig.js` in the pwd if found.
- createOptions(options: Object): Options
- createPobpackCompiler(bundleName: string, webpackConfig): PobpackCompiler
- createModuleConfig(options: Options)
- createPluginsConfig(options: Options)
- createResolveConfig(options: Options)
