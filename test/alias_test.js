'use strict';

var fs = require('fs'),
    path = require('path'),
    alias;


exports['alias-test'] = {

  setUp: function (done) {
    this._writeFileSync = fs.writeFileSync;
    fs.writeFileSync = function () {};
    done();
  },

  tearDown: function (done) {
    fs.writeFileSync = this._writeFileSync;
    done();
  },

  'should return the whole aliases when param is an empty array': function(test) {
    var alias = require('../lib/alias.js');

    alias.aliases = {
      "a1": "alias1",
      "a2": "alias2"
    };

    test.expect(1);
    test.equal(alias.trigger({_:[]}), "\u001b[32ma1=alias1\na2=alias2\u001b[39m", 'returned content is all aliases');
    test.done();
  },

  'should return the asked alias': function(test) {
    var alias = require('../lib/alias.js');

    alias.aliases = {
      "a1": "alias1",
      "a2": "alias2"
    };
    test.expect(1);
    test.equal(alias.trigger({alias:'a2', _: []}), "\u001b[32malias2\u001b[39m", 'returned content is the alias for a2');
    test.done();
  },

  'should set the given alias': function(test) {
    var alias = require('../lib/alias.js');

    alias.aliases = {
      "a1": "alias1",
      "a2": "alias2"
    };
    test.expect(3);
    test.equal(alias.trigger({alias:'a3', _: []}), "\u001b[31mno alias for \'a3\'\u001b[39m", 'alias3 does not exist');
    var result = alias.trigger({alias:'a3', _: ['alias3']});
    test.equal(alias.trigger({alias:'a3', _: ['alias3']}), "\u001b[32mset alias \'a3\' for \'alias3\'\u001b[39m", 'alias3 does not exist');
    test.equal(alias.trigger({alias:'a3', _: []}), "\u001b[32malias3\u001b[39m", 'returned content is the alias for a3');
    test.done();
  }

};