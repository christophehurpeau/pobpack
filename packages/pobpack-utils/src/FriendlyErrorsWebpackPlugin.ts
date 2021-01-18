/* eslint-disable no-console */

import { addConfig, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';
import Logger from 'nightingale-logger';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import type { Compiler } from 'webpack';

export interface Options {
  bundleName: string;
  successMessage?: string;
}

addConfig({ key: 'pobpack-utils', handler: new ConsoleHandler(levels.INFO) });
const logger = new Logger('pobpack-utils', 'pobpack');

const pluginName = 'pobpack/FriendlyErrorsWebpackPlugin';

export default class FriendlyErrorsWebpackPlugin {
  logger: Logger;

  bundleName: string;

  successMessage?: string;

  constructor(options: Options) {
    this.bundleName = options.bundleName;
    this.successMessage = options.successMessage;
    this.logger = logger.context({ bundleName: options.bundleName });
  }

  apply(compiler: Compiler): void {
    // webpack is recompiling
    compiler.hooks.invalid.tap(pluginName, () => {
      this.logger.info('Compiling...');
    });

    // compilation done
    compiler.hooks.done.tap(pluginName, (stats) => {
      const messages = formatWebpackMessages(stats.toJson({}));
      // const messages = stats.toJson({}, true);

      if (messages.errors.length > 0) {
        this.logger.critical('Failed to compile.');
        console.log();
        messages.errors.forEach((message: string) => {
          console.log(message);
          console.log();
        });
        return;
      }

      if (process.send) process.send('ready');

      if (messages.warnings.length > 0) {
        this.logger.critical('Compiled with warnings.');
        console.log();
        messages.warnings.forEach((message: string) => {
          console.log(message);
          console.log();
        });
      }

      this.logger.success('Compiled successfully!');
      if (this.successMessage) {
        console.log(this.successMessage);
      }
    });
  }
}
