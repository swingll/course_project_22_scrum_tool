const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    // task title
    title: {
        type: String,
        default: 'No Title'
    },

    // task content
    content: {
        type: String,
        default: 'No Content'
    },

    // the date of task
    date: {
        type: Date,
        default: Date.now
    },

    // task contributors
    contributors: {
        type: [Schema.Types.ObjectId], //dont forget that!
        ref: 'user',
        required: true
    },

    // task status
    status: {
        type: Number,
        required: true,
        default: 1
    },

    // due date
    due: {
        type: Date,
        default: Date.now
    },

    color: {
        type: String,
        default: "#2196f3"
    },

    // Story ID
    story: {
        type: Schema.Types.ObjectId,
        ref: 'story',
        required: true
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

module.exports = mongoose.model('task', TaskSchema);