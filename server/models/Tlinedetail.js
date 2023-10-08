const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const TlinedetailSchema = new Schema({    
    text:{
        type:String,
        default:'No Content'
    },
    start_date:{
        type:String
        
    },
    duration:{
		type:Number
    },
    progress:{
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
    id:{
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
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('tlinedetail',TlinedetailSchema);