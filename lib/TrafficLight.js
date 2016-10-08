'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Light = require('./Light');

var _Light2 = _interopRequireDefault(_Light);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * TrafficLight represents a set of three lights (red, amber, green), that can be changed in sequance
 *
 * @export
 * @class TrafficLight
 */

var TrafficLight = function () {

  /**
   * Creates an instance of TrafficLight with three lights: red, green, amber
   *
   *
   * @memberOf TrafficLight
   */

  function TrafficLight() {
    _classCallCheck(this, TrafficLight);

    this._index = 0;
    this.lights = [new _Light2.default('red', true), new _Light2.default('green'), new _Light2.default('amber')];
  }

  /**
   * Changes the traffic light to the next light in the sequence
   * red -> green -> amber -> red
   *
   * @memberOf TrafficLight
   */

  /**
   * Array of Lights that makes up the traffic light
   *
   * @type {Array<Light>}
   * @memberOf TrafficLight
   */

  _createClass(TrafficLight, [{
    key: 'change',
    value: function change() {

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

  }, {
    key: 'currentLight',
    value: function currentLight() {
      return this.lights.filter(function (l) {
        return l.illuminated;
      })[0];
    }
  }]);

  return TrafficLight;
}();

exports.default = TrafficLight;