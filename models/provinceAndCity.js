const mongoose = require('mongoose')
const Schema = mongoose.Schema

const provinceAndCity = new Schema(
  {
    value: String,
    label: String,
    children: Array
  },
  { versionKey: false }
)

module.exports = mongoose.model('ChinaProvinces', provinceAndCity)
