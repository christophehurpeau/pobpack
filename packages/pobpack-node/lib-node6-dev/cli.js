'use strict';

var _path = require('path');

var _springbokjsDaemon = require('springbokjs-daemon');

var _index = require('./index');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BUILD = process.argv[2] === 'build';

if (BUILD) {
  (0, _index.build)();
} else {
  const daemon = (0, _springbokjsDaemon.node)([(0, _path.join)(_config2.default.server.paths.build)], { autorestart: true });
  (0, _index.watch)(() => {
    if (!daemon.process) {
      daemon.start();
    } else {
      // already started, send a signal to ask hot reload
      daemon.process.kill('SIGUSR2');
    }
  });
}
//# sourceMappingURL=cli.js.map