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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nightingale.addConfig)({ key: 'pobpack-utils', handler: new _nightingaleConsole2.default(_nightingale.levels.INFO) }); /* eslint-disable no-console */

const logger = new _nightingaleLogger2.default('pobpack-utils', 'pobpack');
const isSuccessful = messages => !messages.errors.length && !messages.warnings.length;

let FriendlyErrorsWebpackPlugin = class {

  constructor(options) {
    Object.assign(this, options), this.logger = logger.context({ bundleName: options.bundleName });
  }

  apply(compiler) {
    compiler.plugin('invalid', () => {
      this.logger.info('Compiling...');
    }), compiler.plugin('done', stats => {
      // const messages = formatWebpackMessages(stats.toJson({}, true));
      const messages = stats.toJson({}, true);

      return isSuccessful(messages) ? (this.logger.success('Compiled successfully!', { env: this.env }), void (this.successMessage && console.log(this.successMessage))) : messages.errors.length ? (this.logger.critical('Failed to compile.'), console.log(), void messages.errors.forEach(message => {
        console.log(message), console.log();
      })) : void (messages.warnings.length && (this.logger.critical('Compiled with warnings.'), console.log(), messages.warnings.forEach(message => {
        console.log(message), console.log();
      })));
    });
  }
};
exports.default = FriendlyErrorsWebpackPlugin;
//# sourceMappingURL=FriendlyErrorsWebpackPlugin.js.map