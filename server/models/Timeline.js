const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const TimelineSchema = new Schema({   
    contributors:{
        type:[Schema.Types.ObjectId], //dont forget that!
        ref: 'user',
        required:true
    },
    status:{
        type:Number,
        required:true
    },
    // id:{
    //     type:Number,
    //     required:true
    // },
    story: {
        type: Schema.Types.ObjectId,
        ref: 'story',
        required: true
    },
    timelinedetails: {
        type: [Schema.Types.ObjectId],
        ref: 'timelinedetail',
        //required: true
    },
    timelinelinks: {
        type: [Schema.Types.ObjectId],
        ref: 'timelinelink',
        //required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('timeline',TimelineSchema);