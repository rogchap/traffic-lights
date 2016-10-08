'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _cliTable = require('cli-table');

var _cliTable2 = _interopRequireDefault(_cliTable);

var _safe = require('colors/safe');

var _Controller = require('./Controller');

var _Controller2 = _interopRequireDefault(_Controller);

var _Light = require('./Light');

var _Light2 = _interopRequireDefault(_Light);

var _TrafficLight = require('./TrafficLight');

var _TrafficLight2 = _interopRequireDefault(_TrafficLight);

var _TrafficLightSet = require('./TrafficLightSet');

var _TrafficLightSet2 = _interopRequireDefault(_TrafficLightSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Intersection abstract class for any intersection.
 * An intersection has only one controller for all light changes.
 *
 * @export
 * @class Intersection
 */

var Intersection = function () {
  function Intersection() {
    var interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 45;
    var amberAt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

    _classCallCheck(this, Intersection);

    if (amberAt >= interval) {
      throw new Error('amberAt time must be less than the interval time');
    }
    this.interval = interval;
    this.amberAt = amberAt;

    for (var _len = arguments.length, trafficLights = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      trafficLights[_key - 2] = arguments[_key];
    }

    this._controller = new (Function.prototype.bind.apply(_Controller2.default, [null].concat(trafficLights)))();
  }

  _createClass(Intersection, [{
    key: 'render',
    value: function render() {
      return 'No render function defined';
    }
  }, {
    key: 'start',
    value: function start() {
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

  }, {
    key: 'getTableHeaders',
    value: function getTableHeaders() {
      var headers = ['Time'];
      this._controller.trafficLights.forEach(function (set, idx) {
        if (set instanceof _TrafficLightSet2.default) {
          set.trafficLights.forEach(function (_, idx2) {
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

  }, {
    key: 'simulate',
    value: function simulate() {
      var _this = this;

      var maxTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60;

      var table = new _cliTable2.default({
        head: this.getTableHeaders(),
        style: {
          head: ['cyan']
        }
      });

      var time = 0;
      this.elapsedTime = 0;

      var formatTime = function formatTime(t) {
        var minutes = Math.max(Math.floor(t / 60), 0);
        var seconds = Math.max(t - minutes * 60, 0);
        if (seconds <= 9) {
          seconds = '0' + seconds;
        }
        return minutes + ':' + seconds;
      };

      var getColor = function getColor(light) {
        switch (light.color) {
          case 'red':
            return (0, _safe.red)(light.color);
          case 'amber':
            return (0, _safe.yellow)(light.color);
          case 'green':
            return (0, _safe.green)(light.color);
          default:
            return light.color;
        }
      };

      var pushCurrentState = function pushCurrentState() {
        var row = [formatTime(time)];

        _this._controller.trafficLights.forEach(function (set) {
          if (set instanceof _TrafficLightSet2.default) {
            set.trafficLights.forEach(function (tl) {
              row.push(getColor(tl.currentLight()));
            });
          } else {
            row.push(getColor(set.currentLight()));
          }
        });

        table.push(row);
      };

      pushCurrentState();

      while (time < maxTime) {

        this.elapsedTime++;
        time++;

        // do we need to change to amber?
        if (this._controller.currentLight().color === 'green' && this.elapsedTime == this.interval - this.amberAt) {
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
  }, {
    key: '_onTick',
    value: function _onTick() {
      this.elapsedTime = process.hrtime(this._hrtime)[0];

      // do we need to change to amber?
      if (this._controller.currentLight().color === 'green' && this.elapsedTime >= this.interval - this.amberAt) {
        this._controller.change();
      }

      // do we need to change to red?
      if (this.elapsedTime > this.interval) {
        this._controller.change();
        this._hrtime = process.hrtime();
      }

      // render view
      _readline2.default.cursorTo(process.stdout, 0, 0);
      _readline2.default.clearScreenDown(process.stdout);
      process.stdout.write(this.render());
      setTimeout(this._onTick.bind(this), 1000 / 15); // 15 frames per second (ish)
    }
  }]);

  return Intersection;
}();

exports.default = Intersection;