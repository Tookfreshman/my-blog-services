const mongoose = require('mongoose')
const config = require('../config/mongo-config.js')

const { hostName, port, dbname } = config

const dbUrl = `mongodb://${hostName}:${port}/${dbname}`

mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)

mongoose.connection.on('connected', function() {
  console.log('Mongoose connection open to ' + dbUrl)
})
/**
 * 连接异常 error 数据库连接错误
 */
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err)
})
/**
 * 连接断开 disconnected 连接异常断开
 */
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})

function initDB() {
  mongoose.connect(dbUrl)
}

module.exports = initDB
