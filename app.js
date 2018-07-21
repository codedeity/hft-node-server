'use strict';

// const uuid = require('uuid/v4');

module.exports = app => {
  if (app.config.debug) {
    app.config.coreMiddleware.unshift('less');
  }
};

