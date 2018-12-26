const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema (
    {
        firstName: String,
        middleName: String,
        lastName: String,
        phone: Number,
        token: String,
        role: String,
        email: String
    }
)

UserSchema.methods.getUser = function (firstName) {
    User.find ({"firstName" : firstName}).then((user) => {
        return user
    })
}
module.exports = mongoose.model('UserBase', UserSchema)