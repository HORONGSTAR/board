const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
            },
            nick: {
               type: Sequelize.STRING(40),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.User.hasMany(db.Board)
      db.User.hasMany(db.Comment)
      db.User.belongsToMany(db.User, {
         foreignKey: 'followingId',
         as: 'Followers',
         through: 'Follow',
      })
      db.User.belongsToMany(db.User, {
         foreignKey: 'followerId',
         as: 'Followings',
         through: 'Follow',
      })
   }
}
