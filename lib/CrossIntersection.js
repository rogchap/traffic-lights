'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _safe = require('colors/safe');

var _Intersection2 = require('./Intersection');

var _Intersection3 = _interopRequireDefault(_Intersection2);

var _TrafficLight = require('./TrafficLight');

var _TrafficLight2 = _interopRequireDefault(_TrafficLight);

var _TrafficLightSet = require('./TrafficLightSet');

var _TrafficLightSet2 = _interopRequireDefault(_TrafficLightSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * CrossIntersection represents a 4-way intersection
 *
 *        │  ╷  │
 *      W │  ╷  │ N
 * ───────┘  ╷  └───────
 *  - - - - - - - - - -
 * ───────┐  ╵  ┌───────
 *      S │  ╵  │ E
 *        │  ╵  │
 *
 * @export
 * @class CrossIntersection
 */

var CrossIntersection = function (_Intersection) {
  _inherits(CrossIntersection, _Intersection);

  function CrossIntersection(interval, amberAt) {
    _classCallCheck(this, CrossIntersection);

    var north = new _TrafficLight2.default();
    var east = new _TrafficLight2.default();
    var south = new _TrafficLight2.default();
    var west = new _TrafficLight2.default();

    var northSouth = new _TrafficLightSet2.default(north, south);
    var eastWest = new _TrafficLightSet2.default(east, west);

    var _this = _possibleConstructorReturn(this, (CrossIntersection.__proto__ || Object.getPrototypeOf(CrossIntersection)).call(this, interval, amberAt, northSouth, eastWest));

    _this.north = north;
    _this.east = east;
    _this.south = south;
    _this.west = west;
    return _this;
  }

  _createClass(CrossIntersection, [{
    key: 'render',
    value: function render() {

      var n = this._getLightIcons(this.north);
      var e = this._getLightIcons(this.east);
      var s = this._getLightIcons(this.south);
      var w = this._getLightIcons(this.west);

      var timeLeft = this.interval - this.elapsedTime;
      var minutesLeft = Math.max(Math.floor(timeLeft / 60), 0);
      var secondsLeft = Math.max(timeLeft - minutesLeft * 60, 0);
      if (secondsLeft <= 9) {
        secondsLeft = '0' + secondsLeft;
      }

      return (0, _safe.white)('\n                     ' + minutesLeft + ':' + secondsLeft + '\n        │  ╷  │ ' + n.green + '\n    W   │  ╷  │ ' + n.amber + ' N\n  ' + w.green + ' ' + w.amber + ' ' + w.red + ' │  ╷  │ ' + n.red + '\n────────┘  ╷  └────────\n- - - - - - - - - - - -\n────────┐  ╵  ┌────────\n      ' + s.red + ' │  ╵  │ ' + e.red + ' ' + e.amber + ' ' + e.green + '\n    S ' + s.amber + ' │  ╵  │   E\n      ' + s.green + ' │  ╵  │\n\n');
    }
  }, {
    key: '_getLightIcons',
    value: function _getLightIcons(trafficLight) {
      return {
        red: (0, _safe.red)(trafficLight.lights[0].illuminated ? '◉' : '◯'),
        amber: (0, _safe.yellow)(trafficLight.lights[2].illuminated ? '◉' : '◯'),
        green: (0, _safe.green)(trafficLight.lights[1].illuminated ? '◉' : '◯')
      };
    }
  }, {
    key: 'getTableHeaders',
    value: function getTableHeaders() {
      return ['Time', 'North', 'South', 'East', 'West'];
    }
  }]);

  return CrossIntersection;
}(_Intersection3.default);

exports.default = CrossIntersection;