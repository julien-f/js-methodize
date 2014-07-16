'use strict';

//====================================================================

var fnName = require('fn-name');

//====================================================================

var is = (function (toS) {
  toS = toS.call.bind(toS);
  var _ = function (ref) {
    ref = toS(ref);
    return function (val) {
      return (toS(val) === ref);
    };
  };

  return {
    object: function (val) { return (val instanceof Object); },
    plainObject: _({}),
    function: _(function () {}),
  };
})(Object.prototype.toString);

//====================================================================

var create = Object.create;
var getPrototype = Object.getPrototypeOf;
var defineProperty = Object.defineProperty;
var setPrototype = Object.setPrototypeOf || function (object, prototype) {
  object.__proto__ = prototype;
};

var attachTo = function (object, name) {
  if (!(name || (name = (this.name || (this.name = fnName(this.original))))))
  {
    throw new Error('missing name');
  }

  // # Three possibilities.
  //
  // 1. assign to a normal property:
  //object[name] = this;
  //
  // 2. create a constant (yet deletable) hidden property:
  //defineProperty(object, {
  //  configurable: true,
  //  enumerable: false,
  //  value: this,
  //  writable: false,
  //});
  //
  // 3. insert in the prototype chain:
  var prototype = create(getPrototype(object));
  prototype[name] = this;
  setPrototype(object, prototype);

  return this;
};

exports = module.exports = function (fn) {
  if (!is.function(fn)) {
    throw new TypeError('function expected');
  }

  var method = function () {
    var args = [this];
    args.push.apply(args, arguments);
    return fn.apply(null, args);
  };
  method.attachTo = attachTo;
  method.original = fn;

  return method;
};
