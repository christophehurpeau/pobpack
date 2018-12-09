/// <reference types="webpack" />
import { webpack } from 'pobpack-utils';
import { Options, PobpackCompiler, WatchCallback } from 'pobpack-types';
export declare const createAppNodeCompiler: (options: Partial<Options>) => PobpackCompiler;
export declare const build: (options?: {}) => Promise<webpack.Stats>;
export declare const watch: (options: Partial<Options>, callback: WatchCallback) => PobpackCompiler;
export interface RunOptions {
    args?: Array<string | number>;
    cwd?: string;
    displayName?: string;
    key?: string;
}
export declare const watchAndRunCompiler: (compiler: PobpackCompiler, options?: RunOptions) => webpack.Compiler.Watching;
export declare const watchAndRun: (options?: Partial<Options> | undefined) => PobpackCompiler;
//# sourceMappingURL=index.d.ts.map