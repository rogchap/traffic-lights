/* @flow */

import Light from './Light';
import TrafficLight from './TrafficLight';
import TrafficLightSet from './TrafficLightSet';

/**
 * Controller represents a way to control trafic light sets or idividual trafic lights.
 * The Controller makes sure only one traffic light (or traffic light set) is green at any one time.
 * Once lights go red, the next set will change to green.
 *
 * @export
 * @class Controller
 */
export default class Controller {

  _index: number;
  trafficLights: Array<TrafficLight|TrafficLightSet>;

  constructor(...trafficLights: Array<TrafficLight|TrafficLightSet>) {
    this.trafficLights = trafficLights;
    this._index = 0;

    // Traffic lights start at red, so set the first set to green.
    this.trafficLights[0].change();
  }

  /**
   * Changes the lights of the current traffic light set, if the set goes red, set the next set green.
   *
   * @memberOf Controller
   */
  change(): void {
    const currentSet = this.trafficLights[this._index];
    currentSet.change();
    if (currentSet.currentLight().color === 'red') {
      this._index++;
      if (this._index >= this.trafficLights.length) {
        this._index = 0;
      }
      this.trafficLights[this._index].change();
    }
  }

  /**
   * Returns the current set's illuminated light
   *
   * @returns {Light}
   *
   * @memberOf Controller
   */
  currentLight(): Light {
    return this.trafficLights[this._index].currentLight();
  }

}
