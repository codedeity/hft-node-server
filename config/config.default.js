'use strict';

module.exports = appInfo => {

  function inInnerIp(strip) {
    return strip === '127.0.0.1';
  }

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

  exports.security = {
    domainWhiteList: [ '.domain.com' ], // 安全白名单，以 . 开头
    protocolWhitelist: [ 'wss' ],
    ssrf: {
      // support both cidr subnet or specific ip
      ipBlackList: [
        '10.0.0.0/8',
        '0.0.0.0/32',
      ],
      // checkAddress has higher priority than ipBlackList
      checkAddress(ip) {
        return ip !== '127.0.0.1';
      },
    },
    csrf: {
      matching: ctx => { return ctx.ip === '127.0.0.1'; },
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => inInnerIp(ctx.ip),

    },
    csp: {
      ignore: '/api/v1',
    },
  };

  config.logger = {
    loglevel: 'DEBUG',

  };

  return config;
};
