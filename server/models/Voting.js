const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const VotingSchema = new Schema({   
    contributors: {
        type:[Schema.Types.ObjectId], //dont forget that!
        ref: 'user',
        // required:true
    },
    status: {
        type: Number,
        // required:true
    },
    title: {
        type: String,
        // required:true
    },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'story',
        // required: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: 'task',
        // required: true
    },
    data: [{        
        name: String,
        votes:Number
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('voting',VotingSchema);