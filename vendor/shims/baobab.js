import baobab from 'baobab/baobab';

(function() {
  /* globals define, self */
  function vendorModule() {
    'use strict';

    return {
      'default': baobab,
      __esModule: true,
    };
  }
  // export an object with a default property that contains the 'hljs' global.
  define('baobab/index', [], vendorModule);
})();