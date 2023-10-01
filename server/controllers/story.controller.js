var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const db = require('../models');
const Story = db.story;
const User = db.user;

exports.story = (req, res) => {
    const _id = req.query.id;

    Story.findById(_id).exec((err, story) => {
        if (err) return res.status(500).send({ message: err });

        if (!story)
            return res.status(404).send({ message: 'Story not found' });

        res.json(story);
    });
};

exports.stories = (req, res) => {
    Story.find().exec((err, stories) => {
        if (err) return res.status(500).send({ message: err });

        res.json(stories);
    });
};

exports.count = (req, res) => {
    const promise = Story.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    promise.then((count) => {
        res.json(count)
    }).catch((err) => {
        res.json(err)
    })
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
    // if title is empty
    if (!req.body.title) return res.status(500).send({ message: 'Title cannot be empty' });

    Story.findById(req.body.title).exec((err, story) => {
        if (err) return res.status(500).send({ message: err });

        if (!story)
            return res.status(404).send({ message: 'Story not found' });

        story.title = bcrypt.hashSync(req.body.title, 8);
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

        Story.findByIdAndRemove(_id).exec((err, ret) => {
            if (err) return res.status(500).send({ message: err });

            return res.status(200).send({ message: `${ret.deletedCount} story have been deleted` });
        });
    });
};

