'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Painting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Painting.belongsTo(models.Painter, {foreignKey: 'painterId'})
    }
  }
  Painting.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Painting',
  });
  return Painting;
};