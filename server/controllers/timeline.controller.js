var bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Timeline = db.timeline;
const Story = db.story;

exports.timeline = (req, res) => {
    const _id = req.params.id;

    Timeline.findById(_id).populate(['contributors', 'timelinedetails', 'timelinelinks','story']).exec((err, timeline) => {
        if (err) return res.status(500).send({ message: err });

        if (!timeline)
            return res.status(404).send({ message: 'timeline not found' });

        res.json(timeline);
    });
};

exports.timelines = (req, res) => {
    Timeline.find().populate(['contributors', 'timelinedetails', 'timelinelinks','story']).exec((err, timelines) => {
        if (err) return res.status(500).send({ message: err });

        res.json(timelines);
    });
};

exports.create = (req, res) => {
    // if (!req.body.text) return res.status(500).send({ message: 'Text cannot be empty' });
    // if (!req.body.duration) return res.status(500).send({ message: 'Duratoin cannot be empty' });
    // console.log("req.body.story",req.body.story);
    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

            Story.findById(req.body.story).exec((err, story) => {
                if (err) return res.status(500).send({ message: err });

                if (!story)
                    return res.status(404).send({ message: 'Story not found' });
                
                if(!story.timeline){
                    const timeline = new Timeline({
                        contributors: [user._id],
                        status: req.body.status || 1,
                        story: story._id,
                        timelinedetails: [],
                        timelinelinks: [],
                    });
    
                    timeline.save((err, timeline) => {
                        if (err) return res.status(500).send({ message: err });
            
                        res.json(timeline);
                    });
                    // console.log("timeline._id", timeline._id);
                    story.timeline=timeline._id;
                    story.save((err, story) => {
                        if (err) return res.status(500).send({ message: err });
                    });
                }else{
                    console.log("timeline exist");
                    res.json(story.timeline);
                }
               
        });
    });
};

exports.edit = (req, res) => {
    console.log("timeline edit");
    const _id = req.params.id;
    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });
        console.log("timeline 1");
        if (!user)
            return res.status(404).send({ message: 'User not found' });
            console.log("timeline 2");
            Timeline.findById(_id).exec((err, timeline) => {
                if (err) return res.status(500).send({ message: err });
                console.log("timeline 3");
                if (!timeline)
                    return res.status(404).send({ message: 'Story not found' });                
                console.log("timeline 14");
                
                timeline.status = req.body.status ?? timeline.status;
                timeline.contributors.push(user._id);
                  
               
                timeline.updatedAt = Date.now();

                timeline.save((err, timeline) => {
                    if (err) return res.status(500).send({ message: err });
        
                    res.json(timeline);
                });
                  
                
               
        });
    });
};

exports.delete = (req, res) => {
    const _id = req.params.id;

    Timeline.findByIdAndRemove(_id).exec((err, ret) => {
        if (err) return res.status(500).send({ message: err });
        
        return res.status(200).send({ message: `${ret.deletedCount} user have been deleted` });
    });
};
