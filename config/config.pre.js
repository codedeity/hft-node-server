'use strict';
const co = require('co');

// for db Migrations
module.exports = {
  up: co.wrap(async function(db, Sequelize) {
    const { STRING, INTEGER, DATE } = Sequelize;

    db.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: STRING, allowNull: false },
      mobile: { type: STRING, allowNull: false },
      email: { type: STRING, allowNull: false },
      created_at: DATE,
      updated_at: DATE,
    });

    db.addIndex('users', [ 'email' ], { indicesType: 'UNIQUE' });
  }),

  down: co.wrap(async function(db) {
    db.dropTable('users');
  }),
};
