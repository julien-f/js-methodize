# methodize

[![Build Status](https://img.shields.io/travis/julien-f/js-methodize/master.svg)](http://travis-ci.org/julien-f/js-methodize)
[![Dependency Status](https://david-dm.org/julien-f/js-methodize/status.svg?theme=shields.io)](https://david-dm.org/julien-f/js-methodize)
[![devDependency Status](https://david-dm.org/julien-f/js-methodize/dev-status.svg?theme=shields.io)](https://david-dm.org/julien-f/js-methodize#info=devDependencies)

> Makes a function behaves as a method.


## Install

Download [manually](https://github.com/julien-f/js-methodize/releases) or with package-manager.

#### [npm](https://npmjs.org/package/methodize)

```
npm install --save methodize
```

#### bower

```
bower install --save methodize
```

## Example

```javascript
var methodize = require('methodize');

var person = {
  firstName: 'Gaius',
  lastName: 'Baltar',
};

function getFullName(person) {
  return person.firstName +' '+ person.lastName;
};

// Methodize the function and attaches it to the person object.
//
// The method name is retrieved from the original function if it is a
// named function.
//
// A custom name can be specified as a second parameter to attachTo().
methodize(getFullName).attachTo(person);

// Profit :)
console.log(person.getFullName());
```

## Contributions

Contributions are *very* welcomed, either on the documentation or on
the code.

You may:

- report any [issue](https://github.com/julien-f/js-methodize/issues)
  you've encountered;
- fork and create a pull request.

## License

ISC © [Julien Fontanet](http://julien.isonoe.net)
