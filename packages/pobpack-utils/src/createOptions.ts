import { Options } from 'pobpack-types';

export default function createOptions(options: Partial<Options>): Options {
  return {
    aliases: options.aliases || {},
    babel: options.babel || {},
    defines: options.defines || {},
    entries: options.entries || ['index'],
    env: options.env || process.env.NODE_ENV,
    hmr: options.hmr,
    whitelistExternalExtensions: options.whitelistExternalExtensions || [],
    includeModules: options.includeModules || [],
    includePaths: options.includePaths || [],
    jsLoaders: options.jsLoaders,
    moduleRules: options.moduleRules,
    paths: { src: 'src', build: 'build', ...options.paths },
    optimization: options.optimization,
    plugins: options.plugins || [],
    prependPlugins: options.prependPlugins || [],
    resolveLoaderModules: options.resolveLoaderModules,
    typescript: options.typescript || false,
    webpackPrefixPackageFields: options.webpackPrefixPackageFields || [],
  };
}
