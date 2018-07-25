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

  config.security = {
    // for CORS
    domainWhiteList: [ 'http://localhost:7001', '.domain.com', '.127.0.0.1' ], // 安全白名单，以 . 开头
    protocolWhitelist: [ 'wss' ],
    ssrf: {
      // support both cidr subnet or specific ip
      ipBlackList: [
        '10.0.0.0/8',
        '0.0.0.0/32',
      ],
      // checkAddress has higher priority than ipBlackList
      checkAddress(ip) {
        return ip !== '127.0.0.2';
      },
    },
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      // 把 127.0.0.2 改为 127.0.0.1 可以绕过所有本地API的 csrf
      ignore: ctx => { return ctx.ip === '127.0.0.2' || '/api/v2/sign/signin'; },
    },
    csp: {
      ignore: '/api/v1',
    },
  };
  // If the origin is set,
  // the plugin will follow it to set the Access-Control-Allow-Origin and ignore the security.domainWhiteList.
  // Otherwise, the security.domainWhiteList which is default will take effect as described above.
  config.cors = {
    // {string|Function} origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.logger = {
    loglevel: 'DEBUG',

  };

  // Cache
  config.redis = {
    client: {
      host: process.env.EGG_REDIS_HOST || '127.0.0.1',
      port: process.env.EGG_REDIS_PORT || 6379,
      password: process.env.EGG_REDIS_PASSWORD || '',
      db: process.env.EGG_REDIS_DB || '0',
    },
  };

  exports.passportLocal = {
    // usernameField: 'username',
    // passwordField: 'password',
  };
  return config;
};
