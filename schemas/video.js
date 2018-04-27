const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: String,
  link: String,
  pubDate: Date,
  author: String,
  id: String,
  user: String,
  favourite: Boolean
}, { collection : 'videos' });

module.exports = mongoose.model( 'VideoModel', VideoSchema );