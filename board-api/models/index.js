const Sequelize = require('sequelize')
const User = require('./user')
const Post = require('./post')
const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'

const config = require('../config/config')[env]
const db = {}
dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.User = User
db.Post = Post

User.init(sequelize)
Post.init(sequelize)

User.associate(db)
Post.associate(db)

module.exports = db
