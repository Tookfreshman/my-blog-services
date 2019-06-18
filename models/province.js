const mongoose = require('mongoose')
const Schema = mongoose.Schema

const province = new Schema(
  {
    code: String,
    name: String
  },
  { versionKey: false }
)

module.exports = mongoose.model('Provinces', province)
