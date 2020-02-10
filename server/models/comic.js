'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Comic extends Model{}

  Comic.init({
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  },{sequelize})

  Comic.associate = function(models) {
    Comic.belongsTo(models.User)
    // associations can be defined here
  };
  return Comic;
};