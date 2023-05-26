const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {
}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postedBy: {
      type: DataTypes.INTEGER,
      references:{
        model: 'user',
        key: 'id'
      }
    },
    postTitle: {
      type: DataTypes.STRING,
      defaultValue: 'test',
    },
    cont: {
      type: DataTypes.STRING,
      allowNull: false,
    }
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

module.exports = Posts;