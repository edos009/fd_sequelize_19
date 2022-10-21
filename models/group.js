'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    static associate (models) {
      Group.belongsToMany(models.User, {
        through: 'users_to_groups',
        foreignKey: 'groupId',
      });
    }
  }
  Group.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      imagePath: { type: DataTypes.TEXT, field: 'image_path' },
      description: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
      underscored: true,
    }
  );
  return Group;
};
