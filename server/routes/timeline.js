const express = require('express');
const router = express.Router();

const Timeline = require('../models/Timeline');

router.post('/',(req,res,next)=>{
  const timeline = new Timeline(req.body);
  const promise = timeline.save();
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

//Hangi statusta kaç tane task olduğunu gösterir
router.get('/counter',(req,res)=>{
  const promise = Timeline.aggregate([
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


//taskları ve contributorsunu yazar
router.get('/:id',(req,res)=>{
  console.log("get timeline");
  console.log(req.params.id);
  const promise = Timeline.aggregate([
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
          text:'$text',          
          status:'$status',
          start_date:'$start_date',          
          duration:'$duration',
          createdBy:'$createdBy',
          date:'$date',
        },
        contributors:{
        $push:'$contributors'
    }
  }
  },
    {
      $project:{
        _id:'$_id._id',
        text:'$_id.text',        
        status:'$_id.status',
        start_date:'$_id.start_date',
        duration:'$_id.duration',        
        createdBy: '$_id.createdBy',
        date:'$_id.date',
        contributors: '$contributors',
      }
    }
  ]);
  promise.then((data)=>{
    console.log(data);
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})
//tek task yazar
router.get('/task/:id',(req,res)=>{
  const promise = Timeline.aggregate([
    {
      $match:{
        _id:  parseInt(req.params.id)
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
          text:'$text',          
          status:'$status',
          start_date:'$start_date',          
          duration:'$duration',
          createdBy:'$createdBy'
        },
        contributors:{
        $push:'$contributors'
    }
  }
  },
    {
      $project:{
        _id:'$_id._id',
        text:'$_id.text',        
        status:'$_id.status',
        start_date:'$_id.start_date',
        duration:'$_id.duration',        
        createdBy: '$_id.createdBy',
        contributors: '$contributors',
      }
    }
  ]);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})
//todo
router.put('/update/:id',(req,res)=>{
  const promise = Timeline.findByIdAndUpdate(req.params.id,req.body);
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

//Task silme
router.delete('/delete/:id',(req,res)=>{
  const promise = Timeline.findByIdAndRemove(req.params.id)
  promise.then((count)=>{
    if(count==null)
      res.json({status:'0'})//zaten silinmiş ise 0
    res.json({status:'1'})
  }).catch((err)=>{
    res.json(err)
  })
})

module.exports = router;
