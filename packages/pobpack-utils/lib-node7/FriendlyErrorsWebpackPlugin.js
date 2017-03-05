'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _nightingale = require('nightingale');

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

var _nightingaleConsole = require('nightingale-console');

var _nightingaleConsole2 = _interopRequireDefault(_nightingaleConsole);

var _formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

var _formatWebpackMessages2 = _interopRequireDefault(_formatWebpackMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

(0, _nightingale.addConfig)({ key: 'pobpack-utils', handler: new _nightingaleConsole2.default(_nightingale.levels.INFO) });
const logger = new _nightingaleLogger2.default('pobpack-utils', 'pobpack');
const isSuccessful = messages => !messages.errors.length && !messages.warnings.length;

let FriendlyErrorsWebpackPlugin = class {

  constructor(options) {
    Object.assign(this, options);
    this.logger = logger.context({ bundleName: options.bundleName });
  }

  apply(compiler) {
    // webpack is recompiling
    compiler.plugin('invalid', () => {
      this.logger.info('Compiling...');
    });

    // compilation done
    compiler.plugin('done', stats => {
      const messages = (0, _formatWebpackMessages2.default)(stats.toJson({}, true));

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
};
exports.default = FriendlyErrorsWebpackPlugin;
//# sourceMappingURL=FriendlyErrorsWebpackPlugin.js.map