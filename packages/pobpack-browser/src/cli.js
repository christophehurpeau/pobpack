import { build, watchAndRunDevServer } from './index';

const cmd = process.argv[2];

if (cmd === 'build') {
  build();
} else if (cmd === 'start' || !cmd) {
  watchAndRunDevServer({}, { port: Number(process.env.PORT) || 8080, https: false });
} else {
  console.log(`Invalid command: ${cmd}`);
  process.exit(1);
}
