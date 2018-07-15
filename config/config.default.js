'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_hft_team_1531660039610_7822';

  // add your config here
  config.middleware = [];

  return config;
};
