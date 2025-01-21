const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
  author: String,
  authorPic: String,
  published_date: String,
  reading_time: String,
  content: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;

