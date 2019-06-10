const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserInfo = new Schema(
  {
    userName: String,
    password: String,
    registerTime: Date
  },
  { versionKey: false }
)

module.exports = mongoose.model('UserInfos', UserInfo)
