import { build, watchAndRun } from './index';

const cmd = process.argv[2];

if (cmd === 'build') {
  build();
} else if (cmd === 'start' || !cmd) {
  watchAndRun();
} else {
  console.log(`Invalid command: ${cmd}`);
  process.exit(1);
}
