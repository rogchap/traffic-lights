/* @flow */

import TrafficLight from './TrafficLight';

import Light from './Light';

/**
 * TrafficLightSet represents a group of traffic lights that can be changed in sync
 * For example a intersection could have a set of traffic lights for the left and right lanes,
 * or you could sync a set of traffic lights for northbound and southbound etc.
 *
 * @export
 * @class TrafficLightSet
 */
export default class TrafficLightSet {

  /**
   * The traffic lights that are synced in this set
   *
   * @type {Array<TrafficLight>}
   * @memberOf TrafficLightSet
   */
  trafficLights: Array<TrafficLight>;

  constructor(...trafficLights: Array<TrafficLight>) {
    this.trafficLights = trafficLights;
  }

  /**
   * Changes all traffic lights in set
   *
   * @memberOf TrafficLightSet
   */
  change(): void {
    this.trafficLights.forEach(tl => {
      tl.change();
    })
  }

  /**
   * Similar to a singular Traffic light return the current illuminated light
   *
   * @returns {Light}
   *
   * @memberOf TrafficLightSet
   */
  currentLight(): Light {
    // Because all traffic lights are in sync we can return the first traffic light, light.
    return this.trafficLights[0].lights.filter(l => l.illuminated)[0];
  }
}
