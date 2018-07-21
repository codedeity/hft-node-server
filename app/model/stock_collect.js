'use strict';

module.exports = app => {
  const { STRING, DATE, BOOLEAN } = app.Sequelize;

  const StockCollection = app.model.define('StockCollection', {
    is_empty: BOOLEAN,
    user_id: STRING(30),
    stock_id: STRING(30),
    create_at: DATE,
  });

  return StockCollection;
};
