'use strict';

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

var _CrossIntersection = require('./CrossIntersection');

var _CrossIntersection2 = _interopRequireDefault(_CrossIntersection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = _yargs2.default.usage('Usage: $0 <command> [options]').command('start', 'Starts the intersection traffic light cycle (default)').command('simulate', 'Outputs the traffic light state changes for a given time').example('$0 start -i 45 -a 5', 'Starts cycle with 45s interval, with amber at 5s').default('i', 10).alias('i', 'interval').describe('i', 'The length of the cycle in seconds').default('a', 3).alias('a', 'amber').describe('a', 'The length of time lights are at amber').default('t', 60).alias('t', 'time').describe('t', 'Used with simulate as the length of time to output results').help('h').alias('h', 'help').argv;

var intersection = new _CrossIntersection2.default(argv.i, argv.a);
if (argv._.includes('simulate')) {
  intersection.simulate(argv.t);
} else {
  intersection.start();
}