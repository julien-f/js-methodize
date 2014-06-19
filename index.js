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

var attachTo = function (object, name) {
  if (!(name || (name = (this.name || (this.name = fnName(this.original))))))
  {
    throw new Error('missing name');
  }

  (object.prototype || object)[name] = this;

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
