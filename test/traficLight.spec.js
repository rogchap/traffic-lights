import { expect } from 'chai';

import Light from '../src/Light';
import TrafficLight from '../src/TrafficLight';

describe('TrafficLight', () => {

  let trafficLight;

  beforeEach(() => {
    // Create a new TrafficLight object for each test
    trafficLight = new TrafficLight();
  });

  describe('#lights', () => {

    it('should be an array', () => {
      expect(trafficLight.lights).to.be.instanceof(Array);
    });

    it('should not be empty', () => {
      expect(trafficLight.lights).to.not.be.empty;
    });

    it('should have 3 lights', () => {
      expect(trafficLight.lights).to.to.have.lengthOf(3);
    });

    it('should be an array of Lights', () => {
      expect(trafficLight.lights[0]).to.be.an.instanceof(Light);
      expect(trafficLight.lights[1]).to.be.an.instanceof(Light);
      expect(trafficLight.lights[2]).to.be.an.instanceof(Light);
    });

    it('first light should be coloured red', () => {
      expect(trafficLight.lights[0].color).to.eql('red');
    });

    it('second light should be coloured green', () => {
      expect(trafficLight.lights[1].color).to.eql('green');
    });

    it('first light should be coloured amber', () => {
      expect(trafficLight.lights[2].color).to.eql('amber');
    });

    it('initially the red light should be on', () => {
      expect(trafficLight.lights[0].illuminated).to.be.true;
    });

    it('initially should have the other lights off', () => {
      expect(trafficLight.lights[1].illuminated).to.be.false;
      expect(trafficLight.lights[2].illuminated).to.be.false;
    });

  });

  describe('#change', () => {

    it('should respond', () => {
      expect(trafficLight).to.respondTo('change');
    });

    it('should only have one light illuminated at a time', () => {
      const changes = Math.floor(Math.random() * 10) + 1;
      for (let i = 0; i < changes; i++) {
        trafficLight.change();
      }
      expect(trafficLight.lights.filter(l => l.illuminated).length).to.equal(1);
    });

    it('should change a red light to green light', () => {
      expect(trafficLight.lights.filter(l => l.illuminated)[0].color).to.equal('red');
      trafficLight.change();
      expect(trafficLight.lights.filter(l => l.illuminated)[0].color).to.equal('green');
    });

    it('should change a green light to amber light', () => {
      trafficLight.change();
      expect(trafficLight.lights.filter(l => l.illuminated)[0].color).to.equal('green');
      trafficLight.change();
      expect(trafficLight.lights.filter(l => l.illuminated)[0].color).to.equal('amber');
    });

    it('should change a amber light to red light', () => {
      trafficLight.change();
      trafficLight.change();
      expect(trafficLight.lights.filter(l => l.illuminated)[0].color).to.equal('amber');
      trafficLight.change();
      expect(trafficLight.lights.filter(l => l.illuminated)[0].color).to.equal('red');
    });

  });

  describe('#currentLight', () => {

    it('should respond', () => {
      expect(trafficLight).to.respondTo('currentLight');
    });

    it('should return the currently iluminated light', () => {
      expect(trafficLight.currentLight().color).to.be.equal('red');
      trafficLight.change();
      expect(trafficLight.currentLight().color).to.be.equal('green');
      trafficLight.change();
      expect(trafficLight.currentLight().color).to.be.equal('amber');
      trafficLight.change();
      expect(trafficLight.currentLight().color).to.be.equal('red');
    });

  });
});
