const mongoose = require('mongoose')
const Schema = mongoose.Schema

const viewerCount = new Schema(
  {
    name: String,
    count: Number
  },
  { versionKey: false }
)

module.exports = mongoose.model('Counts', viewerCount)
