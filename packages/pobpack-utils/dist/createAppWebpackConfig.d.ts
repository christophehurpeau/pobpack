/// <reference types="webpack" />
import webpack from 'webpack';
import { Options } from 'pobpack-types';
export declare type CreateWebpackConfig = (options: Options) => webpack.Configuration;
declare const _default: (createWebpackConfig: CreateWebpackConfig) => (options: Partial<Options>) => any;
export default _default;
