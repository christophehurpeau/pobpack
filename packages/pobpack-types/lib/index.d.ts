import { TransformOptions } from '@babel/core';
import { Compiler, Configuration, RuleSetUseItem, Stats } from 'webpack';

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
  entries: ConfigEntry[];
  serviceWorkerEntry: false | string;
  env?: string;
  hmr?: boolean;
  whitelistExternalExtensions: string[];
  includeModules: string[];
  includePaths: string[];
  jsLoaders?: RuleSetUseItem[];
  moduleRules?: NonNullable<Configuration['module']>['rules'];
  paths: ConfigPaths;
  plugins: (
    | NonNullable<Configuration['plugins']>[number]
    | undefined
    | false
  )[];
  optimization?: Configuration['optimization'];
  prependPlugins?: (
    | NonNullable<Configuration['plugins']>[number]
    | undefined
    | false
  )[];
  resolveLoaderModules?: string[];
  typescript: boolean;
  webpackPrefixPackageFields: string[];
}

export type WatchCallback = (stats: Stats | undefined) => void;

export type FilledWebpackConfigurationKeys =
  | 'mode'
  | 'bail'
  | 'target'
  | 'devtool'
  | 'optimization'
  | 'resolveLoader'
  | 'resolve'
  | 'entry'
  | 'output';
export type FilledWebpackConfiguration = Pick<
  Configuration,
  Exclude<keyof Configuration, FilledWebpackConfigurationKeys>
> &
  Required<Pick<Configuration, FilledWebpackConfigurationKeys>>;

export interface PobpackCompiler {
  clean: () => void | Buffer;
  compiler: Compiler;
  run: () => Promise<Stats | undefined>;
  watch: (callback: WatchCallback) => Compiler.Watching;
  webpackConfig: Readonly<FilledWebpackConfiguration>;
}

export interface CreateCompilerOptions {
  progressBar?: boolean;
  successMessage?: string;
}
