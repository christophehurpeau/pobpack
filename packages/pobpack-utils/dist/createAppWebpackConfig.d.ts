import { Options, FilledWebpackConfiguration } from 'pobpack-types';
export declare type CreateWebpackConfig = (options: Options) => FilledWebpackConfiguration;
export default function createAppWebpackConfig(createWebpackConfig: CreateWebpackConfig): (options: Partial<Options>) => FilledWebpackConfiguration;
//# sourceMappingURL=createAppWebpackConfig.d.ts.map