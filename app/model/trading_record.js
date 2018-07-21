'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const TradingRecord = app.model.define('TradingRecord', {
    description: STRING(50),
    stock_id: { type: STRING(30), allowNull: false },
    user_id: STRING(30),
    create_at: DATE,
    update_at: DATE,
    opertion: { type: INTEGER, allowNull: false },
    is_first: BOOLEAN,
    deleted: BOOLEAN,
  }, {
    usePushEach: true,
  });

  return TradingRecord;
};
