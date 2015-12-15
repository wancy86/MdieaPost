var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var SongSchema = new Schema({
    title: String,
    singer: String,
    country: String,
    year: Number,
    poster:String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

SongSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.cteateAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});


SongSchema.post('save', function(doc) {
    console.log('%s has been saved', doc._id);
});

SongSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findByID: function(id, cb) {
        return this
            .findOne({
                _id: id
            })
            .exec(cb)
    }
};

module.exports=SongSchema;
