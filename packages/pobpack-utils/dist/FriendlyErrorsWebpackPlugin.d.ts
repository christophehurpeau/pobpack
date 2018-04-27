/// <reference types="webpack" />
import Logger from 'nightingale-logger';
import { Compiler } from 'webpack';
export interface Options {
    bundleName: string;
    successMessage?: string;
}
export default class FriendlyErrorsWebpackPlugin {
    logger: Logger;
    bundleName: string;
    successMessage?: string;
    constructor(options: Options);
    apply(compiler: Compiler): void;
}
