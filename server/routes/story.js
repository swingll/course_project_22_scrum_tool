const express = require('express');
const router = express.Router();


const Story = require('../models/Story');

router.post('/',(req,res,next)=>{
  console.log("save story");
  const story = new Story(req.body);
  const promise = story.save();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

router.get('/count',(req,res)=>{
  console.log("do this1")
  const promise = Story.aggregate([
    {
      $group:{
        _id:'$status',
        count:{$sum:1}
      }
    }
  ])
  promise.then((count)=>{
    res.json(count)
  }).catch((err)=>{
    res.json(err)
  })
})

router.get('/:id',(req,res)=>{
  const promise = Task.aggregate([
    {
      $match:{
        storyId:  parseInt(req.params.id)
      }
    },
    {
      $lookup:{
        from:'users',
        localField:'contributors',
        foreignField:'_id',
        as:'contributors'
      }
    },
    {
      $unwind:{
        path:'$contributors'
      }
    },
    {
      $group:{
        _id:{
          _id:'$_id',
          title:'$title',
          createdBy:'$createdBy',
          createdDate:'$createdDate'
        },
        contributors:{
        $push:'$contributors'
    }
  }
  },
    
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

router.post('/',(req,res,next)=>{
  console.log("do this2")
  const story = new Story(req.body)
  story.save((err,data)=>{
    if(err)
    next({message:'Story not found',code:'0'})
    res.json(data)
  })
})

router.get('/',(req,res,next)=>{
  console.log("do this3")
  const promise = Story.find({})
  promise.then((data) => {
    console.log("data",data)
    if(!data)
      next({message:'no data',code:5})
		res.json(data);
	}).catch((err) => {
		res.json(err);
	})
})
//Story Update


//Story silme
router.delete('/delete/:id',(req,res)=>{
  const promise = Story.findByIdAndRemove(req.params.id)
  promise.then((count)=>{
    if(count==null)
      res.json({status:'0'})//zaten silinmiş ise 0
    res.json({status:'1'})
  }).catch((err)=>{
    res.json(err)
  })
})

module.exports = router;