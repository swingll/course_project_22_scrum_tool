const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const TimelinelinkSchema = new Schema({    
    id:{
        type:Number,
        required:true
    },
    source:{
		type:Number
    },
    target:{
		type:Number
    },
    type:{
		type:Number
    },
    contributors:{
        type:[Schema.Types.ObjectId], //dont forget that!
        required:true
    },
    status:{
        type:Number,
        required:true
    },
    // createdBy:{
    //     type:Schema.Types.ObjectId,
    //     required:true
    // },
    // Story ID
    timeline: {
        type: Schema.Types.ObjectId,
        ref: 'timeline',
        required: true
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('timelinelink',TimelinelinkSchema);