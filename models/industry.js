const mongoose = require('mongoose')
const Schema = mongoose.Schema

const industry = new Schema(
  {
    codeid: Number,
    codenamecn: String,
    parentid: Number
  },
  { versionKey: false }
)

module.exports = mongoose.model('Industrys', industry)
