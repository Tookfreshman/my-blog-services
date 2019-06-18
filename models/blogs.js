const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blogs = new Schema(
  {
    userId: String,
    title: String,
    articleType: String,
    article: String,
    publishTime: { type: Date, default: Date.now }
  },
  { versionKey: false }
)

module.exports = mongoose.model('Blogs', Blogs)
