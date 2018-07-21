'use strict';

module.exports = appInfo => {
  const config = {};
  // debug 为 true 时，用于本地调试
  config.debug = true;

  config.host = 'http://localhost';
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_hft_team_1531660039610_7822';

  config.session_secret = 'hft_node_secret'; // 务必修改

  config.name = 'HFT Platform';

  config.description = '高频交易和量化交易平台';

  config.site_logo = '/public/images/hft_light.svg';

  config.site_icon = '/public/images/hft_icon_32.png';
  // add your config here
  config.middleware = [ 'errorHandler', 'errorMessage' ];
  config.errorHandler = {
    match: '/api/v2',
  };
  config.errorMessage = {
    match: '/api/v3',
  };

  // connect to mysql/mariadb
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'mariadb-dev',
    host: 'localhost',
    port: '5432',
    username: 'mariadb',
    password: 'password',
  };

  return config;
};
