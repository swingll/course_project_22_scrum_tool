var bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Voting = db.voting;
const Story = db.story;

exports.voting = (req, res) => {
    console.log("do this");
    const _id = req.params.id;

    Voting.findById(_id).populate(['contributors', 'story', 'task']).exec((err, voting) => {
        if (err) return res.status(500).send({ message: err });

        if (!voting)
            return res.status(404).send({ message: 'voting not found' });

        res.json(voting);
    });
};

exports.votingByTask = (req, res) => {
    console.log("do this votingByTask");
    const id = req.params.id;

    Voting.find({task:id}).exec(function (err, voting) {
        if (err) return next(err);
        if (!voting)
            return res.status(404).send({ message: 'voting not found' });

        console.log("voting",voting);
        res.json(voting);
    });  
};

exports.votings = (req, res) => {
    Voting.find().populate(['contributors', 'story', 'task']).exec((err, votings) => {
        if (err) return res.status(500).send({ message: err });

        res.json(votings);
    });
};

exports.create = (req, res) => {
    // if (!req.body.text) return res.status(500).send({ message: 'Text cannot be empty' });
    // if (!req.body.duration) return res.status(500).send({ message: 'Duratoin cannot be empty' });
    console.log("req.body.story",req.body.story);
    console.log("req.body.task",req.body.task);
    console.log("req.body.data",req.body.data);
    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

            Story.findById(req.body.story).exec((err, story) => {
                if (err) return res.status(500).send({ message: err });

                if (!story)
                    return res.status(404).send({ message: 'Story not found' });
                
                if(!story.voting){
                    const voting = new Voting({
                        contributors: [user._id],
                        status: req.body.status || 1,
                        story: story._id,
                        task: req.body.task,
                        data: req.body.data,                       
                    });
    
                    voting.save((err, voting) => {
                        if (err) return res.status(500).send({ message: err });
            
                        res.json(voting);
                    });
                    console.log("voting._id", voting._id);
                    // story.voting=voting._id;
                    // story.save((err, story) => {
                    //     if (err) return res.status(500).send({ message: err });
                    // });
                }else{
                    console.log("voting exist");
                    res.json(story.voting);
                }
               
        });
    });
};

exports.edit = (req, res) => {

    console.log("voting edit");
    console.log("req.body", req.body);
    const _id = req.params.id;
    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (!user)
            return res.status(404).send({ message: 'User not found' });
            Voting.findById(_id).exec((err, voting) => {
                if (err) return res.status(500).send({ message: err });
                if (!voting)
                    return res.status(404).send({ message: 'Voting not found' });                
                
                voting.status = req.body.status ?? voting.status;
                voting.contributors.push(user._id);                 
                voting.date = Date.now();
                voting.data = req.body.data ?? voting.data;
                console.log(voting);
                voting.save((err, voting) => {
                    if (err) return res.status(500).send({ message: err });
        
                    res.json(voting);
                });
                  
                
               
        });
    });

};

exports.delete = (req, res) => {
    const _id = req.params.id;

    User.findByIdAndRemove(_id).exec((err, ret) => {
        if (err) return res.status(500).send({ message: err });
        
        return res.status(200).send({ message: `${ret.deletedCount} user have been deleted` });
    });
};
