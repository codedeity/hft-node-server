'use strict';

module.exports = app => {

  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Operation = app.model.define('Operation', {
    type: { type: INTEGER, allowNull: false },
    master_id: STRING(30),
    user_id: STRING(30),
    stock_id: { type: STRING(30), allowNull: false },
    op_time: DATE,
    create_at: { type: Date, default: Date.now },
  });

  return Operation;
};
