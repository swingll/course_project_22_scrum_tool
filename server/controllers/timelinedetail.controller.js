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
    console.log("@@@@@@@@@@@@@@@@@@@@@");
    if (!req.body.text) return res.status(500).send({ message: 'Text cannot be empty' });
    if (!req.body.duration) return res.status(500).send({ message: 'Duratoin cannot be empty' });

    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

            Timeline.findById(req.body.timeline).exec((err, timeline) => {
                if (err) return res.status(500).send({ message: err });

                if (!timeline)
                    return res.status(404).send({ message: 'Timeline not found' });
                
                const timelinedetail = new Timelinedetail({
                    id:req.body.id,
                    text: req.body.text,
                    parent: req.body.parent,
                    start_date: req.body.start_date,
                    duration: req.body.duration,
                    progress: req.body.progress,
                    contributors: [user._id],
                    status: req.body.status || 1,
                    timeline: req.body.timeline,
                });
                timelinedetail.save((err, timelinedetail) => {
                    if (err) return res.status(500).send({ message: err });

                    res.json(timelinedetail);
                });
                console.log("do 2");
                console.log("timeline", timeline);
                timeline.timelinedetails.push(timelinedetail._id)

                timeline.save((err, timelinedetail) => {
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
