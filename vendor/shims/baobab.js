(function() {
  /* globals define, self */
  function vendorModule(trueBaobab) {
    'use strict';

    return trueBaobab;
  }
  // export an object with a default property that contains the 'hljs' global.
  define('baobab', ['baobab/baobab'], vendorModule);
})();