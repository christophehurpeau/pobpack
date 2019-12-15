/// <reference types="webpack" />
import WebpackDevServer, { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { Options, PobpackCompiler, WatchCallback, CreateCompilerOptions } from 'pobpack-types';
import { TARGETS, ALL, MODERN, BrowserTargetType } from './createBrowserWebpackConfig';
export { TARGETS, ALL, MODERN };
export declare const createAppBrowserCompiler: (target: BrowserTargetType, options: Partial<Options>, compilerOptions?: CreateCompilerOptions | undefined) => PobpackCompiler;
export declare const build: (options?: {}) => Promise<import("webpack").Stats>[];
export declare const watch: (options: Partial<Options>, callback?: WatchCallback | undefined) => PobpackCompiler;
declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export interface RunOptions extends Omit<WebpackDevServerConfiguration, 'hot' | 'quiet' | 'overlay' | 'compress' | 'before'> {
    host?: string;
    https?: boolean;
    port: number;
}
export declare const runDevServer: (compiler: PobpackCompiler, options: RunOptions, srcPath?: string) => WebpackDevServer;
export declare type PobpackBrowserCompiler = PobpackCompiler & {
    webpackDevServer: WebpackDevServer;
};
export declare const watchAndRunDevServer: (options: Partial<Options>, runOptions: RunOptions) => PobpackBrowserCompiler;
//# sourceMappingURL=index.d.ts.map