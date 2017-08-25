'use strict';

var _index = require('./index');

const cmd = process.argv[2];

cmd === 'build' ? (0, _index.build)() : cmd !== 'start' && cmd ? (console.log(`Invalid command: ${cmd}`), process.exit(1)) : (0, _index.watchAndRun)();
//# sourceMappingURL=cli.js.map