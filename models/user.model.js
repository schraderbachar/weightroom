const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//add logic for email and password and hash the pass and make sure the email is valid
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        //put real email logic here
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    password: {
        //i think this put the hash logic here and i know its needed in the dotenv aswell.
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    }

}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;