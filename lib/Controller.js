'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Light = require('./Light');

var _Light2 = _interopRequireDefault(_Light);

var _TrafficLight = require('./TrafficLight');

var _TrafficLight2 = _interopRequireDefault(_TrafficLight);

var _TrafficLightSet = require('./TrafficLightSet');

var _TrafficLightSet2 = _interopRequireDefault(_TrafficLightSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Controller represents a way to control trafic light sets or idividual trafic lights.
 * The Controller makes sure only one traffic light (or traffic light set) is green at any one time.
 * Once lights go red, the next set will change to green.
 *
 * @export
 * @class Controller
 */

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);

    for (var _len = arguments.length, trafficLights = Array(_len), _key = 0; _key < _len; _key++) {
      trafficLights[_key] = arguments[_key];
    }

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

  _createClass(Controller, [{
    key: 'change',
    value: function change() {
      var currentSet = this.trafficLights[this._index];
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

  }, {
    key: 'currentLight',
    value: function currentLight() {
      return this.trafficLights[this._index].currentLight();
    }
  }]);

  return Controller;
}();

exports.default = Controller;