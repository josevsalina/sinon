const assert = require('assert');
const authController = require('../../controllers/auth.controller');
const expect = require('chai').expect;
const should = require('chai').should();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();

describe('AuthController', () => {
  beforeEach(function settingUpRoless() {
    console.log('running beforeEach');
    //authController.setRoles(['user']);
  });
  describe('isAuthorized', () => {
    let user = {};
    beforeEach(function () {
      user = {
        roles: ['user'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        },
      };
      sinon.spy(user, 'isAuthorized');
      authController.setUser(user);
    });
    it('should return false if not authorized', () => {
      let isAuth = authController.isAuthorized('admin');
      console.log(user.isAuthorized);
      user.isAuthorized.calledOnce.should.be.true;
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
  describe.only('getIndex', () => {
    let user = {};
    beforeEach(function () {
      user = {
        roles: ['admin'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        },
      };
    });
    it('should render index if authorized', function () {
      var isAuth = sinon.stub(user, 'isAuthorized').returns(true);
      const req = {
        user,
      };
      const res = {
        render: () => {},
      };
      const mock = sinon.mock(res);
      mock.expects('render').once().withExactArgs('index');
      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;

      mock.verify();
    });
    it('should render error', function () {
      var isAuth = sinon.stub(user, 'isAuthorized').throws();
      const req = {
        user,
      };
      const res = {
        render: () => {},
      };
      const mock = sinon.mock(res);
      mock.expects('render').once().withExactArgs('error');
      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;
      mock.verify();
    });
  });
});
