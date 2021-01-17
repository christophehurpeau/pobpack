/* eslint-disable no-console */

import { addConfig, levels } from 'nightingale';
import ConsoleHandler from 'nightingale-console';
import Logger from 'nightingale-logger';
// import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
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
      console.log();
      this.logger.info('Compiling...');
    });

    // compilation done
    compiler.hooks.done.tap(pluginName, (stats) => {
      console.log();

      if (stats.hasErrors()) {
        this.logger.critical('Failed to compile.');
        console.log();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        stats.toJson({}).errors.map((error: any) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.log(error?.message ? error.message : error),
        );

        return;
      }

      if (process.send) process.send('ready');

      if (stats.hasWarnings()) {
        this.logger.critical('Compiled with warnings.');
        console.log();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        stats.toJson({}).warnings.map((warning: any) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.log(warning?.message ? warning.message : warning),
        );
        return;
      }

      this.logger.success('Compiled successfully!');

      if (this.successMessage) {
        console.log(this.successMessage);
      }
    });
  }
}
