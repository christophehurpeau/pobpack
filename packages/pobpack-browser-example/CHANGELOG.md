# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 11.0.0 (2021-01-17)


### Bug Fixes

* downgrade react-dev-utils and update doc on react-hot-loader ([29585f1](https://github.com/christophehurpeau/pobpack/commit/29585f126acad6323bfaf8c10e3b077674d4dd9b))
* missing typings ([e4a8c6e](https://github.com/christophehurpeau/pobpack/commit/e4a8c6ef4469332d76a13d261d1171984afd5dae))
* resolve react-hot-loader from cwd too ([ea70c64](https://github.com/christophehurpeau/pobpack/commit/ea70c64ada8deda4e6dfc5944c86e9bbabe57fbe))
* update dependencies ([3342f3d](https://github.com/christophehurpeau/pobpack/commit/3342f3dcb538eb1dc75ef02dbe1edd9d41cbd1ce))
* update dependencies ([975a9d1](https://github.com/christophehurpeau/pobpack/commit/975a9d1995c31ffecb1bb9dc7f8bb6e8434b33c3))
* update minor dependencies ([f18bcf6](https://github.com/christophehurpeau/pobpack/commit/f18bcf6333475755a7186e94dd31be051b0c4d03))


### chore

* update config and drop node 8 ([2c98e79](https://github.com/christophehurpeau/pobpack/commit/2c98e796b3ea693ee3d7fdd92e108942572f82a9))


### Code Refactoring

* typescript ([48da444](https://github.com/christophehurpeau/pobpack/commit/48da4440545b21063c686d6eb4245983fe49224c))
* webpack 4, targets, minify when production ([69136a5](https://github.com/christophehurpeau/pobpack/commit/69136a55167f1ad3b4a420cbac0c61df63b1cd1d))
* webpack 5 ([0b32c76](https://github.com/christophehurpeau/pobpack/commit/0b32c76e255307fba7934a97e03c75a9fdd631ff))


### Features

* add service worker support with workbox plugin ([6d3d11d](https://github.com/christophehurpeau/pobpack/commit/6d3d11dc54aac9f0c705ae2741b9e6df189db641))
* pob update, webpack 4 ([6ce8705](https://github.com/christophehurpeau/pobpack/commit/6ce870585bb1412cc3aae6aeec730b4f8ad6e898))
* requires node 12 ([a54fcad](https://github.com/christophehurpeau/pobpack/commit/a54fcad72fe153a04fe615f922145444c3611f59))
* update dependencies ([9f54ca8](https://github.com/christophehurpeau/pobpack/commit/9f54ca89fccfd5cc79fa92997fd15b255c573773))
* update dependencies ([e255a7b](https://github.com/christophehurpeau/pobpack/commit/e255a7b59e5c2d836208a5a10865c0b284b1188e))
* update dependencies ([45f1fd1](https://github.com/christophehurpeau/pobpack/commit/45f1fd1cd8bb7a59f5ca2a99cab308526625925c))
* update dependencies ([3626862](https://github.com/christophehurpeau/pobpack/commit/3626862a15e18e2323b9d57bf8326fce180564d1))
* update dependencies and fix flow ([c598f1c](https://github.com/christophehurpeau/pobpack/commit/c598f1cd77fbba385e69d66ccfd20379642da3d3))
* update dependencies and node 8.3 ([bc648e2](https://github.com/christophehurpeau/pobpack/commit/bc648e2f2d1327c00fcce800658e8e796c7fca13))
* update dependencies, replace chalk by colorette and resolve includeModules from pwd ([ccea3a8](https://github.com/christophehurpeau/pobpack/commit/ccea3a8a29baae939ad98e89b52a5d7c5a0f4fa1))
* update deps ([5e3fa35](https://github.com/christophehurpeau/pobpack/commit/5e3fa3531664be52a319d7045f301bad755161de))
* update deps ([a472983](https://github.com/christophehurpeau/pobpack/commit/a4729833f6f3f9e37fc089597f52fcbc1a743c90))
* update minor dependencies ([5415706](https://github.com/christophehurpeau/pobpack/commit/5415706b8de0ede02f70de48bd2d784e9aea3171))
* use react fast refresh ([6062291](https://github.com/christophehurpeau/pobpack/commit/6062291329b2ffe6eb8f2c7637ec9a8fe97dfdbb))
* **pobpack-browser:** export hot function as pobpack-browser/hot ([72025c9](https://github.com/christophehurpeau/pobpack/commit/72025c9e3f55f88d108ee4615a5665d4561c2f1b))
* webpack 3 ([0471d41](https://github.com/christophehurpeau/pobpack/commit/0471d416d17660db408a81b2257d004d2ac32053))


### BREAKING CHANGES

* requires webpack 5.
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
* node 8.3
* webpack v3





# [7.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@6.0.0...pobpack-browser-example@7.0.0) (2021-01-17)


### Features

* add service worker support with workbox plugin ([6d3d11d](https://github.com/christophehurpeau/pobpack/commit/6d3d11dc54aac9f0c705ae2741b9e6df189db641))
* requires node 12 ([a54fcad](https://github.com/christophehurpeau/pobpack/commit/a54fcad72fe153a04fe615f922145444c3611f59))


### BREAKING CHANGES

* drop node 10 support





# [6.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@5.0.6...pobpack-browser-example@6.0.0) (2020-08-09)


### Features

* use react fast refresh ([6062291](https://github.com/christophehurpeau/pobpack/commit/6062291))


### BREAKING CHANGES

* you should remove react-hot-loader and @hot-loader/react-dom, and update react to its latest version





## [5.0.6](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@5.0.5...pobpack-browser-example@5.0.6) (2020-08-09)

**Note:** Version bump only for package pobpack-browser-example





## [5.0.5](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@5.0.4...pobpack-browser-example@5.0.5) (2020-05-29)

**Note:** Version bump only for package pobpack-browser-example





## [5.0.4](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@5.0.3...pobpack-browser-example@5.0.4) (2019-12-22)


### Bug Fixes

* update minor dependencies ([f18bcf6](https://github.com/christophehurpeau/pobpack/commit/f18bcf6))





## [5.0.3](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@5.0.2...pobpack-browser-example@5.0.3) (2019-12-18)

**Note:** Version bump only for package pobpack-browser-example





## [5.0.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@5.0.1...pobpack-browser-example@5.0.2) (2019-12-16)

**Note:** Version bump only for package pobpack-browser-example





## [5.0.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@5.0.0...pobpack-browser-example@5.0.1) (2019-12-15)

**Note:** Version bump only for package pobpack-browser-example





# [5.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.4.7...pobpack-browser-example@5.0.0) (2019-12-15)


### chore

* update config and drop node 8 ([2c98e79](https://github.com/christophehurpeau/pobpack/commit/2c98e79))


### Features

* update minor dependencies ([5415706](https://github.com/christophehurpeau/pobpack/commit/5415706))


### BREAKING CHANGES

* drop node 8





## [4.4.7](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.4.6...pobpack-browser-example@4.4.7) (2019-09-21)

**Note:** Version bump only for package pobpack-browser-example





## [4.4.6](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.4.5...pobpack-browser-example@4.4.6) (2019-09-14)


### Bug Fixes

* resolve react-hot-loader from cwd too ([ea70c64](https://github.com/christophehurpeau/pobpack/commit/ea70c64))





## [4.4.5](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.4.4...pobpack-browser-example@4.4.5) (2019-09-14)

**Note:** Version bump only for package pobpack-browser-example





## [4.4.4](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.4.3...pobpack-browser-example@4.4.4) (2019-05-01)

**Note:** Version bump only for package pobpack-browser-example





## [4.4.3](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.4.2...pobpack-browser-example@4.4.3) (2019-05-01)

**Note:** Version bump only for package pobpack-browser-example





## [4.4.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.4.1...pobpack-browser-example@4.4.2) (2019-04-30)

**Note:** Version bump only for package pobpack-browser-example





## [4.4.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.4.0...pobpack-browser-example@4.4.1) (2019-04-17)

**Note:** Version bump only for package pobpack-browser-example





# [4.4.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.3.1...pobpack-browser-example@4.4.0) (2019-04-07)


### Bug Fixes

* missing typings ([e4a8c6e](https://github.com/christophehurpeau/pobpack/commit/e4a8c6e))


### Features

* update deps ([5e3fa35](https://github.com/christophehurpeau/pobpack/commit/5e3fa35))





## [4.3.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.3.0...pobpack-browser-example@4.3.1) (2019-02-08)

**Note:** Version bump only for package pobpack-browser-example





# [4.3.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.2.4...pobpack-browser-example@4.3.0) (2019-02-08)


### Features

* update dependencies ([9f54ca8](https://github.com/christophehurpeau/pobpack/commit/9f54ca8))





## [4.2.4](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.2.3...pobpack-browser-example@4.2.4) (2019-01-05)


### Bug Fixes

* update dependencies ([3342f3d](https://github.com/christophehurpeau/pobpack/commit/3342f3d))





## [4.2.3](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.2.2...pobpack-browser-example@4.2.3) (2018-12-24)

**Note:** Version bump only for package pobpack-browser-example





## [4.2.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.2.1...pobpack-browser-example@4.2.2) (2018-12-24)


### Bug Fixes

* downgrade react-dev-utils and update doc on react-hot-loader ([29585f1](https://github.com/christophehurpeau/pobpack/commit/29585f1))





## [4.2.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.2.0...pobpack-browser-example@4.2.1) (2018-12-21)

**Note:** Version bump only for package pobpack-browser-example





# [4.2.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.1.1...pobpack-browser-example@4.2.0) (2018-12-21)


### Features

* **pobpack-browser:** export hot function as pobpack-browser/hot ([72025c9](https://github.com/christophehurpeau/pobpack/commit/72025c9))





## [4.1.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.1.0...pobpack-browser-example@4.1.1) (2018-12-17)

**Note:** Version bump only for package pobpack-browser-example





# [4.1.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.0.1...pobpack-browser-example@4.1.0) (2018-12-16)


### Features

* update dependencies ([e255a7b](https://github.com/christophehurpeau/pobpack/commit/e255a7b))





## [4.0.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@4.0.0...pobpack-browser-example@4.0.1) (2018-12-09)

**Note:** Version bump only for package pobpack-browser-example





# [4.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@3.1.0...pobpack-browser-example@4.0.0) (2018-12-09)


### Features

* update deps ([a472983](https://github.com/christophehurpeau/pobpack/commit/a472983))


### BREAKING CHANGES

* node 6 dropped





# [3.1.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@3.0.3...pobpack-browser-example@3.1.0) (2018-11-23)


### Features

* update dependencies, replace chalk by colorette and resolve includeModules from pwd ([ccea3a8](https://github.com/christophehurpeau/pobpack/commit/ccea3a8))





<a name="3.0.3"></a>
## [3.0.3](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@3.0.2...pobpack-browser-example@3.0.3) (2018-09-01)

**Note:** Version bump only for package pobpack-browser-example





<a name="3.0.2"></a>
## [3.0.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@3.0.1...pobpack-browser-example@3.0.2) (2018-09-01)

**Note:** Version bump only for package pobpack-browser-example





<a name="3.0.1"></a>
## [3.0.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@3.0.0...pobpack-browser-example@3.0.1) (2018-09-01)

**Note:** Version bump only for package pobpack-browser-example





<a name="3.0.0"></a>
# [3.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@2.0.3...pobpack-browser-example@3.0.0) (2018-08-31)


### Code Refactoring

* typescript ([48da444](https://github.com/christophehurpeau/pobpack/commit/48da444))
* webpack 4, targets, minify when production ([69136a5](https://github.com/christophehurpeau/pobpack/commit/69136a5))


### Features

* pob update, webpack 4 ([6ce8705](https://github.com/christophehurpeau/pobpack/commit/6ce8705))
* update dependencies ([45f1fd1](https://github.com/christophehurpeau/pobpack/commit/45f1fd1))
* update dependencies and fix flow ([c598f1c](https://github.com/christophehurpeau/pobpack/commit/c598f1c))


### BREAKING CHANGES

* webpack@^4.17.1 @babel/core@^7.0.0
* - on build, if process.env.NODE_ENV is undefined it is set to production
- when options.env is production, build is minified with uglify
- object-assign is replaced by its native implementation
- babel 7 compatibility and pob-browser/babel uses babel 7 preset
* webpack 4





<a name="2.0.3"></a>
## [2.0.3](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@2.0.2...pobpack-browser-example@2.0.3) (2017-08-28)




**Note:** Version bump only for package pobpack-browser-example

<a name="2.0.2"></a>
## [2.0.2](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@2.0.1...pobpack-browser-example@2.0.2) (2017-08-26)


### Bug Fixes

* update dependencies ([975a9d1](https://github.com/christophehurpeau/pobpack/commit/975a9d1))




<a name="2.0.1"></a>
## [2.0.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@2.0.0...pobpack-browser-example@2.0.1) (2017-08-25)




**Note:** Version bump only for package pobpack-browser-example

<a name="2.0.0"></a>
# [2.0.0](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@1.0.1...pobpack-browser-example@2.0.0) (2017-08-15)


### Features

* update dependencies and node 8.3 ([bc648e2](https://github.com/christophehurpeau/pobpack/commit/bc648e2))


### BREAKING CHANGES

* node 8.3




<a name="1.0.1"></a>
## [1.0.1](https://github.com/christophehurpeau/pobpack/compare/pobpack-browser-example@1.0.0...pobpack-browser-example@1.0.1) (2017-07-26)




<a name="1.0.0"></a>
# 1.0.0 (2017-07-25)


### Features

* update dependencies ([3626862](https://github.com/christophehurpeau/pobpack/commit/3626862))
* webpack 3 ([0471d41](https://github.com/christophehurpeau/pobpack/commit/0471d41))


### BREAKING CHANGES

* webpack v3




<a name=""></a>
#  (2017-05-13)


### Features

* update dependencies ([3626862](https://github.com/christophehurpeau/pobpack/commit/3626862))
