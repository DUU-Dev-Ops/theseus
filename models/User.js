/*
 * Mongoose schema for user accounts
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
