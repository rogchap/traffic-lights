/* @flow */

import readline from 'readline';
import Table from 'cli-table';
import { red, yellow, green } from 'colors/safe';

import Controller from './Controller';
import Light from './Light';
import TrafficLight from './TrafficLight';
import TrafficLightSet from './TrafficLightSet';

/**
 * Intersection abstract class for any intersection.
 * An intersection has only one controller for all light changes.
 *
 * @export
 * @class Intersection
 */
export default class Intersection {

  _controller: Controller;
  interval: number;
  amberAt: number;
  _hrtime: [number, number];
  elapsedTime: number;

  constructor(interval: number = 45, amberAt: number = 5, ...trafficLights: Array<TrafficLight|TrafficLightSet>) {
    if (amberAt >= interval) {
      throw new Error('amberAt time must be less than the interval time');
    }
    this.interval = interval;
    this.amberAt = amberAt;
    this._controller = new Controller(...trafficLights);
  }

  render() {
    return 'No render function defined';
  }

  start() {
    this.elapsedTime = 0;
    this._hrtime = process.hrtime();
    this._onTick();
  }

  /**
   * For the simulate table output, give Header titles for each Traffic light
   * Defaults to ['Time', 'TL 0-0', 'TL 0-1', 'TL 1-0', ...]
   *
   * @returns {string[]}
   *
   * @memberOf Intersection
   */
  getTableHeaders(): string[] {
    const headers = ['Time'];
    this._controller.trafficLights.forEach((set, idx) => {
      if (set instanceof TrafficLightSet) {
        set.trafficLights.forEach((_, idx2) => {
          headers.push('TL ' + idx + '-' + idx2);
        });
      } else {
        headers.push('TL ' + idx);
      }
    });
    return headers;
  }

  /**
   * simulate will output the traffic light states over a given time period.
   *
   * @param {number} [maxTime=60]
   *
   * @memberOf Intersection
   */
  simulate(maxTime: number = 60) {

    const table = new Table({
      head: this.getTableHeaders(),
      style: {
        head: ['cyan'],
      }
    });

    let time = 0;
    this.elapsedTime = 0;

    const formatTime = (t: number): string => {
      const minutes = Math.max(Math.floor(t / 60), 0);
      let seconds = Math.max(t - minutes * 60, 0);
      if (seconds <= 9) {
        seconds = '0' + seconds;
      }
      return minutes + ':' + seconds;
    }

    const getColor = (light: Light): string => {
      switch (light.color) {
        case 'red':
          return red(light.color);
        case 'amber':
          return yellow(light.color);
        case 'green':
          return green(light.color);
        default:
          return light.color;
      }
    }

    const pushCurrentState = () => {
      const row = [formatTime(time)];

      this._controller.trafficLights.forEach(set => {
        if (set instanceof TrafficLightSet) {
          set.trafficLights.forEach(tl => {
            row.push(getColor(tl.currentLight()));
          });
        } else {
          row.push(getColor(set.currentLight()));
        }
      });

      table.push(row);
    }

    pushCurrentState();

    while (time < maxTime) {

      this.elapsedTime++;
      time++;

      // do we need to change to amber?
      if (this._controller.currentLight().color === 'green'
        && this.elapsedTime == (this.interval - this.amberAt)) {
          this._controller.change();
          pushCurrentState();
      }

      // do we need to change to red?
      if (this.elapsedTime == this.interval) {
        this._controller.change();
        pushCurrentState();
        this.elapsedTime = 0;
      }
    }

    process.stdout.write(table.toString() + '\n');

  }

  _onTick() {
    this.elapsedTime = process.hrtime(this._hrtime)[0];

    // do we need to change to amber?
    if (this._controller.currentLight().color === 'green'
      && this.elapsedTime >= (this.interval - this.amberAt)) {
        this._controller.change();
    }

    // do we need to change to red?
    if (this.elapsedTime > this.interval) {
      this._controller.change();
      this._hrtime = process.hrtime();
    }

    // render view
    readline.cursorTo(process.stdout, 0, 0);
    readline.clearScreenDown(process.stdout);
    process.stdout.write(this.render());
    setTimeout(this._onTick.bind(this), 1000 / 15); // 15 frames per second (ish)
  }

}
