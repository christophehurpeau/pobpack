/* eslint-disable flowtype/no-weak-types */

type ConfigPathsType = {|
  src: string,
  build: string,
|};

type ConfigEntryType =
  | string
  | {|
      key: string,
      path: string,
    |};

type BabelConfigType = Object;

export type OptionsType = {|
  env?: ?string,
  hmr: boolean,
  resolveLoaderModules?: ?Array<string>,
  webpackPrefixPackageFields: Array<string>,
  babel?: ?BabelConfigType,
  jsLoaders?: ?Array<any>,
  moduleRules?: ?Array<any>,
  prependPlugins?: ?Array<any>,
  plugins?: ?Array<any>,
  paths: ConfigPathsType,
  entries?: ?Array<ConfigEntryType>,
  includeModules?: ?Array<string>,
  defines?: ?{ [string]: any },
|};

export default (options: Object): OptionsType => ({
  env: options.env || process.env.NODE_ENV,
  hmr: options.hmr,
  resolveLoaderModules: options.resolveLoaderModules,
  webpackPrefixPackageFields: options.webpackPrefixPackageFields || [],
  babel: options.babel,
  jsLoaders: options.jsLoaders,
  moduleRules: options.moduleRules,
  plugins: options.plugins || [],
  prependPlugins: options.prependPlugins || [],
  paths: { src: 'src', build: 'build', ...options.paths },
  entries: options.entries || ['index'],
  includeModules: options.includeModules || [],
  defines: options.defines || {},
});
