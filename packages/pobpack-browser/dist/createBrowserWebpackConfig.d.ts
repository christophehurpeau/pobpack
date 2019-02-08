import { Options, FilledWebpackConfiguration } from 'pobpack-types';
export declare type BrowserTargetType = 'modern' | 'all';
export declare const MODERN = "modern";
export declare const ALL = "all";
export declare const TARGETS: BrowserTargetType[];
declare const _default: (target: BrowserTargetType) => (options: Options) => FilledWebpackConfiguration;
export default _default;
//# sourceMappingURL=createBrowserWebpackConfig.d.ts.map