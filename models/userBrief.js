const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userBrief = new Schema(
  {
    userId: Schema.Types.ObjectId,
    portraitUrl: {
      type: String,
      default: ''
    },
    portraitName: {
      type: String,
      default: ''
    },
    nickName: {
      type: String,
      default: ''
    },
    bornDate: {
      type: String,
      default: ''
    },
    sex: {
      type: Number,
      default: null
    }, //1男性 2女性
    region: {
      type: String,
      default: null
    },
    industry: {
      type: String,
      default: null
    },
    brief: {
      type: String,
      default: ''
    }
  },
  { versionKey: false }
)

module.exports = mongoose.model('UserBriefs', userBrief)
