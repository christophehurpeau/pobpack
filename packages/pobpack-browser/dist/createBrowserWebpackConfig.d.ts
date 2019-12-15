import { Options, FilledWebpackConfiguration } from 'pobpack-types';
export declare type BrowserTargetType = 'modern' | 'all';
export declare const MODERN = "modern";
export declare const ALL = "all";
export declare const TARGETS: BrowserTargetType[];
export default function createBrowserWebpackConfig(target: BrowserTargetType): (options: Options) => FilledWebpackConfiguration;
//# sourceMappingURL=createBrowserWebpackConfig.d.ts.map