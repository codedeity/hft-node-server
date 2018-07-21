'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const Stock = app.model.define('stock', {
    name: STRING(30),
    user_id: INTEGER,
    title: STRING(30),
    description: STRING(30),
    created_at: DATE,
    updated_at: DATE,

    deleted: BOOLEAN,
  });

  Stock.associate = function() {
    app.model.Stock.belongsTo(app.model.User, { as: 'user' });
  };
  return Stock;
};
