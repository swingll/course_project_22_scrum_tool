var bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Timeline = db.timeline;
const Timelinedetail = db.timelinedetail;

exports.timelinedetail = (req, res) => {
    const _id = req.params.id;

    Timelinedetail.findById(_id).exec((err, timelinedetail) => {
        if (err) return res.status(500).send({ message: err });

        if (!timelinedetail)
            return res.status(404).send({ message: 'timeline detail not found' });

        res.json(timelinedetail);
    });
};

exports.timelinedetails = (req, res) => {
    Timelinedetail.find().exec((err, timelinedetails) => {
        if (err) return res.status(500).send({ message: err });

        res.json(timelinedetails);
    });
};

exports.create = (req, res) => {
    if (!req.body.text) return res.status(500).send({ message: 'Text cannot be empty' });
    if (!req.body.duration) return res.status(500).send({ message: 'Duratoin cannot be empty' });

    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

        Timelinedetail.findById(req.body.story).exec((err, story) => {
            if (err) return res.status(500).send({ message: err });

            if (!story)
                return res.status(404).send({ message: 'Story not found' });
            
            const timelinedetail = new Timelinedetail({
                id:3,
                text: req.body.text,
                start_date: req.body.start_date,
                duration: req.body.duration,
                progress: req.body.progress,
                contributors: [user._id],
                status: req.body.status || 1,
                story: story._id,
            });
            timelinedetail.save((err, timelinedetail) => {
                if (err) return res.status(500).send({ message: err });
    
                res.json(timeline);
            });

            Timeline.timelinedetails.push(timelinedetails._id)

            Timeline.save((err, timelinedetails) => {
                if (err) return res.status(500).send({ message: err });
            });
        });
    });
};

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
