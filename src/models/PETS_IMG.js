const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return PETS_IMG.init(sequelize, DataTypes);
}

class PETS_IMG extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    pet_uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'PETS',
        key: 'uuid'
      }
    },
    user_uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'USERS',
        key: 'uuid'
      }
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PETS_IMG',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uuid" },
        ]
      },
      {
        name: "user_uuid",
        using: "BTREE",
        fields: [
          { name: "user_uuid" },
        ]
      },
      {
        name: "pet_uuid",
        using: "BTREE",
        fields: [
          { name: "pet_uuid" },
        ]
      },
    ]
  });
  return PETS_IMG;
  }
}
