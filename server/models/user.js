// import the necessary modules
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define schema
var UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String
});

//hook para encriptar el password del usuario cuando se crea
UserSchema.pre('save',
    function (callback) {
        var user = this;
        // Break out if the password hasn't changed
        if (!user.isModified('password')) {
            return callback();
        } 
        // Password changed so we need to hash it
        bcrypt.genSalt(5,
            function (err, salt) {
                if (err) {
                    return callback(err);
                } 
                bcrypt.hash(user.password, salt, null, function (err, hash) {
                    if (err) {
                        return callback(err);
                    }
                    user.password = hash;
                    callback();
                });
            });
    });

UserSchema.methods.verifyPassword = function (username, password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        return cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);