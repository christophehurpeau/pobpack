/// <reference types="webpack-dev-server" />
import WebpackDevServer from 'webpack-dev-server';
import { Options, PobpackCompiler, WatchCallback, CreateCompilerOptions } from 'pobpack-types';
import { TARGETS, ALL, MODERN, BrowserTargetType } from './createBrowserWebpackConfig';
export { TARGETS, ALL, MODERN };
export declare const createAppBrowserCompiler: (target: BrowserTargetType, options: Partial<Options>, compilerOptions?: CreateCompilerOptions | undefined) => PobpackCompiler;
export declare const build: (options?: {}) => Promise<void>[];
export declare const watch: (options: Partial<Options>, callback?: WatchCallback | undefined) => PobpackCompiler;
export interface RunOptions {
    host?: string;
    https?: boolean;
    port: number;
}
export declare const runDevServer: (compiler: PobpackCompiler, options: RunOptions) => WebpackDevServer;
export declare type PobpackBrowserCompiler = PobpackCompiler & {
    webpackDevServer: WebpackDevServer;
};
export declare const watchAndRunDevServer: (options: Partial<Options>, runOptions: RunOptions) => PobpackBrowserCompiler;
