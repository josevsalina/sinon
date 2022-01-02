const assert = require('assert');
const authController = require('../../controllers/auth.controller');
const expect = require('chai').expect;
const should = require('chai').should();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
describe('AuthController', () => {
  beforeEach(function settingUpRoless() {
    console.log('running beforeEach');
    authController.setRoles(['user']);
  });
  describe('isAuthorized', () => {
    it('should return false if not authorized', () => {
      let isAuth = authController.isAuthorized('admin');
      expect(isAuth).to.be.false;
    });
    it('should return true if authorized', () => {
      authController.setRoles(['user', 'admin']);
      let isAuth = authController.isAuthorized('admin');
      isAuth.should.be.true;
    });
  });
  //When coding use describe.only to just execute that test
  //Also when the code is broken I do not know whym, use describe.skip to omit that test
  describe('isAuthorizedAsync', () => {
    it('should return false if not authorized', function (done) {
      this.timeout(2500);
      authController.isAuthorizedAsync('admin', (result) => {
        assert.equal(false, result);
        done();
      });
    });
    it('should return true if authorized', function (done) {
      this.timeout(2500);
      authController.setRoles(['user', 'admin']);
      authController.isAuthorizedAsync('admin', (result) => {
        assert.equal(true, result);
        done();
      });
    });
  });
  describe('isAuthorizedPromise', () => {
    it('should return false if not authorized', function () {
      this.timeout(2500);
      return authController.isAuthorizedPromise('admin').should.eventually.be
        .false;
    });
  });
});
