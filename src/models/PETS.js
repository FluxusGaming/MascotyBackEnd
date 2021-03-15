const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return PETS.init(sequelize, DataTypes);
}

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
    address: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'USERS',
        key: 'uuid'
      }
    },
    date_post: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_lost: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PETS',
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
    ]
  });
  return PETS;
  }
}
