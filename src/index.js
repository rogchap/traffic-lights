/* @flow */
import yargs from 'yargs';

import CrossIntersection from './CrossIntersection'

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .command('start', 'Starts the intersection traffic light cycle (default)')
  .command('simulate', 'Outputs the traffic light state changes for a given time')
  .example('$0 start -i 45 -a 5', 'Starts cycle with 45s interval, with amber at 5s')
  .default('i', 10)
  .alias('i', 'interval')
  .describe('i', 'The length of the cycle in seconds')
  .default('a', 3)
  .alias('a', 'amber')
  .describe('a', 'The length of time lights are at amber')
  .default('t', 60)
  .alias('t', 'time')
  .describe('t', 'Used with simulate as the length of time to output results')
  .help('h')
  .alias('h', 'help')
  .argv

const intersection = new CrossIntersection(argv.i, argv.a);
if (argv._.includes('simulate')) {
  intersection.simulate(argv.t);
} else {
  intersection.start();
}
