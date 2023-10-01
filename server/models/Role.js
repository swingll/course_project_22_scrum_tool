const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    // Role Name
    name: {
        type: String,
        required: true,
        unique: [ true, "Role name already exist" ]
    },
    
    // Created At
    createdAt: {
        type: Date,
        default: Date.now
    },

    // Updated At
    updatedAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('role', RoleSchema);