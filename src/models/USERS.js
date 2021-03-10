const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return USERS.init(sequelize, DataTypes);
}

class USERS extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    second_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    first_lastname: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    second_lastname: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: false
    },
    verified_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'USERS',
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
    ]
  });
  return USERS;
  }
}
