/*jshint node:true*/
module.exports = {
  desctipion: 'Baobab shim for Ember.js',
  afterInstall: function () {
    return this.addPackagesToProject([
      {name: 'baobab', target: '^2.5.0'}
    ]);
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
};
