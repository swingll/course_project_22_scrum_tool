const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    // Story title
    title: {
        type: String,
        maxlength: 30
    },

    // Creator
    creator: {
        type: Schema.Types.ObjectId,
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

module.exports = mongoose.model('story', StorySchema);