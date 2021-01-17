/* eslint-disable unicorn/no-process-exit */
import { build, watchAndRun } from '.';

const cmd = process.argv[2];

if (cmd === 'build') {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  build();
} else if (cmd === 'start' || !cmd) {
  watchAndRun();
} else {
  console.log(`Invalid command: ${cmd}`);
  process.exit(1);
}
