/* eslint-disable no-console */

import { addConfig, levels } from 'nightingale/src';
import Logger from 'nightingale-logger/src';
import ConsoleHandler from 'nightingale-console/src';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';

type OptionsType = {|
  bundleName: string,
  successMessage: ?string,
|};

addConfig({ key: 'pobpack-utils', handler: new ConsoleHandler(levels.INFO) });
const logger = new Logger('pobpack-utils', 'pobpack');
const isSuccessful = messages => !messages.errors.length && !messages.warnings.length;

export default class FriendlyErrorsWebpackPlugin {
  bundleName: string;
  successMessage: ?string;

  constructor(options: ?OptionsType) {
    Object.assign(this, options);
    this.logger = logger.context({ bundleName: options.bundleName });
  }

  apply(compiler) {
    // webpack is recompiling
    compiler.plugin('invalid', () => {
      this.logger.info('Compiling...');
    });

    // compilation done
    compiler.plugin('done', (stats) => {
      const messages = formatWebpackMessages(stats.toJson({}, true));

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
        messages.errors.forEach((message) => {
          console.log(message);
          console.log();
        });
        return;
      }

      if (messages.warnings.length) {
        this.logger.critical('Compiled with warnings.');
        console.log();
        messages.warnings.forEach((message) => {
          console.log(message);
          console.log();
        });
      }
    });
  }
}
