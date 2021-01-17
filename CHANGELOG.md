# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [11.0.1](https://github.com/christophehurpeau/pobpack/compare/v11.0.0...v11.0.1) (2021-01-17)


### Bug Fixes

* dont use HotModuleReplacementPlugin with webpack-dev-server ([3254881](https://github.com/christophehurpeau/pobpack/commit/3254881c1d540300a599c7f4be4934c45c6cdb25))





# 11.0.0 (2021-01-17)


### Bug Fixes

* __filename and __dirname ([80209f9](https://github.com/christophehurpeau/pobpack/commit/80209f9d0708e48fe4054ff73357ce2cbdced57e))
* add missing declaration files ([cb2a7ed](https://github.com/christophehurpeau/pobpack/commit/cb2a7ed8fd34503f875d3763c55787e2344e73a4))
* babel module use include instead of exclude, and update dependencies ([8d44cda](https://github.com/christophehurpeau/pobpack/commit/8d44cda3d37eb1b8e80a4d9ba50c0583ef977dc6))
* build and Omit ([1333ac0](https://github.com/christophehurpeau/pobpack/commit/1333ac0c3f5bfa05eda97391544da9aaaa1e581c))
* clean process.exit on watcher close ([dc090f2](https://github.com/christophehurpeau/pobpack/commit/dc090f20eecc416d8cc8581cf4f159f6f082d400))
* config webpack-dev-server ([43853b6](https://github.com/christophehurpeau/pobpack/commit/43853b636b7ad91659623c879339897ead7e62f6))
* debounce restart ([d0c2abf](https://github.com/christophehurpeau/pobpack/commit/d0c2abf76cc307d716578dc220e19c3052d9aedb))
* devServer watchOptions ([485ce36](https://github.com/christophehurpeau/pobpack/commit/485ce363a988bc72de4a2d34950c74ba2c83ef56))
* downgrade react-dev-utils and update doc on react-hot-loader ([29585f1](https://github.com/christophehurpeau/pobpack/commit/29585f126acad6323bfaf8c10e3b077674d4dd9b))
* entry remove target ([a204dec](https://github.com/christophehurpeau/pobpack/commit/a204dec148711038be699b881aeaa9ec08719709))
* missing extra exports ([08493d2](https://github.com/christophehurpeau/pobpack/commit/08493d2319ff0ec228812f923a409f9ebe90ac5d))
* missing package field browser ([f7e6ebd](https://github.com/christophehurpeau/pobpack/commit/f7e6ebd56034335fdaf9e1219f7eec3a37ae7562))
* missing typings ([e4a8c6e](https://github.com/christophehurpeau/pobpack/commit/e4a8c6ef4469332d76a13d261d1171984afd5dae))
* modern-browsers ([605224d](https://github.com/christophehurpeau/pobpack/commit/605224d8bfb19bd98b9df95ecf4f776b6d2e626e))
* only resolve src in app directory and few flow fixes ([f575cb6](https://github.com/christophehurpeau/pobpack/commit/f575cb65e99867bd12bb91044f133d6efafbcfca))
* quiet true ([7da503f](https://github.com/christophehurpeau/pobpack/commit/7da503f651e1f702aad1503bed5a027a0ac61170))
* regexp ([d47048c](https://github.com/christophehurpeau/pobpack/commit/d47048c097fa36e0aac94134774069a290fc1e6b))
* remove webpack.SourceMapDevToolPlugin ([e7da543](https://github.com/christophehurpeau/pobpack/commit/e7da543046a2fd5cb4e9c80c7a6f668f32655fec))
* resolve peerdep @hot-loader/react-dom from process.cwd ([00e205e](https://github.com/christophehurpeau/pobpack/commit/00e205e26df44864ef54b470d428452b25787044))
* resolve react-hot-loader from cwd too ([ea70c64](https://github.com/christophehurpeau/pobpack/commit/ea70c64ada8deda4e6dfc5944c86e9bbabe57fbe))
* update minor dependencies ([f18bcf6](https://github.com/christophehurpeau/pobpack/commit/f18bcf6333475755a7186e94dd31be051b0c4d03))
* update react-dev-tools ([476b871](https://github.com/christophehurpeau/pobpack/commit/476b871afa162dcba3722ab5e3faeaecf001fb7f))
* **deps:** update dependency find-up to v4 ([#67](https://github.com/christophehurpeau/pobpack/issues/67)) ([d08579a](https://github.com/christophehurpeau/pobpack/commit/d08579a20ce36c7aa4189aa3d850f1c32d83e924))
* **deps:** update dependency react-dev-utils to v9 ([#64](https://github.com/christophehurpeau/pobpack/issues/64)) ([4dee585](https://github.com/christophehurpeau/pobpack/commit/4dee5853b782f1cb58123a8bf6182c76e81c0dc2))
* resolve browser package field ([b0bb2e2](https://github.com/christophehurpeau/pobpack/commit/b0bb2e23b2e31d6be73196e2552f8c83c78b7041))
* restart after compile error ([cfea9c5](https://github.com/christophehurpeau/pobpack/commit/cfea9c5683ab325071e28c09db8f95383aab99a7))
* source-map-support ([7f56734](https://github.com/christophehurpeau/pobpack/commit/7f56734731b99809cd365da4dfcbd1b04a77f617))
* sourcemap path for pobpack-node ([d6191de](https://github.com/christophehurpeau/pobpack/commit/d6191de3e65c68d1db83291f24b040cd9e523a63))
* sourcemaps ([a822c06](https://github.com/christophehurpeau/pobpack/commit/a822c06fe7bbbdfd240fa04bedb116d947419d5c))
* type Options in runDevServer extends WebpackDevServerConfiguration ([a54091c](https://github.com/christophehurpeau/pobpack/commit/a54091c6ce36b08c79d43322d49b755ba82dd0b8))
* typescript resolve extensions ([0ce5ef1](https://github.com/christophehurpeau/pobpack/commit/0ce5ef1c0e7d1e0dca2d5ae38ab9a0fb0a0d93ed))
* update .map ([23cc7c1](https://github.com/christophehurpeau/pobpack/commit/23cc7c1426d2f4fb22f969947994a418461eccb9))
* update dependencies ([3342f3d](https://github.com/christophehurpeau/pobpack/commit/3342f3dcb538eb1dc75ef02dbe1edd9d41cbd1ce))
* webpack 4 deprecation warning ([4ab279d](https://github.com/christophehurpeau/pobpack/commit/4ab279de70e2cf34f4d34096638d3620a366470d))
* **pobpack-node:** node-externals use node_modules ([d679d7d](https://github.com/christophehurpeau/pobpack/commit/d679d7dabb32d43657af051dad2773171cfdb084))
* update dependencies ([975a9d1](https://github.com/christophehurpeau/pobpack/commit/975a9d1995c31ffecb1bb9dc7f8bb6e8434b33c3))


### chore

* update config and drop node 8 ([2c98e79](https://github.com/christophehurpeau/pobpack/commit/2c98e796b3ea693ee3d7fdd92e108942572f82a9))


### Code Refactoring

* options, springbokjs-daemon@2 ([44a65cb](https://github.com/christophehurpeau/pobpack/commit/44a65cb24c08f3cc82ce4f7262d78a8c34925778))
* typescript ([48da444](https://github.com/christophehurpeau/pobpack/commit/48da4440545b21063c686d6eb4245983fe49224c))
* webpack 4, targets, minify when production ([69136a5](https://github.com/christophehurpeau/pobpack/commit/69136a55167f1ad3b4a420cbac0c61df63b1cd1d))
* webpack 5 ([0b32c76](https://github.com/christophehurpeau/pobpack/commit/0b32c76e255307fba7934a97e03c75a9fdd631ff))


### Features

* update webpack-node-externals ([e523d7d](https://github.com/christophehurpeau/pobpack/commit/e523d7d7d0a160b70cf767097f181ebbc6d98a21))
* **deps:** update dependency find-up to v5 ([#150](https://github.com/christophehurpeau/pobpack/issues/150)) ([d92293f](https://github.com/christophehurpeau/pobpack/commit/d92293f6de90d0146c75257f96362143f865e030))
* **pobpack-node:** add nodeArgs ([2e68a04](https://github.com/christophehurpeau/pobpack/commit/2e68a04dc4c9bec73ff3985c0a79682f03f6bfa9))
* add mjs support ([025ad70](https://github.com/christophehurpeau/pobpack/commit/025ad70345f271db786edd01f16c0e41040991fa))
* add options.whitelistExternalExtensions ([baa06ce](https://github.com/christophehurpeau/pobpack/commit/baa06ceb093d8240663e0a1e95684a063827f15f))
* add service worker support with workbox plugin ([6d3d11d](https://github.com/christophehurpeau/pobpack/commit/6d3d11dc54aac9f0c705ae2741b9e6df189db641))
* add type FilledWebpackConfiguration ([c65d50c](https://github.com/christophehurpeau/pobpack/commit/c65d50cb9acbcf36cf6e747e1bb7f22b6f4f04fb))
* add use strict ([771a002](https://github.com/christophehurpeau/pobpack/commit/771a0025fbeabf210d8276d74f12fd0503ee4a6d))
* allow to pass compilerOptions in createAppNodeCompiler ([0f9e5be](https://github.com/christophehurpeau/pobpack/commit/0f9e5be19c52f65a6f7ede95e257cfe190d4d188))
* handle any-promise ([6e0d62d](https://github.com/christophehurpeau/pobpack/commit/6e0d62ddc6c6a239b1fe2141ed00f4d72c706412))
* implements Watching to kill daemon ([a072255](https://github.com/christophehurpeau/pobpack/commit/a072255d7963d1536abd521b9ed4614233a758df))
* improve prependPlugins definition ([1991ac7](https://github.com/christophehurpeau/pobpack/commit/1991ac7f6e0e387cd2ee340603b3827fbe65e38a))
* optimization option and node_modules parents support ([e871c24](https://github.com/christophehurpeau/pobpack/commit/e871c2476389c718894f03a4e97f7f5e190311d2))
* pob update, webpack 4 ([6ce8705](https://github.com/christophehurpeau/pobpack/commit/6ce870585bb1412cc3aae6aeec730b4f8ad6e898))
* replace ponyfills Array.isArray Object.setPrototypeOf and String.prototype.repeat ([68fd834](https://github.com/christophehurpeau/pobpack/commit/68fd834a54ba6f9a7ba839a317e214d9873bd2aa))
* requires node 12 ([a54fcad](https://github.com/christophehurpeau/pobpack/commit/a54fcad72fe153a04fe615f922145444c3611f59))
* support typescript ([4920d1a](https://github.com/christophehurpeau/pobpack/commit/4920d1a63b5c91a31d55b0abdb9365416de50fce))
* update dependencies ([9f54ca8](https://github.com/christophehurpeau/pobpack/commit/9f54ca89fccfd5cc79fa92997fd15b255c573773))
* update dependencies ([e255a7b](https://github.com/christophehurpeau/pobpack/commit/e255a7b59e5c2d836208a5a10865c0b284b1188e))
* update dependencies ([45f1fd1](https://github.com/christophehurpeau/pobpack/commit/45f1fd1cd8bb7a59f5ca2a99cab308526625925c))
* update dependencies, replace chalk by colorette and resolve includeModules from pwd ([ccea3a8](https://github.com/christophehurpeau/pobpack/commit/ccea3a8a29baae939ad98e89b52a5d7c5a0f4fa1))
* update deps ([5e3fa35](https://github.com/christophehurpeau/pobpack/commit/5e3fa3531664be52a319d7045f301bad755161de))
* update deps ([a472983](https://github.com/christophehurpeau/pobpack/commit/a4729833f6f3f9e37fc089597f52fcbc1a743c90))
* update minor dependencies ([5415706](https://github.com/christophehurpeau/pobpack/commit/5415706b8de0ede02f70de48bd2d784e9aea3171))
* update nightingale and springbokjs-daemon ([b2dcb50](https://github.com/christophehurpeau/pobpack/commit/b2dcb50349a814ad6f9adc8ec71b6f22cc452f03))
* update nightingale deps ([d8010d5](https://github.com/christophehurpeau/pobpack/commit/d8010d5152f443d1093e1f72105f0980416c34c3))
* update react-dev-utils ([8ff5d06](https://github.com/christophehurpeau/pobpack/commit/8ff5d065fa0c5bd8c6a8481d0e8ae89fe0650811))
* update react-scripts ([bf29e29](https://github.com/christophehurpeau/pobpack/commit/bf29e297fc855177da462ca58cbf3f9505bc4f40))
* update springbokjs-daemon ([7019f91](https://github.com/christophehurpeau/pobpack/commit/7019f91f449787592bd75558de6bb5ddf177b06c))
* update webpack-dev-server ([8d8838a](https://github.com/christophehurpeau/pobpack/commit/8d8838ac4319e322cfeeee2f694ec4fc33e2a334))
* use process.send to notify parent process ([f8c478f](https://github.com/christophehurpeau/pobpack/commit/f8c478f5dfcd8ce43e32729af6eaa3b5b7de1eab))
* use react fast refresh ([6062291](https://github.com/christophehurpeau/pobpack/commit/6062291329b2ffe6eb8f2c7637ec9a8fe97dfdbb))
* **pobpack-browser:** export hot function as pobpack-browser/hot ([72025c9](https://github.com/christophehurpeau/pobpack/commit/72025c9e3f55f88d108ee4615a5665d4561c2f1b))
* add chalk and better progress bar ([447703b](https://github.com/christophehurpeau/pobpack/commit/447703bf6bf968be8f45950daa100b05bb822376))
* add env in success log ([702844d](https://github.com/christophehurpeau/pobpack/commit/702844d2811d78d60d57fdb318f8753a42043890))
* add options ([6454aeb](https://github.com/christophehurpeau/pobpack/commit/6454aeb5aabc66ffaa37c0af2a2c7a6fa0af7e01))
* build previous commit ([7a1e687](https://github.com/christophehurpeau/pobpack/commit/7a1e68742403355f980daa80bf220659717d3292))
* first commit ([6aac4d2](https://github.com/christophehurpeau/pobpack/commit/6aac4d28cecec0237723a72e042775df2e765e16))
* first commit ([47d51bf](https://github.com/christophehurpeau/pobpack/commit/47d51bfcb7b746dddc0a5da3c66bd3bfa0935716))
* first commit ([5502b7d](https://github.com/christophehurpeau/pobpack/commit/5502b7da15e3109047c6dc5d49b916d6cc266b39))
* fixes, options.paths.entry, and case-sensitive-paths-webpack-plugin ([a26f8cb](https://github.com/christophehurpeau/pobpack/commit/a26f8cb0813abdfe92f439c56368e0ae1cbf53f3))
* includeModules ([0edef58](https://github.com/christophehurpeau/pobpack/commit/0edef58fd9b3f83ec4ffc921822ebe535568688b))
* initialize options before calling appWebpackConfig ([8631c80](https://github.com/christophehurpeau/pobpack/commit/8631c809b9e03ad158b2b5b2506d646035a14048))
* node7 and additional flowtype ([47e16af](https://github.com/christophehurpeau/pobpack/commit/47e16af792618f29eba49014df7da7ee64445e2a))
* option host for webpack-dev-server ([6b6c431](https://github.com/christophehurpeau/pobpack/commit/6b6c4313c463794df613dedbc513c4b702a84b65))
* options.aliases + options.includePaths ([b7cf0bc](https://github.com/christophehurpeau/pobpack/commit/b7cf0bc593313476c3bc8f704fa0613160776fde))
* options.defines ([5b32ad7](https://github.com/christophehurpeau/pobpack/commit/5b32ad77fbfdb5242413f179821cfdee85e94e4d))
* pobpack-utils ([6d5c8c9](https://github.com/christophehurpeau/pobpack/commit/6d5c8c911ce89ba45e162759c44508308c6ca2b8))
* pobpack-utils@0.2 ([27a63e8](https://github.com/christophehurpeau/pobpack/commit/27a63e8aaeea18d1c2069bc4cefd2df2943b8b43))
* pobpack-utils@0.2 ([d26781f](https://github.com/christophehurpeau/pobpack/commit/d26781f8114380afce0290934cc278cdb8a07a68))
* pobpack-utils@0.3.0 ([5ea3344](https://github.com/christophehurpeau/pobpack/commit/5ea3344a177b684d3c04a56c6df968aae20b7a27))
* react-error-html@0.2 ([6e60172](https://github.com/christophehurpeau/pobpack/commit/6e60172f64d76a41ba7c45c7d54abc4e79eedde5))
* resolve add module aliases ([4fa0351](https://github.com/christophehurpeau/pobpack/commit/4fa0351b1527e299835c2e3d26ab51c1d39afb20))
* resolve src modules too ([413905a](https://github.com/christophehurpeau/pobpack/commit/413905a1b4a71d923212e0e167495c5e21988ee0))
* rewrite FriendlyErrorsWebpackPlugin using react-dev-utils ([14cf7ab](https://github.com/christophehurpeau/pobpack/commit/14cf7ab99196d48837246790fd54ff01a391592d))
* sourcemaps and hot reload with react-hot-loader ([900e080](https://github.com/christophehurpeau/pobpack/commit/900e08045ea89208b94b09596b5c5132614e8c63))
* support module field in package.json ([2574a28](https://github.com/christophehurpeau/pobpack/commit/2574a282e6a4aa86c4bc2939d0d3a2e482b8fa67))
* update dependencies ([3626862](https://github.com/christophehurpeau/pobpack/commit/3626862a15e18e2323b9d57bf8326fce180564d1))
* update dependencies ([a5fcc3d](https://github.com/christophehurpeau/pobpack/commit/a5fcc3de476db70bb7ce0f777982d071b96e626b))
* update dependencies and fix flow ([c598f1c](https://github.com/christophehurpeau/pobpack/commit/c598f1cd77fbba385e69d66ccfd20379642da3d3))
* update dependencies and node 8.3 ([bc648e2](https://github.com/christophehurpeau/pobpack/commit/bc648e2f2d1327c00fcce800658e8e796c7fca13))
* use babel-preset-latest-node ([30acd9b](https://github.com/christophehurpeau/pobpack/commit/30acd9bc04c66c716772ba808e4f72ba0571e62b))
* use others module: aliases ([6f3dbee](https://github.com/christophehurpeau/pobpack/commit/6f3dbeefaea2c31fb6f0a799fb391ce4aa6ec492))
* use package.json for nodeExternals ([13de6b1](https://github.com/christophehurpeau/pobpack/commit/13de6b13c8b44d30972b0a0de24f8dc45786da71))
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
* options change, see README for more info
* removed webpack.SourceMapDevToolPlugin

fix: remove webpack.SourceMapDevToolPlugin
* replace externalModules by includeModules
