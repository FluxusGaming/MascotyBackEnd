const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return USER_ROLES.init(sequelize, DataTypes);
}

class USER_ROLES extends Sequelize.Model {
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
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ROLES',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'USER_ROLES',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_uuid" },
          { name: "rol_id" },
        ]
      },
      {
        name: "rol_id",
        using: "BTREE",
        fields: [
          { name: "rol_id" },
        ]
      },
    ]
  });
  return USER_ROLES;
  }
}
