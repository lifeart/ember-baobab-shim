/* jshint node: true */
'use strict';
const path = require('path');
const mergeTrees = require('broccoli-merge-trees');
const replace = require('broccoli-replace');
module.exports = {
  name: 'baobab',
  isDevelopingAddon() {
    return true;
  },
  _findHost: function () {
    var current = this;
    var app;

    // Keep iterating upward until we don't have a grandparent.
    // Has to do this grandparent check because at some point we hit the project.
    do {
      app = current.app || app
    } while (current && current.parent && current.parent.parent && (current = current.parent))

      return app;
  },
  included(app, parentAddon) {
    var target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    this._super.included.apply(this, arguments);
    target.import('vendor/shims/baobab.js');
  },
  treeForAddon (tree) {
    const app = this._findHost();

    const reduxPath = path.dirname(require.resolve('baobab/src/baobab.js'));
    let reduxTree = this.treeGenerator(reduxPath);

    // Fix import paths to not include ".js" extension in name
    reduxTree = replace(reduxTree, {
      files: '**/*.js',
      patterns: [
        {
          match: / global /g,
          replacement: ` self `
        }
      ]
    });

    // let addon = this.addons.find(addon => addon.name === 'ember-cli-babel');

    // reduxTree = addon.transpileTree(reduxTree, {
    //   babel: {
    //     plugins: ['babel-plugin-transform-object-rest-spread']
    //   },
    //   'ember-cli-babel': {
    //     compileModules: false
    //   }
    // });

    // console.log('rx tree!');

    if (!tree) {
      return this._super.treeForAddon.call(this, reduxTree);
    }

    const trees = mergeTrees([tree,reduxTree], {
      overwrite: true
    });

    return this._super.treeForAddon.call(this, trees);
  }
}