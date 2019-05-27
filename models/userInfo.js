const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserInfo = new Schema({
  author: ObjectId,
  userName: String,
  password: String,
  registerTime: Date
})

module.exports = mongoose.model('UserInfos', UserInfo)
