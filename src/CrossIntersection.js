/* @flow */
import { white, red, green, yellow } from 'colors/safe';

import Intersection from './Intersection';
import TrafficLight from './TrafficLight';
import TrafficLightSet from './TrafficLightSet';

/**
 * CrossIntersection represents a 4-way intersection
 *
 *        │  ╷  │
 *      W │  ╷  │ N
 * ───────┘  ╷  └───────
 *  - - - - - - - - - -
 * ───────┐  ╵  ┌───────
 *      S │  ╵  │ E
 *        │  ╵  │
 *
 * @export
 * @class CrossIntersection
 */
export default class CrossIntersection extends Intersection {

  north: TrafficLight;
  east: TrafficLight;
  south: TrafficLight;
  west: TrafficLight;

  constructor(interval?: number, amberAt?: number) {

    const north = new TrafficLight();
    const east = new TrafficLight();
    const south = new TrafficLight();
    const west = new TrafficLight();

    const northSouth = new TrafficLightSet(north, south);
    const eastWest = new TrafficLightSet(east, west);

    super(interval, amberAt, northSouth, eastWest);

    this.north = north;
    this.east = east;
    this.south = south;
    this.west = west;
  }

  render() {

    const n = this._getLightIcons(this.north);
    const e = this._getLightIcons(this.east);
    const s = this._getLightIcons(this.south);
    const w = this._getLightIcons(this.west);

    const timeLeft = this.interval - this.elapsedTime;
    const minutesLeft = Math.max(Math.floor(timeLeft / 60), 0);
    let secondsLeft = Math.max(timeLeft - minutesLeft * 60, 0);
    if (secondsLeft <= 9) {
      secondsLeft = '0' + secondsLeft;
    }

    return white(`
                     ${minutesLeft}:${secondsLeft}
        │  ╷  │ ${n.green}
    W   │  ╷  │ ${n.amber} N
  ${w.green} ${w.amber} ${w.red} │  ╷  │ ${n.red}
────────┘  ╷  └────────
- - - - - - - - - - - -
────────┐  ╵  ┌────────
      ${s.red} │  ╵  │ ${e.red} ${e.amber} ${e.green}
    S ${s.amber} │  ╵  │   E
      ${s.green} │  ╵  │

`);
  }

  _getLightIcons(trafficLight: TrafficLight) {
    return {
      red: red(trafficLight.lights[0].illuminated ? '◉' : '◯'),
      amber: yellow(trafficLight.lights[2].illuminated ? '◉' : '◯'),
      green: green(trafficLight.lights[1].illuminated ? '◉' : '◯'),
    }
  }

  getTableHeaders() {
    return ['Time', 'North', 'South', 'East', 'West'];
  }
}
