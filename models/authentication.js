const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authentications = new Schema(
  {
    userId: Schema.Types.ObjectId,
    authentication: {
      type: Number,
      default: 0
      // 0未认证 1认证
    }
  },
  { versionKey: false }
)

module.exports = mongoose.model('Authentications', authentications)
