import { TransformOptions } from '@babel/core';
import { Compiler, Configuration } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

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
  includeModules: Array<string>;
  includePaths: Array<string>;
  jsLoaders?: Array<any>;
  moduleRules?: Array<any>;
  paths: ConfigPaths;
  plugins: Array<any>;
  prependPlugins: Array<any>;
  resolveLoaderModules?: Array<string>;
  typescript: boolean;
  webpackPrefixPackageFields: Array<string>;
}


export type WatchCallback = (stats: any) => void;


export interface PobpackCompiler {
  clean: () => void | Buffer;
  compiler: any;
  run: () => Promise<void>;
  watch: (callback: WatchCallback) => Compiler.Watching;
  webpackConfig: Configuration;
}



export interface CreateCompilerOptions {
  progressBar?: boolean;
  successMessage?: string;
}
