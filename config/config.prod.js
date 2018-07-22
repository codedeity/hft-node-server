'use strict';

// connect to mysql/mariadb
exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  database: 'mariadb-prod',
  host: 'localhost',
  port: '5432',
  username: 'mariadb',
  password: 'password',
};

exports.logger = {
  loglevel: 'INFO',
};
