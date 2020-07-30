'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Url.belongsTo(models.User, { foreignKey: "userId" });
    }
  };
  Url.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "true"
    }
  }, {
    sequelize,
    modelName: 'Url',
  });
  return Url;
};