const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    // Role ID
    id: {
        type: String,
        required: true,
        unique: [ true, "Role ID already exist" ]
    },
    
    // Role Name
    name: {
        type: String,
        required: true,
        unique: [ true, "Role name already exist" ]
    },
})

module.exports = mongoose.model('role', RoleSchema);