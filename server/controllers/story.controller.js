var bcrypt = require('bcryptjs');

const db = require('../models');
const Story = db.story;
const User = db.user;
const Task = db.task;

exports.story = (req, res) => {
    const _id = req.params.id;

    Story.findById(_id).populate('creator').populate('members').populate({ path: 'tasks', populate: { path: 'contributors' } }).exec((err, story) => {
        if (err) return res.status(500).send({ message: err });

        if (!story)
            return res.status(404).send({ message: 'Story not found' });

        res.json(story);
    });
};

exports.stories = (req, res) => {
    Story.find().populate('creator').populate('members').populate({ path: 'tasks', populate: { path: 'contributors' } }).exec((err, stories) => {
        if (err) return res.status(500).send({ message: err });

        // fetch stories if user is the creator or member of stories
        // TODO: admin bypass
        const _stories = stories.filter(s => (s.creator._id == req.userId || s.members.filter(m => m._id == req.userId).length > 0))

        res.json(_stories);
    });
};

exports.create = (req, res) => {
    if (!req.body.title) return res.status(500).send({ message: 'Title cannot be empty' });

    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

        const story = new Story({
            title: req.body.title,
            creator: user._id
        });

        story.save((err, story) => {
            if (err) return res.status(500).send({ message: err });

            res.json(story);
        });
    });
};

exports.edit = (req, res) => {
    const _id = req.params.id;

    Story.findById(_id).exec((err, story) => {
        if (err) return res.status(500).send({ message: err });

        if (story.creator != req.userId)
            return res.status(403).send({ message: 'Only creator can add edit story' });

        if (!story) return res.status(404).send({ message: 'Story not found' });

        story.title = req.body.title ?? story.title;
        story.members = req.body.members ?? story.members;
        story.updatedAt = Date.now();

        story.save((err) => {
            if (err) return res.status(500).send({ message: err });

            res.status(200).send({ message: 'Title have been changed' });
        });
    });
};

exports.delete = (req, res) => {
    const _id = req.params.id;

    Story.findById(_id).exec((err, story) => {
        if (err) return res.status(500).send({ message: err });

        if (!story)
            return res.status(404).send({ message: 'Story not found' });

        if (story.creator != req.userId)
            return res.status(500).send({ message: 'Only the creator can delete the story' });

        Task.deleteMany({_id:{$in:story.tasks}},err=>{
            if (err) return res.status(500).send({ message: err });
            Story.findByIdAndRemove(_id).exec((err, ret) => {
                if (err) return res.status(500).send({ message: err });

                return res.status(200).send({ message: `${ret.deletedCount} story have been deleted` });
            });
        })


    });
};

