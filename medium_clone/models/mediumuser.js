'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MediumUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MediumUser.hasMany(models.MediumArticle, {
        as: 'authored',
        foreignKey: 'authorId'
      })
      MediumUser.belongsToMany(models.MediumArticle, {
        as: 'reading_list',
        through: models.MediumReadingList,
        foreignKey: 'userId'
      })
    }
  }
  MediumUser.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'MediumUser',
      tableName: 'medium_users'
    }
  )
  return MediumUser
}
