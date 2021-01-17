import type { Options, FilledWebpackConfiguration } from 'pobpack-types';
export declare type CreateWebpackConfig = (options: Options) => FilledWebpackConfiguration;
export declare type CreateWebpackConfigPartialOptions = (options: Partial<Options>) => FilledWebpackConfiguration;
export declare type AppWebpackConfigCreator = (createWebpackConfig: CreateWebpackConfigPartialOptions, options: Partial<Options>) => FilledWebpackConfiguration;
export default function createAppWebpackConfig(createWebpackConfig: CreateWebpackConfig): CreateWebpackConfigPartialOptions;
//# sourceMappingURL=createAppWebpackConfig.d.ts.map