/*
 * node-pa | alias.js
 * https://github.com/hereandnow/node-pa
 *
 * Copyright (c) 2013 Bastian Behrens
 * Licensed under the MIT license.
 */

'use strict';

/*
 * module dependencies
 */
var fs = require('fs'),
    path = require('path');
    require('colors');


/*
 * should only be called via the trigger-function
 */
function Alias () {

  var home = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'],
      aliasFile = path.resolve(home + '/.pa/aliases.json');

  var writeAliases = function (aliases) {
    fs.writeFileSync(aliasFile, JSON.stringify(aliases, null, 2));
  };

  this.init = function () {
    this.aliases = require(aliasFile);
    return this;
  }

  this.list = function () {
    var tmp, list = '';
    for (tmp in this.aliases) {
      list += '\n' + tmp + '=' + this.aliases[tmp];
    }
    return list.substr(1).green;
  };

  this.get = function (key) {
    return this.aliases[key] ? this.aliases[key].green : ("no alias for '" + key + "'").red;
  };

  this.set = function (key, value) {
    this.aliases[key] = value;
    writeAliases(this.aliases);
    return ("set alias '" + key + "' for '" + value + "'").green;
  };

  this.trigger = function (argv) {
    if (typeof argv.alias !== 'string') {
      return this.list();
    }
    return argv._[0] ? this.set(argv.alias, argv._[0]) : this.get(argv.alias);
  };

}

module.exports = new Alias();