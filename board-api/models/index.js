const Sequelize = require('sequelize')
const User = require('./user')
const Board = require('./board')
const Hashtag = require('./hashtag')
const Comment = require('./comment')

const dotenv = require('dotenv')

const env = process.env.NODE_ENV || 'development'

const config = require('../config/config')[env]
const db = {}
dotenv.config()

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize

db.User = User
db.Board = Board
db.Hashtag = Hashtag
db.Comment = Comment

User.init(sequelize)
Board.init(sequelize)
Hashtag.init(sequelize)
Comment.init(sequelize)

User.associate(db)
Board.associate(db)
Hashtag.associate(db)
Comment.associate(db)

module.exports = db
