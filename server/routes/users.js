const express = require('express');
const router = express.Router();

const { jwt } = require('../helpers/auth');
const controller = require('../controllers/user.controller');

router.get('/', [jwt.verifyToken, jwt.isAdmin, controller.users]);

router.get('/:id', [jwt.verifyToken, controller.users]);

router.put('/edit', [jwt.verifyToken, controller.edit]);

router.put('/edit/:id', [jwt.verifyToken, jwt.isAdmin, controller.users]);

router.delete('/delete/:id', [jwt.verifyToken, jwt.isAdmin, controller.delete]);

// const User = require('../models/User');

// router.post('/',(req,res,next)=>{
//   const user = new User(req.body)
//   user.save((err,data)=>{
//     if(err)
//     next({message:'User not found',code:'0'})
//     res.json(data)
//   })
// })

// router.get('/',(req,res,next)=>{
//   const promise = User.find({})
//   promise.then((data) => {
//     if(!data)
//     next({message:'no',code:5})
// 		res.json(data);
// 	}).catch((err) => {
// 		res.json(err);
// 	})
// })
// //User Update


// //User silme
// router.delete('/delete/:id',(req,res)=>{
//   const promise = User.findByIdAndRemove(req.params.id)
//   promise.then((count)=>{
//     if(count==null)
//       res.json({status:'0'})//zaten silinmiş ise 0
//     res.json({status:'1'})
//   }).catch((err)=>{
//     res.json(err)
//   })
// })

module.exports = router;