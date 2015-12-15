var Mongoose = require('mongoose');
var SongSchema = require('../schemas/song');
var Song = Mongoose.model('Song', SongSchema);

module.exports = Song;
