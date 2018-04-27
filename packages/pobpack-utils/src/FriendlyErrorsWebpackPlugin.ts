/* eslint-disable no-console */

import { addConfig, levels } from 'nightingale';
import Logger from 'nightingale-logger';
import ConsoleHandler from 'nightingale-console';
import formatWebpackMessages, { FormattedResult } from 'react-dev-utils/formatWebpackMessages';
import { Compiler } from 'webpack';

export interface Options {
  bundleName: string;
  successMessage?: string;
}

addConfig({ key: 'pobpack-utils', handler: new ConsoleHandler(levels.INFO) });
const logger = new Logger('pobpack-utils', 'pobpack');
const isSuccessful = (messages: FormattedResult) =>
  !messages.errors.length && !messages.warnings.length;

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

  apply(compiler: Compiler) {
    // webpack is recompiling
    compiler.hooks.invalid.tap(pluginName, () => {
      this.logger.info('Compiling...');
    });

    // compilation done
    compiler.hooks.done.tap(pluginName, stats => {
      const messages = formatWebpackMessages(stats.toJson({}));
      // const messages = stats.toJson({}, true);

      if (isSuccessful(messages)) {
        this.logger.success('Compiled successfully!');
        if (this.successMessage) {
          console.log(this.successMessage);
        }
        return;
      }

      if (messages.errors.length) {
        this.logger.critical('Failed to compile.');
        console.log();
        messages.errors.forEach(message => {
          console.log(message);
          console.log();
        });
        return;
      }

      if (messages.warnings.length) {
        this.logger.critical('Compiled with warnings.');
        console.log();
        messages.warnings.forEach(message => {
          console.log(message);
          console.log();
        });
      }
    });
  }
}
