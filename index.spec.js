'use strict';

//====================================================================

var methodize = require('./');

//--------------------------------------------------------------------

var expect = require('chai').expect;
var sinon = require('sinon');

//====================================================================

// TODO: test method.attachTo()

describe('methodize(fn)', function () {
  it('throws a TypeError if fn is not a function', function () {
    expect(function () {
      methodize(null);
    }).to.throw(TypeError);
  });

  it('wraps fn in a function which injects this as the first param', function () {
    var context = {};
    var param1 = {};
    var param2 = {};
    var result = {};

    var spy = sinon.spy(function () {
      return result;
    });

    var method = methodize(spy);
    expect(method.call(context, param1, param2)).to.equal(result);
    expect(spy.calledOnce).to.be.true;
    expect(spy.calledOn(null)).to.be.true;
    expect(spy.calledWithExactly(context, param1, param2)).to.be.true;
  });
});

