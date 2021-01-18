# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [12.0.0](https://github.com/christophehurpeau/pobpack/compare/v11.0.1...v12.0.0) (2021-01-18)


### Bug Fixes

* update nightingale ([8bb955f](https://github.com/christophehurpeau/pobpack/commit/8bb955f9ce8fbc8826ee2d6e7fe96429666583a0))
* update pob-babel for better support ([d05947a](https://github.com/christophehurpeau/pobpack/commit/d05947ae82cae64b02eef67157d8b3f86c865701))


### Reverts

* Revert "refactor: webpack 5" ([ed413af](https://github.com/christophehurpeau/pobpack/commit/ed413af800751b9a62410e2ede6d833c862f2d74))


### BREAKING CHANGES

* reverts webpack 5





## [11.0.1](https://github.com/christophehurpeau/pobpack/compare/v11.0.0...v11.0.1) (2021-01-17)


### Bug Fixes

* dont use HotModuleReplacementPlugin with webpack-dev-server ([3254881](https://github.com/christophehurpeau/pobpack/commit/3254881c1d540300a599c7f4be4934c45c6cdb25))





# 11.0.0 (2021-01-17)


### Bug Fixes

* update minor dependencies ([f18bcf6](https://github.com/christophehurpeau/pobpack/commit/f18bcf6333475755a7186e94dd31be051b0c4d03))
* update react-dev-tools ([476b871](https://github.com/christophehurpeau/pobpack/commit/476b871afa162dcba3722ab5e3faeaecf001fb7f))
* **deps:** update dependency find-up to v4 ([#67](https://github.com/christophehurpeau/pobpack/issues/67)) ([d08579a](https://github.com/christophehurpeau/pobpack/commit/d08579a20ce36c7aa4189aa3d850f1c32d83e924))
* **deps:** update dependency react-dev-utils to v9 ([#64](https://github.com/christophehurpeau/pobpack/issues/64)) ([4dee585](https://github.com/christophehurpeau/pobpack/commit/4dee5853b782f1cb58123a8bf6182c76e81c0dc2))
* babel module use include instead of exclude, and update dependencies ([8d44cda](https://github.com/christophehurpeau/pobpack/commit/8d44cda3d37eb1b8e80a4d9ba50c0583ef977dc6))
* downgrade react-dev-utils and update doc on react-hot-loader ([29585f1](https://github.com/christophehurpeau/pobpack/commit/29585f126acad6323bfaf8c10e3b077674d4dd9b))
* missing package field browser ([f7e6ebd](https://github.com/christophehurpeau/pobpack/commit/f7e6ebd56034335fdaf9e1219f7eec3a37ae7562))
* only resolve src in app directory and few flow fixes ([f575cb6](https://github.com/christophehurpeau/pobpack/commit/f575cb65e99867bd12bb91044f133d6efafbcfca))
* remove webpack.SourceMapDevToolPlugin ([e7da543](https://github.com/christophehurpeau/pobpack/commit/e7da543046a2fd5cb4e9c80c7a6f668f32655fec))
* resolve browser package field ([b0bb2e2](https://github.com/christophehurpeau/pobpack/commit/b0bb2e23b2e31d6be73196e2552f8c83c78b7041))
* typescript resolve extensions ([0ce5ef1](https://github.com/christophehurpeau/pobpack/commit/0ce5ef1c0e7d1e0dca2d5ae38ab9a0fb0a0d93ed))
* update dependencies ([3342f3d](https://github.com/christophehurpeau/pobpack/commit/3342f3dcb538eb1dc75ef02dbe1edd9d41cbd1ce))
* update dependencies ([975a9d1](https://github.com/christophehurpeau/pobpack/commit/975a9d1995c31ffecb1bb9dc7f8bb6e8434b33c3))
* webpack 4 deprecation warning ([4ab279d](https://github.com/christophehurpeau/pobpack/commit/4ab279de70e2cf34f4d34096638d3620a366470d))


### chore

* update config and drop node 8 ([2c98e79](https://github.com/christophehurpeau/pobpack/commit/2c98e796b3ea693ee3d7fdd92e108942572f82a9))


### Code Refactoring

* typescript ([48da444](https://github.com/christophehurpeau/pobpack/commit/48da4440545b21063c686d6eb4245983fe49224c))
* webpack 4, targets, minify when production ([69136a5](https://github.com/christophehurpeau/pobpack/commit/69136a55167f1ad3b4a420cbac0c61df63b1cd1d))
* webpack 5 ([0b32c76](https://github.com/christophehurpeau/pobpack/commit/0b32c76e255307fba7934a97e03c75a9fdd631ff))


### Features

* update webpack-node-externals ([e523d7d](https://github.com/christophehurpeau/pobpack/commit/e523d7d7d0a160b70cf767097f181ebbc6d98a21))
* **deps:** update dependency find-up to v5 ([#150](https://github.com/christophehurpeau/pobpack/issues/150)) ([d92293f](https://github.com/christophehurpeau/pobpack/commit/d92293f6de90d0146c75257f96362143f865e030))
* add env in success log ([702844d](https://github.com/christophehurpeau/pobpack/commit/702844d2811d78d60d57fdb318f8753a42043890))
* add mjs support ([025ad70](https://github.com/christophehurpeau/pobpack/commit/025ad70345f271db786edd01f16c0e41040991fa))
* add options.whitelistExternalExtensions ([baa06ce](https://github.com/christophehurpeau/pobpack/commit/baa06ceb093d8240663e0a1e95684a063827f15f))
* add service worker support with workbox plugin ([6d3d11d](https://github.com/christophehurpeau/pobpack/commit/6d3d11dc54aac9f0c705ae2741b9e6df189db641))
* add type FilledWebpackConfiguration ([c65d50c](https://github.com/christophehurpeau/pobpack/commit/c65d50cb9acbcf36cf6e747e1bb7f22b6f4f04fb))
* build previous commit ([7a1e687](https://github.com/christophehurpeau/pobpack/commit/7a1e68742403355f980daa80bf220659717d3292))
* first commit ([5502b7d](https://github.com/christophehurpeau/pobpack/commit/5502b7da15e3109047c6dc5d49b916d6cc266b39))
* handle any-promise ([6e0d62d](https://github.com/christophehurpeau/pobpack/commit/6e0d62ddc6c6a239b1fe2141ed00f4d72c706412))
* improve prependPlugins definition ([1991ac7](https://github.com/christophehurpeau/pobpack/commit/1991ac7f6e0e387cd2ee340603b3827fbe65e38a))
* includeModules ([0edef58](https://github.com/christophehurpeau/pobpack/commit/0edef58fd9b3f83ec4ffc921822ebe535568688b))
* optimization option and node_modules parents support ([e871c24](https://github.com/christophehurpeau/pobpack/commit/e871c2476389c718894f03a4e97f7f5e190311d2))
* options.aliases + options.includePaths ([b7cf0bc](https://github.com/christophehurpeau/pobpack/commit/b7cf0bc593313476c3bc8f704fa0613160776fde))
* options.defines ([5b32ad7](https://github.com/christophehurpeau/pobpack/commit/5b32ad77fbfdb5242413f179821cfdee85e94e4d))
* pob update, webpack 4 ([6ce8705](https://github.com/christophehurpeau/pobpack/commit/6ce870585bb1412cc3aae6aeec730b4f8ad6e898))
* replace ponyfills Array.isArray Object.setPrototypeOf and String.prototype.repeat ([68fd834](https://github.com/christophehurpeau/pobpack/commit/68fd834a54ba6f9a7ba839a317e214d9873bd2aa))
* requires node 12 ([a54fcad](https://github.com/christophehurpeau/pobpack/commit/a54fcad72fe153a04fe615f922145444c3611f59))
* resolve add module aliases ([4fa0351](https://github.com/christophehurpeau/pobpack/commit/4fa0351b1527e299835c2e3d26ab51c1d39afb20))
* resolve src modules too ([413905a](https://github.com/christophehurpeau/pobpack/commit/413905a1b4a71d923212e0e167495c5e21988ee0))
* rewrite FriendlyErrorsWebpackPlugin using react-dev-utils ([14cf7ab](https://github.com/christophehurpeau/pobpack/commit/14cf7ab99196d48837246790fd54ff01a391592d))
* support module field in package.json ([2574a28](https://github.com/christophehurpeau/pobpack/commit/2574a282e6a4aa86c4bc2939d0d3a2e482b8fa67))
* support typescript ([4920d1a](https://github.com/christophehurpeau/pobpack/commit/4920d1a63b5c91a31d55b0abdb9365416de50fce))
* update dependencies ([9f54ca8](https://github.com/christophehurpeau/pobpack/commit/9f54ca89fccfd5cc79fa92997fd15b255c573773))
* update dependencies ([e255a7b](https://github.com/christophehurpeau/pobpack/commit/e255a7b59e5c2d836208a5a10865c0b284b1188e))
* update dependencies ([45f1fd1](https://github.com/christophehurpeau/pobpack/commit/45f1fd1cd8bb7a59f5ca2a99cab308526625925c))
* update dependencies ([3626862](https://github.com/christophehurpeau/pobpack/commit/3626862a15e18e2323b9d57bf8326fce180564d1))
* update dependencies ([a5fcc3d](https://github.com/christophehurpeau/pobpack/commit/a5fcc3de476db70bb7ce0f777982d071b96e626b))
* update dependencies and fix flow ([c598f1c](https://github.com/christophehurpeau/pobpack/commit/c598f1cd77fbba385e69d66ccfd20379642da3d3))
* update dependencies and node 8.3 ([bc648e2](https://github.com/christophehurpeau/pobpack/commit/bc648e2f2d1327c00fcce800658e8e796c7fca13))
* update dependencies, replace chalk by colorette and resolve includeModules from pwd ([ccea3a8](https://github.com/christophehurpeau/pobpack/commit/ccea3a8a29baae939ad98e89b52a5d7c5a0f4fa1))
* update deps ([5e3fa35](https://github.com/christophehurpeau/pobpack/commit/5e3fa3531664be52a319d7045f301bad755161de))
* update deps ([a472983](https://github.com/christophehurpeau/pobpack/commit/a4729833f6f3f9e37fc089597f52fcbc1a743c90))
* update minor dependencies ([5415706](https://github.com/christophehurpeau/pobpack/commit/5415706b8de0ede02f70de48bd2d784e9aea3171))
* update nightingale and springbokjs-daemon ([b2dcb50](https://github.com/christophehurpeau/pobpack/commit/b2dcb50349a814ad6f9adc8ec71b6f22cc452f03))
* update nightingale deps ([d8010d5](https://github.com/christophehurpeau/pobpack/commit/d8010d5152f443d1093e1f72105f0980416c34c3))
* update react-dev-utils ([8ff5d06](https://github.com/christophehurpeau/pobpack/commit/8ff5d065fa0c5bd8c6a8481d0e8ae89fe0650811))
* update react-scripts ([bf29e29](https://github.com/christophehurpeau/pobpack/commit/bf29e297fc855177da462ca58cbf3f9505bc4f40))
* use others module: aliases ([6f3dbee](https://github.com/christophehurpeau/pobpack/commit/6f3dbeefaea2c31fb6f0a799fb391ce4aa6ec492))
* use package.json for nodeExternals ([13de6b1](https://github.com/christophehurpeau/pobpack/commit/13de6b13c8b44d30972b0a0de24f8dc45786da71))
* use process.send to notify parent process ([f8c478f](https://github.com/christophehurpeau/pobpack/commit/f8c478f5dfcd8ce43e32729af6eaa3b5b7de1eab))
* use react fast refresh ([6062291](https://github.com/christophehurpeau/pobpack/commit/6062291329b2ffe6eb8f2c7637ec9a8fe97dfdbb))
* webpack 3 ([0471d41](https://github.com/christophehurpeau/pobpack/commit/0471d416d17660db408a81b2257d004d2ac32053))
* webpack is now a peerDependency ([473f5c9](https://github.com/christophehurpeau/pobpack/commit/473f5c9fd7dc5fba4b8ff46fb053a449e03c8e05))


### BREAKING CHANGES

* requires webpack 5.
* replace whitelist by allowlist in allowlistExternalExtensions
* drop node 10 support
* you should remove react-hot-loader and @hot-loader/react-dom, and update react to its latest version
* drop node 8
* node 6 dropped
* webpack@^4.17.1 @babel/core@^7.0.0
* - on build, if process.env.NODE_ENV is undefined it is set to production
- when options.env is production, build is minified with uglify
- object-assign is replaced by its native implementation
- babel 7 compatibility and pob-browser/babel uses babel 7 preset
* webpack 4
* requires your app to have webpack as a devDependency
* node 8.3
* webpack v3
* removed webpack.SourceMapDevToolPlugin

fix: remove webpack.SourceMapDevToolPlugin
* replace externalModules by includeModules





# [10.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@9.0.0...pobpack-utils@10.0.0) (2021-01-17)


### Features

* update webpack-node-externals ([e523d7d](https://github.com/christophehurpeau/pobpack/commit/e523d7d7d0a160b70cf767097f181ebbc6d98a21))
* **deps:** update dependency find-up to v5 ([#150](https://github.com/christophehurpeau/pobpack/issues/150)) ([d92293f](https://github.com/christophehurpeau/pobpack/commit/d92293f6de90d0146c75257f96362143f865e030))
* add service worker support with workbox plugin ([6d3d11d](https://github.com/christophehurpeau/pobpack/commit/6d3d11dc54aac9f0c705ae2741b9e6df189db641))
* requires node 12 ([a54fcad](https://github.com/christophehurpeau/pobpack/commit/a54fcad72fe153a04fe615f922145444c3611f59))


### BREAKING CHANGES

* replace whitelist by allowlist in allowlistExternalExtensions
* drop node 10 support





# [9.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@8.3.1...pobpack-utils@9.0.0) (2020-08-09)


### Features

* use react fast refresh ([6062291](https://github.com/christophehurpeau/pobpack/commit/6062291))


### BREAKING CHANGES

* you should remove react-hot-loader and @hot-loader/react-dom, and update react to its latest version





## [8.3.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@8.3.0...pobpack-utils@8.3.1) (2020-08-09)


### Bug Fixes

* update react-dev-tools ([476b871](https://github.com/christophehurpeau/pobpack/commit/476b871))





# [8.3.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@8.2.0...pobpack-utils@8.3.0) (2020-05-29)


### Features

* update nightingale and springbokjs-daemon ([b2dcb50](https://github.com/christophehurpeau/pobpack/commit/b2dcb50))





# [8.2.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@8.1.0...pobpack-utils@8.2.0) (2019-12-22)


### Bug Fixes

* update minor dependencies ([f18bcf6](https://github.com/christophehurpeau/pobpack/commit/f18bcf6))


### Features

* add mjs support ([025ad70](https://github.com/christophehurpeau/pobpack/commit/025ad70))





# [8.1.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@8.0.1...pobpack-utils@8.1.0) (2019-12-16)


### Features

* improve prependPlugins definition ([1991ac7](https://github.com/christophehurpeau/pobpack/commit/1991ac7))





## [8.0.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@8.0.0...pobpack-utils@8.0.1) (2019-12-15)

**Note:** Version bump only for package pobpack-utils





# [8.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.8.2...pobpack-utils@8.0.0) (2019-12-15)


### chore

* update config and drop node 8 ([2c98e79](https://github.com/christophehurpeau/pobpack/commit/2c98e79))


### Features

* update minor dependencies ([5415706](https://github.com/christophehurpeau/pobpack/commit/5415706))
* update react-scripts ([bf29e29](https://github.com/christophehurpeau/pobpack/commit/bf29e29))


### BREAKING CHANGES

* drop node 8





## [7.8.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.8.1...pobpack-utils@7.8.2) (2019-09-21)


### Bug Fixes

* **deps:** update dependency find-up to v4 ([#67](https://github.com/christophehurpeau/pobpack/issues/67)) ([d08579a](https://github.com/christophehurpeau/pobpack/commit/d08579a))





## [7.8.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.8.0...pobpack-utils@7.8.1) (2019-09-14)


### Bug Fixes

* **deps:** update dependency react-dev-utils to v9 ([#64](https://github.com/christophehurpeau/pobpack/issues/64)) ([4dee585](https://github.com/christophehurpeau/pobpack/commit/4dee585))





# [7.8.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.7.0...pobpack-utils@7.8.0) (2019-05-01)


### Features

* update nightingale deps ([d8010d5](https://github.com/christophehurpeau/pobpack/commit/d8010d5))





# [7.7.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.6.1...pobpack-utils@7.7.0) (2019-05-01)


### Features

* use process.send to notify parent process ([f8c478f](https://github.com/christophehurpeau/pobpack/commit/f8c478f))





## [7.6.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.6.0...pobpack-utils@7.6.1) (2019-04-30)

**Note:** Version bump only for package pobpack-utils





# [7.6.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.5.0...pobpack-utils@7.6.0) (2019-04-17)


### Features

* add options.whitelistExternalExtensions ([baa06ce](https://github.com/christophehurpeau/pobpack/commit/baa06ce))





# [7.5.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.4.0...pobpack-utils@7.5.0) (2019-04-07)


### Features

* update deps ([5e3fa35](https://github.com/christophehurpeau/pobpack/commit/5e3fa35))





# [7.4.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.3.2...pobpack-utils@7.4.0) (2019-02-08)


### Features

* update dependencies ([9f54ca8](https://github.com/christophehurpeau/pobpack/commit/9f54ca8))





## [7.3.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.3.1...pobpack-utils@7.3.2) (2019-01-05)


### Bug Fixes

* update dependencies ([3342f3d](https://github.com/christophehurpeau/pobpack/commit/3342f3d))





## [7.3.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.3.0...pobpack-utils@7.3.1) (2018-12-24)


### Bug Fixes

* downgrade react-dev-utils and update doc on react-hot-loader ([29585f1](https://github.com/christophehurpeau/pobpack/commit/29585f1))





# [7.3.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.2.1...pobpack-utils@7.3.0) (2018-12-21)


### Features

* update react-dev-utils ([8ff5d06](https://github.com/christophehurpeau/pobpack/commit/8ff5d06))





## [7.2.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.2.0...pobpack-utils@7.2.1) (2018-12-21)

**Note:** Version bump only for package pobpack-utils





# [7.2.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.1.0...pobpack-utils@7.2.0) (2018-12-17)


### Features

* optimization option and node_modules parents support ([e871c24](https://github.com/christophehurpeau/pobpack/commit/e871c24))





# [7.1.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@7.0.0...pobpack-utils@7.1.0) (2018-12-16)


### Features

* update dependencies ([e255a7b](https://github.com/christophehurpeau/pobpack/commit/e255a7b))





# [7.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@6.2.0...pobpack-utils@7.0.0) (2018-12-09)


### Features

* update deps ([a472983](https://github.com/christophehurpeau/pobpack/commit/a472983))


### BREAKING CHANGES

* node 6 dropped





# [6.2.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@6.1.0...pobpack-utils@6.2.0) (2018-11-23)


### Features

* update dependencies, replace chalk by colorette and resolve includeModules from pwd ([ccea3a8](https://github.com/christophehurpeau/pobpack/commit/ccea3a8))





<a name="6.1.0"></a>
# [6.1.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@6.0.0...pobpack-utils@6.1.0) (2018-09-01)


### Features

* add type FilledWebpackConfiguration ([c65d50c](https://github.com/christophehurpeau/pobpack/commit/c65d50c))





<a name="6.0.0"></a>
# [6.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@5.3.1...pobpack-utils@6.0.0) (2018-08-31)


### Code Refactoring

* typescript ([48da444](https://github.com/christophehurpeau/pobpack/commit/48da444))


### BREAKING CHANGES

* webpack@^4.17.1 @babel/core@^7.0.0





<a name="5.3.1"></a>
## [5.3.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@5.3.0...pobpack-utils@5.3.1) (2018-04-27)

**Note:** Version bump only for package pobpack-utils





<a name="5.3.0"></a>
# [5.3.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@5.2.0...pobpack-utils@5.3.0) (2018-04-21)


### Features

* replace ponyfills Array.isArray Object.setPrototypeOf and String.prototype.repeat ([68fd834](https://github.com/christophehurpeau/pobpack/commit/68fd834))




<a name="5.2.0"></a>
# [5.2.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@5.1.1...pobpack-utils@5.2.0) (2018-04-21)


### Features

* handle any-promise ([6e0d62d](https://github.com/christophehurpeau/pobpack/commit/6e0d62d))




<a name="5.1.1"></a>
## [5.1.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@5.1.0...pobpack-utils@5.1.1) (2018-04-20)


### Bug Fixes

* typescript resolve extensions ([0ce5ef1](https://github.com/christophehurpeau/pobpack/commit/0ce5ef1))




<a name="5.1.0"></a>
# [5.1.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@5.0.1...pobpack-utils@5.1.0) (2018-04-20)


### Features

* support typescript ([4920d1a](https://github.com/christophehurpeau/pobpack/commit/4920d1a))




<a name="5.0.1"></a>
## [5.0.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@5.0.0...pobpack-utils@5.0.1) (2018-04-20)


### Bug Fixes

* webpack 4 deprecation warning ([4ab279d](https://github.com/christophehurpeau/pobpack/commit/4ab279d))




<a name="5.0.0"></a>
# [5.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@4.1.4...pobpack-utils@5.0.0) (2018-04-20)


### Code Refactoring

* webpack 4, targets, minify when production ([69136a5](https://github.com/christophehurpeau/pobpack/commit/69136a5))


### BREAKING CHANGES

* - on build, if process.env.NODE_ENV is undefined it is set to production
- when options.env is production, build is minified with uglify
- object-assign is replaced by its native implementation
- babel 7 compatibility and pob-browser/babel uses babel 7 preset




<a name="4.1.4"></a>
## [4.1.4](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@4.1.3...pobpack-utils@4.1.4) (2018-03-30)




**Note:** Version bump only for package pobpack-utils

<a name="4.1.3"></a>
## [4.1.3](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@4.1.2...pobpack-utils@4.1.3) (2018-03-25)




**Note:** Version bump only for package pobpack-utils

<a name="4.1.2"></a>
## [4.1.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@4.1.1...pobpack-utils@4.1.2) (2018-03-23)




**Note:** Version bump only for package pobpack-utils

<a name="4.1.1"></a>
## [4.1.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@4.1.0...pobpack-utils@4.1.1) (2018-03-23)




**Note:** Version bump only for package pobpack-utils

<a name="4.1.0"></a>
# [4.1.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@4.0.0...pobpack-utils@4.1.0) (2018-03-18)


### Features

* update dependencies ([45f1fd1](https://github.com/christophehurpeau/pobpack/commit/45f1fd1))




<a name="4.0.0"></a>
# [4.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@3.4.1...pobpack-utils@4.0.0) (2018-03-04)


### Features

* pob update, webpack 4 ([6ce8705](https://github.com/christophehurpeau/pobpack/commit/6ce8705))


### BREAKING CHANGES

* webpack 4




<a name="3.4.1"></a>
## [3.4.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@3.4.0...pobpack-utils@3.4.1) (2017-12-25)


### Bug Fixes

* only resolve src in app directory and few flow fixes ([f575cb6](https://github.com/christophehurpeau/pobpack/commit/f575cb6))




<a name="3.4.0"></a>
# [3.4.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@3.3.0...pobpack-utils@3.4.0) (2017-12-25)


### Features

* build previous commit ([7a1e687](https://github.com/christophehurpeau/pobpack/commit/7a1e687))




<a name="3.3.0"></a>
# [3.3.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@3.2.1...pobpack-utils@3.3.0) (2017-12-25)


### Features

* resolve src modules too ([413905a](https://github.com/christophehurpeau/pobpack/commit/413905a))




<a name="3.2.1"></a>
## [3.2.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@3.2.0...pobpack-utils@3.2.1) (2017-11-05)




**Note:** Version bump only for package pobpack-utils

<a name="3.2.0"></a>
# [3.2.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@3.1.2...pobpack-utils@3.2.0) (2017-10-20)


### Features

* use package.json for nodeExternals ([13de6b1](https://github.com/christophehurpeau/pobpack/commit/13de6b1))




<a name="3.1.2"></a>
## [3.1.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@3.1.1...pobpack-utils@3.1.2) (2017-10-19)




**Note:** Version bump only for package pobpack-utils

<a name="3.1.1"></a>
## [3.1.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@3.1.0...pobpack-utils@3.1.1) (2017-10-08)




**Note:** Version bump only for package pobpack-utils

<a name="3.1.0"></a>
# [3.1.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@3.0.0...pobpack-utils@3.1.0) (2017-09-24)


### Features

* options.aliases + options.includePaths ([b7cf0bc](https://github.com/christophehurpeau/pobpack/commit/b7cf0bc))




<a name="3.0.0"></a>
# [3.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@2.1.0...pobpack-utils@3.0.0) (2017-09-24)


### Features

* webpack is now a peerDependency ([473f5c9](https://github.com/christophehurpeau/pobpack/commit/473f5c9))


### BREAKING CHANGES

* requires your app to have webpack as a devDependency




<a name="2.1.0"></a>
# [2.1.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@2.0.2...pobpack-utils@2.1.0) (2017-09-21)


### Features

* update dependencies and fix flow ([c598f1c](https://github.com/christophehurpeau/pobpack/commit/c598f1c))




<a name="2.0.2"></a>
## [2.0.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@2.0.1...pobpack-utils@2.0.2) (2017-08-26)


### Bug Fixes

* update dependencies ([975a9d1](https://github.com/christophehurpeau/pobpack/commit/975a9d1))




<a name="2.0.1"></a>
## [2.0.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@2.0.0...pobpack-utils@2.0.1) (2017-08-25)


### Bug Fixes

* babel module use include instead of exclude, and update dependencies ([8d44cda](https://github.com/christophehurpeau/pobpack/commit/8d44cda))




<a name="2.0.0"></a>
# [2.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-utils@1.0.0...pobpack-utils@2.0.0) (2017-08-15)


### Features

* update dependencies and node 8.3 ([bc648e2](https://github.com/christophehurpeau/pobpack/commit/bc648e2))


### BREAKING CHANGES

* node 8.3




<a name="1.0.0"></a>
# [1.0.0](https://github.com/christophehurpeau/pobpack-utils/compare/pobpack-utils@0.6.1...pobpack-utils@1.0.0) (2017-07-25)


### Features

* webpack 3 ([0471d41](https://github.com/christophehurpeau/pobpack-utils/commit/0471d41))


### BREAKING CHANGES

* webpack v3




<a name="0.6.1"></a>
## 0.6.1 (2017-05-13)

<a name="0.6.0"></a>
# 0.6.0 (2017-05-13)

### Features

* enable `strictExportPresence`


### BREAKING CHANGES

* enabled `strictExportPresence`


<a name="0.5.1"></a>
## [0.5.1](https://github.com/christophehurpeau/pobpack-utils/compare/v0.5.0...v0.5.1) (2017-04-09)


### Features

* add env in success log ([f1752f7](https://github.com/christophehurpeau/pobpack-utils/commit/f1752f7))
* options.defines ([01137b4](https://github.com/christophehurpeau/pobpack-utils/commit/01137b4))


<a name="0.5.0"></a>
# [0.5.0](https://github.com/christophehurpeau/pobpack-utils/compare/v0.4.0...v0.5.0) (2017-04-01)

upgrade dependencies


<a name="0.4.0"></a>
# [0.4.0](https://github.com/christophehurpeau/pobpack-utils/compare/v0.3.0...v0.4.0) (2017-03-21)


### Features

* update dependencies ([59d8f79](https://github.com/christophehurpeau/pobpack-utils/commit/59d8f79))


<a name="0.3.0"></a>
# [0.3.0](https://github.com/christophehurpeau/pobpack-utils/compare/v0.2.1...v0.3.0) (2017-03-15)


### Bug Fixes

* remove webpack.SourceMapDevToolPlugin ([f10e4c5](https://github.com/christophehurpeau/pobpack-utils/commit/f10e4c5))

### Features

* resolve add module aliases ([e5e6931](https://github.com/christophehurpeau/pobpack-utils/commit/e5e6931))


### BREAKING CHANGES

* removed webpack.SourceMapDevToolPlugin

fix: remove webpack.SourceMapDevToolPlugin


<a name="0.2.1"></a>
## [0.2.1](https://github.com/christophehurpeau/pobpack-utils/compare/v0.2.0...v0.2.1) (2017-03-14)


<a name="0.2.0"></a>
# [0.2.0](https://github.com/christophehurpeau/pobpack-utils/compare/v0.1.5...v0.2.0) (2017-03-13)


### Features

* includeModules ([bf849d8](https://github.com/christophehurpeau/pobpack-utils/commit/bf849d8))


### BREAKING CHANGES

* replace externalModules by includeModules


<a name="0.1.5"></a>
## [0.1.5](https://github.com/christophehurpeau/pobpack-utils/compare/v0.1.4...v0.1.5) (2017-03-07)


### Features

* use others module: aliases ([f4348c1](https://github.com/christophehurpeau/pobpack-utils/commit/f4348c1))


<a name="0.1.4"></a>
## [0.1.4](https://github.com/christophehurpeau/pobpack-utils/compare/v0.1.3...v0.1.4) (2017-03-07)


### Features

* support module field in package.json ([9ad78aa](https://github.com/christophehurpeau/pobpack-utils/commit/9ad78aa))


<a name="0.1.3"></a>
## [0.1.3](https://github.com/christophehurpeau/pobpack-utils/compare/v0.1.2...v0.1.3) (2017-03-05)


### Bug Fixes

* missing package field browser ([9f02cf5](https://github.com/christophehurpeau/pobpack-utils/commit/9f02cf5))

### Features

* rewrite FriendlyErrorsWebpackPlugin using react-dev-utils ([baa94be](https://github.com/christophehurpeau/pobpack-utils/commit/baa94be))


<a name="0.1.2"></a>
## [0.1.2](https://github.com/christophehurpeau/pobpack-utils/compare/v0.1.1...v0.1.2) (2017-03-05)


### Bug Fixes

* resolve browser package field ([bd8c11d](https://github.com/christophehurpeau/pobpack-utils/commit/bd8c11d))


<a name="0.1.1"></a>
## [0.1.1](https://github.com/christophehurpeau/pobpack-utils/compare/v0.1.0...v0.1.1) (2017-03-05)


<a name="0.1.0"></a>
# 0.1.0 (2017-03-05)


### Features

* first commit ([850cc3b](https://github.com/christophehurpeau/pobpack-utils/commit/850cc3b))
