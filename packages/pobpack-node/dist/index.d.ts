import type { CreateCompilerOptions, Options, PobpackCompiler, WatchCallback } from 'pobpack-types';
import type { Stats } from 'webpack';
export declare const createAppNodeCompiler: (options: Partial<Options>, compilerOptions?: CreateCompilerOptions | undefined) => PobpackCompiler;
export declare const build: (options?: {}) => Promise<Stats | undefined>;
export declare const watch: (options: Partial<Options>, callback: WatchCallback) => PobpackCompiler;
export interface RunOptions {
    nodeArgs?: (string | number)[];
    args?: (string | number)[];
    cwd?: string;
    displayName?: string;
    key?: string;
}
export interface Watching {
    invalidate: () => void;
    close: (callback: () => void) => void;
}
export declare const watchAndRunCompiler: (compiler: PobpackCompiler, options?: RunOptions) => Watching;
export declare const watchAndRun: (options?: Partial<Options> | undefined) => PobpackCompiler;
//# sourceMappingURL=index.d.ts.map