'use strict';

// had enabled by egg
// exports.static = true;
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
exports.sequelize = {
  enable: false,
  package: 'egg-sequelize',
};

exports.routerPlus = {
  enable: true,
  package: 'egg-router-plus',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.redis = {
  enable: false,
  package: 'egg-redis',
};
// debug 为 true 时，用于本地调试
exports.debug = true;

