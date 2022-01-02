const assert = require('assert');
const should = require('chai').should();

describe('Basic mocha test', () => {
  it('should deal with objects', () => {
    let obj = { name: 'Jon', gender: 'male' };
    let objB = { name: 'Jon', gender: 'male' };

    obj.should.have.property('name').equal('Jon');
    obj.should.deep.equal(objB); // interesting
  });
  it('should allow to  testing nulls', function () {
    let iAmNull = null;
    should.not.exist(iAmNull);
  });
});
