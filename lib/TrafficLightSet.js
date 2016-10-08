'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TrafficLight = require('./TrafficLight');

var _TrafficLight2 = _interopRequireDefault(_TrafficLight);

var _Light = require('./Light');

var _Light2 = _interopRequireDefault(_Light);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * TrafficLightSet represents a group of traffic lights that can be changed in sync
 * For example a intersection could have a set of traffic lights for the left and right lanes,
 * or you could sync a set of traffic lights for northbound and southbound etc.
 *
 * @export
 * @class TrafficLightSet
 */

var TrafficLightSet = function () {
  function TrafficLightSet() {
    _classCallCheck(this, TrafficLightSet);

    for (var _len = arguments.length, trafficLights = Array(_len), _key = 0; _key < _len; _key++) {
      trafficLights[_key] = arguments[_key];
    }

    this.trafficLights = trafficLights;
  }

  /**
   * Changes all traffic lights in set
   *
   * @memberOf TrafficLightSet
   */

  /**
   * The traffic lights that are synced in this set
   *
   * @type {Array<TrafficLight>}
   * @memberOf TrafficLightSet
   */

  _createClass(TrafficLightSet, [{
    key: 'change',
    value: function change() {
      this.trafficLights.forEach(function (tl) {
        tl.change();
      });
    }

    /**
     * Similar to a singular Traffic light return the current illuminated light
     *
     * @returns {Light}
     *
     * @memberOf TrafficLightSet
     */

  }, {
    key: 'currentLight',
    value: function currentLight() {
      // Because all traffic lights are in sync we can return the first traffic light, light.
      return this.trafficLights[0].lights.filter(function (l) {
        return l.illuminated;
      })[0];
    }
  }]);

  return TrafficLightSet;
}();

exports.default = TrafficLightSet;