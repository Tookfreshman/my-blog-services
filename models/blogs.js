const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blogs = new Schema(
  {
    userId: String,
    title: String,
    articleType: String,
    article: String,
    author: String,
    desc: String,
    blogImgUrl: {
      type: String,
      default: ''
    },
    blogImgName: {
      type: String,
      default: ''
    },
    viewerCount: {
      type: Number,
      default: 0
    },
    publishTime: { type: Date, default: new Date() }
  },
  { versionKey: false }
)

module.exports = mongoose.model('Blogs', Blogs)
