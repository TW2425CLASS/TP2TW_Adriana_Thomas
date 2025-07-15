const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;
