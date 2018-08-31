/// <reference types="webpack" />
/// <reference types="webpack-dev-server" />
import { webpack } from 'pobpack-utils';
import { Options } from 'pobpack-types';
export declare type BrowserTargetType = 'modern' | 'all';
export declare const MODERN = "modern";
export declare const ALL = "all";
export declare const TARGETS: Array<BrowserTargetType>;
declare const _default: (target: BrowserTargetType) => (options: Options) => webpack.Configuration;
export default _default;
//# sourceMappingURL=createBrowserWebpackConfig.d.ts.map