/* @flow */

import Light from './Light';

/**
 * TrafficLight represents a set of three lights (red, amber, green), that can be changed in sequance
 *
 * @export
 * @class TrafficLight
 */
export default class TrafficLight {

  _index: number;

  /**
   * Array of Lights that makes up the traffic light
   *
   * @type {Array<Light>}
   * @memberOf TrafficLight
   */
  lights: Array<Light>;

  /**
   * Creates an instance of TrafficLight with three lights: red, green, amber
   *
   *
   * @memberOf TrafficLight
   */
  constructor() {
    this._index = 0;
    this.lights = [
      new Light('red', true),
      new Light('green'),
      new Light('amber'),
    ];
  }

  /**
   * Changes the traffic light to the next light in the sequence
   * red -> green -> amber -> red
   *
   * @memberOf TrafficLight
   */
  change(): void {

    // switch the current light off
    this.lights[this._index].switch();

    // get the next light in the sequence
    this._index++;
    if (this._index >= this.lights.length) {
      this._index = 0;
    }

    // switch the next light on
    this.lights[this._index].switch();
  }

  /**
   * Returns the currently illuminated light
   *
   * @returns {Light}
   *
   * @memberOf TrafficLight
   */
  currentLight(): Light {
    return this.lights.filter(l => l.illuminated)[0];
  }
}
