const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userInfo = new Schema(
  {
    userName: String,
    password: String,
    registerTime: Date,
    userId: Schema.Types.ObjectId
  },
  { versionKey: false }
)

module.exports = mongoose.model('UserInfos', userInfo)
