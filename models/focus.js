const mongoose = require('mongoose')
const Schema = mongoose.Schema

const focus = new Schema(
  {
    userId: String,
    fans: {
      type: [String],
      default: () => {
        return []
      }
    },
    focus: {
      type: [String],
      default: () => {
        return []
      }
    },
    fansNum: {
      type: Number,
      default: 0
    },
    focusNum: {
      type: Number,
      default: 0
    }
  },
  { versionKey: false }
)

module.exports = mongoose.model('Focus', focus)
