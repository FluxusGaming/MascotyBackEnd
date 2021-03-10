"use strict";

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return PETS.init(sequelize, DataTypes);
};

class PETS extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      uuid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      race: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      sex: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      castrated: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      aderess: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'PETS',
      timestamps: false,
      indexes: [{
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{
          name: "uuid"
        }]
      }]
    });
    return PETS;
  }

}