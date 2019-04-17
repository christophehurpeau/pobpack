import { TransformOptions } from '@babel/core';
import { Compiler, Configuration, Stats, Options as WebpackOptions } from 'webpack';

export interface ConfigPaths {
  build?: string;
  src?: string;
}

export interface ConfigEntryObject {
  key: string;
  path: string;
}

export type ConfigEntry = string | ConfigEntryObject;

export interface Options {
  aliases: { [key: string]: any };
  babel: TransformOptions;
  defines: { [key: string]: any };
  entries: Array<ConfigEntry>;
  env?: string;
  hmr?: boolean;
  whitelistExternalExtensions: Array<string>;
  includeModules: Array<string>;
  includePaths: Array<string>;
  jsLoaders?: Array<any>;
  moduleRules?: Array<any>;
  paths: ConfigPaths;
  plugins: Array<any>;
  optimization?: WebpackOptions.Optimization;
  prependPlugins: Array<any>;
  resolveLoaderModules?: Array<string>;
  typescript: boolean;
  webpackPrefixPackageFields: Array<string>;
}


export type WatchCallback = (stats: any) => void;

export type FilledWebpackConfigurationKeys = 'mode' | 'bail' | 'target' | 'devtool' | 'optimization' | 'resolveLoader' | 'resolve' | 'entry' | 'output';
export type FilledWebpackConfiguration =
  Pick<Configuration, Exclude<keyof Configuration, FilledWebpackConfigurationKeys>> & Required<Pick<Configuration, FilledWebpackConfigurationKeys>>;

export interface PobpackCompiler {
  clean: () => void | Buffer;
  compiler: Compiler;
  run: () => Promise<Stats>;
  watch: (callback: WatchCallback) => Compiler.Watching;
  webpackConfig: Readonly<FilledWebpackConfiguration>;
}

export interface CreateCompilerOptions {
  progressBar?: boolean;
  successMessage?: string;
}
