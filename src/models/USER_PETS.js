const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return USER_PETS.init(sequelize, DataTypes);
}

class USER_PETS extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    user_uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'USERS',
        key: 'uuid'
      }
    },
    pet_uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PETS',
        key: 'uuid'
      }
    }
  }, {
    sequelize,
    tableName: 'USER_PETS',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_uuid" },
          { name: "pet_uuid" },
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
  return USER_PETS;
  }
}
