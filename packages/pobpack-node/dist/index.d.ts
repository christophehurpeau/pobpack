/// <reference types="webpack" />
import { webpack } from 'pobpack-utils';
import { CreateCompilerOptions, Options, PobpackCompiler, WatchCallback } from 'pobpack-types';
export declare const createAppNodeCompiler: (options: Partial<Options>, compilerOptions?: CreateCompilerOptions | undefined) => PobpackCompiler;
export declare const build: (options?: {}) => Promise<webpack.Stats>;
export declare const watch: (options: Partial<Options>, callback: WatchCallback) => PobpackCompiler;
export interface RunOptions {
    args?: (string | number)[];
    cwd?: string;
    displayName?: string;
    key?: string;
}
export declare const watchAndRunCompiler: (compiler: PobpackCompiler, options?: RunOptions) => webpack.Watching;
export declare const watchAndRun: (options?: Partial<Options> | undefined) => PobpackCompiler;
//# sourceMappingURL=index.d.ts.map