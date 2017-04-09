'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2; /* eslint-disable no-console */

var _nightingale = require('nightingale');

var _nightingaleLogger = require('nightingale-logger');

var _nightingaleLogger2 = _interopRequireDefault(_nightingaleLogger);

var _nightingaleConsole = require('nightingale-console');

var _nightingaleConsole2 = _interopRequireDefault(_nightingaleConsole);

var _formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

var _formatWebpackMessages2 = _interopRequireDefault(_formatWebpackMessages);

var _flowRuntime = require('flow-runtime');

var _flowRuntime2 = _interopRequireDefault(_flowRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['keys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['defineProperty'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper() {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

const OptionsType = _flowRuntime2.default.type('OptionsType', _flowRuntime2.default.exactObject(_flowRuntime2.default.property('bundleName', _flowRuntime2.default.string()), _flowRuntime2.default.property('successMessage', _flowRuntime2.default.nullable(_flowRuntime2.default.string()))));

(0, _nightingale.addConfig)({ key: 'pobpack-utils', handler: new _nightingaleConsole2.default(_nightingale.levels.INFO) });
const logger = new _nightingaleLogger2.default('pobpack-utils', 'pobpack');
const isSuccessful = messages => !messages.errors.length && !messages.warnings.length;

let FriendlyErrorsWebpackPlugin = (_dec = _flowRuntime2.default.decorate(_flowRuntime2.default.string()), _dec2 = _flowRuntime2.default.decorate(_flowRuntime2.default.nullable(_flowRuntime2.default.string())), (_class = class {

  constructor(options) {
    _initDefineProp(this, 'bundleName', _descriptor, this);

    _initDefineProp(this, 'successMessage', _descriptor2, this);

    let _optionsType = _flowRuntime2.default.nullable(OptionsType);

    _flowRuntime2.default.param('options', _optionsType).assert(options);

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
        this.logger.success('Compiled successfully!', { env: this.env });
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
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'bundleName', [_dec], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'successMessage', [_dec2], {
  enumerable: true,
  initializer: null
})), _class));
exports.default = FriendlyErrorsWebpackPlugin;
//# sourceMappingURL=FriendlyErrorsWebpackPlugin.js.map