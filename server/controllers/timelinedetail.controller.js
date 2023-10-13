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
    console.log("Timeline detail create start.");
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

                timeline.timelinedetails.push(timelinedetail._id)

                timeline.save((err, timelinedetail) => {
                    if (err) return res.status(500).send({ message: err });
                });
        });
    });
    console.log("Timeline detail create end.");
};

exports.edit = (req, res) => {

    console.log("Timeline detail edit start.");
    if (!req.body.text) return res.status(500).send({ message: 'Text cannot be empty' });
    if (!req.body.duration) return res.status(500).send({ message: 'Duratoin cannot be empty' });
    if (!req.body.start_date) return res.status(500).send({ message: 'Start Date cannot be empty' });

    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

            Timeline.findById(req.body.timeline).exec((err, timeline) => {
                if (err) return res.status(500).send({ message: err });

                if (!timeline)
                    return res.status(404).send({ message: 'Timeline not found' });
                
                Timelinedetail.findById(req.body._id).exec((err, timelinedetail) => {
                    if (err) return res.status(500).send({ message: err });

                    if (!timelinedetail)
                        return res.status(404).send({ message: 'Timeline detail not found' });
                    

                    console.log(timelinedetail);
                    timelinedetail.text = req.body.text ?? timelinedetail.text;
                    timelinedetail.duration = req.body.duration ?? timelinedetail.duration;
                    timelinedetail.start_date = req.body.start_date ?? timelinedetail.start_date;
                    timelinedetail.contributors.push(user._id);
                    timelinedetail.updatedAt = Date.now();

                    timelinedetail.save((err, timelinedetail) => {
                        if (err) return res.status(500).send({ message: err });
    
                        res.json(timelinedetail);
                    });    
                   
                });
                
        });
    });
    console.log("Timeline detail edit end.");      
};

exports.delete = (req, res) => {
    const _id = req.params.id;

    Timelinedetail.findByIdAndRemove(_id).exec((err, ret) => {
        if (err) return res.status(500).send({ message: err });
        
        return res.status(200).send({ message: `${ret.deletedCount} Timeline detail have been deleted` });
    });
};
