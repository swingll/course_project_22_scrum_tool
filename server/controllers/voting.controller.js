var bcrypt = require('bcryptjs');

const db = require('../models');
const User = db.user;
const Voting = db.voting;
const Story = db.story;
const Task = db.task;

exports.voting = (req, res) => {
    const _id = req.params.id;

    Voting.findById(_id).populate(['contributors', 'story', 'task']).exec((err, voting) => {
        if (err) return res.status(500).send({ message: err });

        if (!voting)
            return res.status(404).send({ message: 'voting not found' });

        res.json(voting);
    });
};

exports.votingByTask = (req, res) => {
    const id = req.params.id;

    Voting.find({task:id}).exec(function (err, voting) {
        if (err) return next(err);
        if (!voting)
            return res.status(404).send({ message: 'voting not found' });

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
    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

            Story.findById(req.body.story).exec((err, story) => {
                if (err) return res.status(500).send({ message: err });

                if (!story)
                    return res.status(404).send({ message: 'Story not found' });
                
                Task.findById(req.body.task).exec((err, task) => {
                    if (err) return res.status(500).send({ message: err });

                    if (!task)
                        return res.status(404).send({ message: 'Task not found' });
                    if(!task.voting || task.voting.length <= 0){
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
                        task.voting.push(voting._id)

                        task.save((err, voting) => {
                            if (err) return res.status(500).send({ message: err });
                        });
                        
                    }else{
                        res.json(story.voting);
                    }
                });
                
               
        });
    });
};

exports.edit = (req, res) => {

    const _id = req.params.id;
    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });
        if (!user)
            return res.status(404).send({ message: 'User not found' });
            Voting.findById(_id).exec((err, voting) => {
                if (err) return res.status(500).send({ message: err });
                if (!voting)
                    return res.status(404).send({ message: 'Voting not found' });                
                let contributors = voting.contributors.slice(1);
                if(contributors.length > 0 && contributors.includes(user._id.toString())){
                    return res.status(200).send({ message: 'You already voted.' });      
                }
                // let voting.contributors.filter((item,idx)=> i)
                voting.status = req.body.status ?? voting.status;
                voting.contributors.push(user._id);                 
                voting.date = Date.now();
                voting.data = req.body.data ?? voting.data;
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
