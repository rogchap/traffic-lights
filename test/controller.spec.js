import { expect } from 'chai';

import Controller from '../src/Controller';
import TrafficLight from '../src/TrafficLight';
import TrafficLightSet from '../src/TrafficLightSet';

describe('Controller', () => {

  let cntrl;

  beforeEach(() => {
    // Create a new Controller object for each test
    cntrl = new Controller(
      new TrafficLight(),
      new TrafficLightSet(
        new TrafficLight(),
        new TrafficLight(),
      ),
    );
  });

  describe('#trafficLights', () => {

    it('should be an array', () => {
      expect(cntrl.trafficLights).to.be.instanceof(Array);
    });

    it('should not be empty', () => {
      expect(cntrl.trafficLights).to.not.be.empty;
    });

    it('should be an array of TraficLight or TrafficLightSet', () => {
      cntrl.trafficLights.forEach(trafficLight => {
        const instance = trafficLight.constructor.name;
        expect(instance).to.be.oneOf(['TrafficLight', 'TrafficLightSet']);
      });
    });

    it('should have the first set of lights set to green', () => {
      expect(cntrl.trafficLights[0].currentLight().color).to.be.equal('green');
    });

  });

  describe('#change', () => {

    it('should respond', () => {
      expect(cntrl).to.respondTo('change');
    });

    it('should only have one green or amber light illuminated at a time', () => {
      const changes = Math.floor(Math.random() * 10) + 1;
      for (let i = 0; i < changes; i++) {
        cntrl.change();
      }
      expect(cntrl.trafficLights.filter(l => {
        const { color, illuminated } = l.currentLight();
        return (color === 'amber' | color === 'green') && illuminated;
      }).length
      ).to.equal(1);
    });

  });

});
