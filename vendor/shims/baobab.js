(function() {
  /* globals define, self */
  function vendorModule(trueBaobab) {
    'use strict';

    return {
      'default': trueBaobab,
      __esModule: true,
    };
  }
  // export an object with a default property that contains the 'hljs' global.
  define('baobab', ['baobab/baobab'], vendorModule);
})();