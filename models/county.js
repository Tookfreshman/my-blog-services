const mongoose = require('mongoose')
const Schema = mongoose.Schema

const county = new Schema(
  {
    cityCode: String,
    areaList: Array
  },
  { versionKey: false }
)

module.exports = mongoose.model('Countys', county)
