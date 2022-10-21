'use strict';
const { isAfter } = require('date-fns');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
      Task.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Task.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        field: 'is_done',
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: true,
        },
      },
      deadLine: {
        type: DataTypes.DATE,
        field: 'dead_line',
        allowNull: false,
        validate: {
          isDate: true,
          isValidDate (value) {
            if (isAfter(new Date(), new Date(value))) {
              throw new Error('Fail! Check your deadline!');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    }
  );
  return Task;
};
