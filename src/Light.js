/* @flow */

/**
 * Light represents a light that can be switched on and off (default = off)
 * A Light can have a colour and defaults to white
 *
 * @export
 * @class Light
 */
export default class Light {

  /**
   * The colour of the light
   *
   * @type {string}
   * @memberOf Light
   */
  color: string;

  /**
   * illuminated is true if the light is on
   * default false
   *
   * @type {boolean}
   * @memberOf Light
   */
  illuminated: boolean;

  /**
   * Creates an instance of Light.
   *
   * @param {string} [color='white']
   * @param {boolean} [illuminated=false]
   *
   * @memberOf Light
   */
  constructor(color: string = 'white', illuminated: boolean = false) {
    this.color = color;
    this.illuminated = illuminated;
  }

  /**
   * Toogles the illuminated state of the light
   *
   * @memberOf Light
   */
  switch(): void {
    this.illuminated = !this.illuminated;
  }
}
