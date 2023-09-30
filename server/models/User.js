const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // User Username
    username: {
        type: String,
        required: true,
        unique: [ true, "Username already exist, please login or use other username" ],
    },

    // User Email
    email: {
        type: String,
        required: true,
    },

    // User Password
    password: {
        type: String,
        required: true,
    },

    // User role
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "role"
        }
    ],

    // User Name
    name: String,

    // Last Name
    lastName: String,

    // Whether the user public
    public: {
        type: Boolean,
        default: false
    },

    // User Profile Picture
    profilePhoto:{
        type: String,
        default: 'default.jpg'
    },
})

module.exports = mongoose.model('user',UserSchema);