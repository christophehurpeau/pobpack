import { join } from 'path';
import { node } from 'springbokjs-daemon/src';
import { build, watch } from './index';
import config from './config';

const BUILD = process.argv[2] === 'build';

if (BUILD) {
  build();
} else {
  const daemon = node([join(config.server.paths.build)], { autorestart: true });
  watch((err, stats) => {
    if (!daemon.process) {
      daemon.start();
    } else {
      // already started, send a signal to ask hot reload
      daemon.process.kill('SIGUSR2');
    }
  });
}
