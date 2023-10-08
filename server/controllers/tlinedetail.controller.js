var bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Tlinedetail = db.tlinedetail;

exports.tlinedetail = (req, res) => {
    const _id = req.params.id;

    Tlinedetail.findById(_id).exec((err, tlinedetail) => {
        if (err) return res.status(500).send({ message: err });

        if (!tlinedetail)
            return res.status(404).send({ message: 'timelineDetail not found' });

        res.json(tlinedetail);
    });
};

exports.tlinedetails = (req, res) => {
    console.log("do this");
    Tlinedetail.find().exec((err, tlinedetails) => {
        if (err) return res.status(500).send({ message: err });

        res.json(tlinedetails);
    });
};

// exports.create = (req, res) => {
//     if (!req.body.text) return res.status(500).send({ message: 'Text cannot be empty' });
//     if (!req.body.duration) return res.status(500).send({ message: 'Duratoin cannot be empty' });

//     User.findById(req.userId).exec((err, user) => {
//         if (err) return res.status(500).send({ message: err });

//         if (!user)
//             return res.status(404).send({ message: 'User not found' });

//         Tlinedetail.findById(req.body.story).exec((err, story) => {
//             if (err) return res.status(500).send({ message: err });

//             if (!story)
//                 return res.status(404).send({ message: 'Story not found' });
            
//             const timeline = new Timeline({
//                 text: req.body.text,
//                 start_date: req.body.start_date,
//                 duration: req.body.duration,
//                 progress: req.body.progress,
//                 contributors: [user._id],
//                 status: req.body.status || 1,
//                 story: story._id,
//             });
    
//             timeline.save((err, timeline) => {
//                 if (err) return res.status(500).send({ message: err });
    
//                 res.json(timeline);
//             });

//             // story.tasks.push(task._id)

//             // story.save((err, task) => {
//             //     if (err) return res.status(500).send({ message: err });
//             // });
//         });
//     });
// };

// exports.edit = (req, res) => {

//     // if password is empty
//     if (!req.body.password) return res.status(500).send({ message: 'Password cannot be empty' });

//     Timeline.findById(req.userId).exec((err, user) => {
//         if (err) return res.status(500).send({ message: err });

//         if (!user)
//             return res.status(404).send({ message: 'User not found' });

//         user.password = bcrypt.hashSync(req.body.password, 8);
//         user.updatedAt = Date.now();

//         user.save((err) => {
//             if (err) return res.status(500).send({ message: err });

//             res.status(200).send({ message: 'Password have been changed' });
//         });
//     });
// };

// exports.delete = (req, res) => {
//     const _id = req.params.id;

//     User.findByIdAndRemove(_id).exec((err, ret) => {
//         if (err) return res.status(500).send({ message: err });
        
//         return res.status(200).send({ message: `${ret.deletedCount} user have been deleted` });
//     });
// };
