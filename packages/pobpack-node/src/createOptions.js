type ConfigPathsType = {|
  src: string,
  build: string,
  entry: string,
|};

export type OptionsType = {
  env: ?string,
  hmr: boolean,
  babel: ?Object,
  jsLoaders: ?Array<any>,
  moduleRules: ?Array<any>,
  prependPlugins: ?Array<any>,
  plugins: ?Array<any>,
  paths: ConfigPathsType,
}

export default (options: Object): OptionsType => ({
  env: options.env || process.env.NODE_ENV,
  hmr: options.hmr,
  babel: options.babel,
  jsLoaders: options.jsLoaders,
  moduleRules: options.moduleRules,
  plugins: options.plugins,
  prependPlugins: options.prependPlugins,
  paths: { src: 'src', build: 'build', entry: 'index.js', ...options.paths },
});
