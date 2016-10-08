import { expect } from 'chai';

import Light from '../src/Light';

describe('Light', () => {

  let light;

  beforeEach(() => {
    // Create a new Light object for each test
    light = new Light('color');
  });

  describe('#illuminated', () => {

    it('initially should be false', () => {
      expect(light.illuminated).to.be.false;
    });

  });

  describe('#color', () => {

    it('should exist', () => {
      expect(light.color).to.exist;
    });
  });

  describe('#switch', () => {

    it('should respond', () => {
      expect(light).to.respondTo('switch');
    });

    it('should illuminate the light', () => {
      light.switch();
      expect(light.illuminated).to.be.true;
    });

    it('shoud switch off the light when called again', () => {
      light.switch();
      light.switch();
      expect(light.illuminated).to.be.false;
    });

  })


});
