'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Light represents a light that can be switched on and off (default = off)
 * A Light can have a colour and defaults to white
 *
 * @export
 * @class Light
 */

var Light = function () {

  /**
   * Creates an instance of Light.
   *
   * @param {string} [color='white']
   * @param {boolean} [illuminated=false]
   *
   * @memberOf Light
   */

  /**
   * The colour of the light
   *
   * @type {string}
   * @memberOf Light
   */

  function Light() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'white';
    var illuminated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Light);

    this.color = color;
    this.illuminated = illuminated;
  }

  /**
   * Toogles the illuminated state of the light
   *
   * @memberOf Light
   */

  /**
   * illuminated is true if the light is on
   * default false
   *
   * @type {boolean}
   * @memberOf Light
   */

  _createClass(Light, [{
    key: 'switch',
    value: function _switch() {
      this.illuminated = !this.illuminated;
    }
  }]);

  return Light;
}();

exports.default = Light;