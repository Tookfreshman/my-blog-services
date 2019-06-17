const mongoose = require('mongoose')
const Schema = mongoose.Schema

const city = new Schema(
  {
    provinceCode: String,
    cityList: Array
  },
  { versionKey: false }
)

module.exports = mongoose.model('Citys', city)
