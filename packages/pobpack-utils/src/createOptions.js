// /* eslint-disable flowtype/no-weak-types */
//
type ConfigPathsType = {|
  build?: string,
  src?: string,
|};

type ConfigEntryType =
  | string
  | {|
      key: string,
      path: string,
    |};

type BabelConfigType = Object;

export type OptionsType = {|
  aliases?: ?{ [string]: any },
  babel?: ?BabelConfigType,
  defines?: ?{ [string]: any },
  entries?: ?Array<ConfigEntryType>,
  env?: ?string,
  hmr?: boolean,
  includeModules?: ?Array<string>,
  includePaths?: ?Array<string>,
  jsLoaders?: ?Array<any>,
  moduleRules?: ?Array<any>,
  paths?: ?ConfigPathsType,
  plugins?: ?Array<any>,
  prependPlugins?: ?Array<any>,
  resolveLoaderModules?: ?Array<string>,
  typescript?: ?boolean,
  webpackPrefixPackageFields?: ?Array<string>,
|};

export default (options: Object): OptionsType => ({
  aliases: options.aliases || {},
  babel: options.babel,
  defines: options.defines || {},
  entries: options.entries || ['index'],
  env: options.env || process.env.NODE_ENV,
  hmr: options.hmr,
  includeModules: options.includeModules || [],
  includePaths: options.includePaths || [],
  jsLoaders: options.jsLoaders,
  moduleRules: options.moduleRules,
  paths: { src: 'src', build: 'build', ...options.paths },
  plugins: options.plugins || [],
  prependPlugins: options.prependPlugins || [],
  resolveLoaderModules: options.resolveLoaderModules,
  typescript: options.typescript || false,
  webpackPrefixPackageFields: options.webpackPrefixPackageFields || [],
});
