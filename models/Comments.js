const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cont: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: 'postedOn',
    freezeTableName: true,
    underscored: true,
    modelName: 'posts',
  }
);

module.exports = Comments;