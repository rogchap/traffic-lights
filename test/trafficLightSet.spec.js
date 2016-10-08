import { expect } from 'chai';

import TrafficLightSet from '../src/TrafficLightSet';
import TrafficLight from '../src/TrafficLight';

describe('TrafficLightSet', () => {

  let trafficLightSet;

  beforeEach(() => {
    // Create a new TrafficLightSet object for each test
    trafficLightSet = new TrafficLightSet(new TrafficLight(), new TrafficLight());
  });

  describe('#trafficLights', () => {

    it('should be an array', () => {
      expect(trafficLightSet.trafficLights).to.be.instanceof(Array);
    });

    it('should not be empty', () => {
      expect(trafficLightSet.trafficLights).to.not.be.empty;
    });

    it('should be an array of TraficLights', () => {
      trafficLightSet.trafficLights.forEach(trafficLight => {
        expect(trafficLight).to.be.an.instanceof(TrafficLight);
      });
    });

  });

  describe('#change', () => {

    it('should respond', () => {
      expect(trafficLightSet).to.respondTo('change');
    });

    it('should change all traffic lights in set', () => {
      expect(trafficLightSet.trafficLights[0].lights[0].illuminated).to.be.true;
      expect(trafficLightSet.trafficLights[1].lights[0].illuminated).to.be.true;
      trafficLightSet.change()
      expect(trafficLightSet.trafficLights[0].lights[0].illuminated).to.be.false;
      expect(trafficLightSet.trafficLights[1].lights[0].illuminated).to.be.false;
    });

    it('should keep all traffic lights in set in sync', () => {
      const changes = Math.floor(Math.random() * 10) + 1;
      for (let i = 0; i < changes; i++) {
        trafficLightSet.change();
        expect(trafficLightSet.trafficLights[0].lights.findIndex(tl => tl.illuminated))
        .to.be.equal(trafficLightSet.trafficLights[1].lights.findIndex(tl => tl.illuminated));
      }
    });
  });

  describe('#currentLight', () => {

    it('should respond', () => {
      expect(trafficLightSet).to.respondTo('currentLight');
    });

    it('should return the currently iluminated light', () => {
      expect(trafficLightSet.currentLight().color).to.be.equal('red');
      trafficLightSet.change();
      expect(trafficLightSet.currentLight().color).to.be.equal('green');
      trafficLightSet.change();
      expect(trafficLightSet.currentLight().color).to.be.equal('amber');
      trafficLightSet.change();
      expect(trafficLightSet.currentLight().color).to.be.equal('red');
    });

  });

});
