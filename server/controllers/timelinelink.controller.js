var bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Timeline = db.timeline;
const Timelinelink = db.timelinelink;

exports.timelinelink = (req, res) => {
    const _id = req.params.id;

    Timelinelink.findById(_id).exec((err, timelinelink) => {
        if (err) return res.status(500).send({ message: err });

        if (!timelinelink)
            return res.status(404).send({ message: 'timeline link not found' });

        res.json(timelinelink);
    });
};

exports.timelinelinks = (req, res) => {
    Timelinelink.find().exec((err, timelinelinks) => {
        if (err) return res.status(500).send({ message: err });

        res.json(timelinelinks);
    });
};

exports.create = (req, res) => {
    console.log("Timeline link create start.");
    if (!req.body.source) return res.status(500).send({ message: 'Text cannot be empty' });
    if (!req.body.target) return res.status(500).send({ message: 'Duratoin cannot be empty' });

    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

            Timeline.findById(req.body.timeline).exec((err, timeline) => {
                if (err) return res.status(500).send({ message: err });

                if (!timeline)
                    return res.status(404).send({ message: 'Timeline not found' });
                console.log(req.body);
                const timelinelink = new Timelinelink({
                    id: req.body.id,
                    source: req.body.source,
                    target: req.body.target,
                    type: req.body.type,
                    contributors: [user._id],
                    status: req.body.status || 1,
                    timeline: req.body.timeline,
                });
        
                timelinelink.save((err, timelinelink) => {
                    if (err) return res.status(500).send({ message: err });
        
                    res.json(timelinelink);
                });

                timeline.timelinelinks.push(timelinelink._id)

                timeline.save((err, timelinelink) => {
                if (err) return res.status(500).send({ message: err });
                });
               
           
        });
    });
    console.log("Timeline link create end.");
};

exports.edit = (req, res) => {

    console.log("Timeline link edit start.");
    if (!req.body.source) return res.status(500).send({ message: 'Text cannot be empty' });
    if (!req.body.target) return res.status(500).send({ message: 'Duratoin cannot be empty' });

    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

            Timeline.findById(req.body.timeline).exec((err, timeline) => {
                if (err) return res.status(500).send({ message: err });

                if (!timeline)
                    return res.status(404).send({ message: 'Timeline not found' });
                
                Timelinelink.findById(req.body._id).exec((err, timelineLink) => {
                    if (err) return res.status(500).send({ message: err });

                    if (!timelineLink)
                        return res.status(404).send({ message: 'Timeline link not found' });                    

                    console.log(timelineLink);
                    timelineLink.source = req.body.text ?? timelinedetail.source;
                    timelineLink.target = req.body.duration ?? timelinedetail.target;
                    timelineLink.type = req.body.start_date ?? timelinedetail.type;
                    timelineLink.contributors.push(user._id);
                    timelineLink.updatedAt = Date.now();

                    timelinedetail.save((err, timelinedetail) => {
                        if (err) return res.status(500).send({ message: err });
    
                        res.json(timelinedetail);
                    });    
                   
                });
                
        });
    });
    console.log("Timeline link edit end.");      
};

exports.delete = (req, res) => {
    const _id = req.params.id;

    Timelinelink.findByIdAndRemove(_id).exec((err, ret) => {
        if (err) return res.status(500).send({ message: err });
        
        return res.status(200).send({ message: `Timeline link have been deleted` });
    });
};

