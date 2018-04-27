/// <reference types="webpack" />
import webpack from 'webpack';
import { PobpackCompiler, CreateCompilerOptions } from 'pobpack-types';
declare const _default: (bundleName: string, webpackConfig: webpack.Configuration, { progressBar, successMessage }?: CreateCompilerOptions) => PobpackCompiler;
export default _default;
