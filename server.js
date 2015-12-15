var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var app = express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost?marksong");
var Song = require('./models/song');

var path = require('path');
var _ = require('underscore');
app.locals.moment = require('moment');

app.set('views', './views/pages');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port);
console.log('listen on port: ' + port);

app.get('/', function(req, res) {
    Song.fetch(function(err, songs) {
        if (err) {
            console.log(err);
        }

        res.render('song_list', {
            title: '歌曲列表',
            songs: songs
        });
    });
});

app.get('/song/add', function(req, res) {
    res.render('song_edit', {
        title: "录入歌曲",
        song: {
            singer: '',
            title: '',
            country: '',
            year: '',
            poster: ''
        }
    });
});

app.get('/song/:id', function(req, res) {
    var id = req.params.id;
    Song.findByID(id, function(err, song) {
        if (err) {
            console.log(err);
        }
        res.render('song_edit', {
            title: "编辑歌曲",
            song: song
        });
    });
});

app.get('/song/remove/:id', function(req, res) {
    var id = req.params.id;
    Song.findByID(id, function(err, song) {
        if (err) {
            console.log(err);
        }
        song.remove();
        res.redirect('/');
    });
});

app.post('/song/save', function(req, res) {
    var id = req.body.song._id
    var songObj = req.body.song
    var _song

    if (id != 'undefined') { //edit
        Song.findByID(id, function(err, song) {
            if (err) {
                console.log(err);
            }

            _song = _.extend(song, songObj);
            _song.save(function(err, song) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/');
            });
        });
    } else //new 
    {
        _song = new Song({
            title: songObj.title,
            singer: songObj.singer,
            country: songObj.country,
            year: songObj.year,
            poster: songObj.poster

        });

        _song.save(function(err, song) {
            if (err) {
                console.log(err);
            }

            res.redirect('/');
        });
    }
});
