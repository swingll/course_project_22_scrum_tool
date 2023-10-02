const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const TimelineSchema = new Schema({    
    text:{
        type:String,
        default:'No Content'
    },
    start_date:{
        type:Date,
        default:Date.now
    },
    duration:{
		type:Number
    },
    contributors:{
        type:Schema.Types.ObjectId, //dont forget that!
        required:true
    },
    status:{
        type:Number,
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        required:true
    },
    storyId:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('timeline',TimelineSchema);