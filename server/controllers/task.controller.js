var bcrypt = require('bcryptjs');

const db = require('../models');
const Task = db.task;
const Story = db.story;
const User = db.user;

exports.task = (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).populate('contributors').exec((err, task) => {
        if (err) return res.status(500).send({ message: err });

        if (!task)
            return res.status(404).send({ message: 'Task not found' });

        res.json(task);
    });
};

exports.tasks = (req, res) => {
    Task.find().populate('contributors').exec((err, tasks) => {
        if (err) return res.status(500).send({ message: err });

        res.json(tasks);
    });
};

exports.create = (req, res) => {
    if (!req.body.title) return res.status(500).send({ message: 'Title cannot be empty' });
    if (!req.body.content) return res.status(500).send({ message: 'Content cannot be empty' });
    if (!req.body.story) return res.status(500).send({ message: 'Story cannot be empty' });

    User.findById(req.userId).exec((err, user) => {
        if (err) return res.status(500).send({ message: err });

        if (!user)
            return res.status(404).send({ message: 'User not found' });

        Story.findById(req.body.story).exec((err, story) => {
            if (err) return res.status(500).send({ message: err });

            if (!story)
                return res.status(404).send({ message: 'Story not found' });
            
            const task = new Task({
                title: req.body.title,
                content: req.body.content,
                contributors: [user._id],
                status: req.body.status || 1,
                story: story._id,
            });
    
            task.save((err, task) => {
                if (err) return res.status(500).send({ message: err });
    
                res.json(task);
            });

            story.tasks.push(task._id)

            story.save((err, task) => {
                if (err) return res.status(500).send({ message: err });
            });
        });
    });
};

exports.edit = (req, res) => {
    // if title is empty
    if (!req.body.title) return res.status(500).send({ message: 'Title cannot be empty' });
    if (!req.body.content) return res.status(500).send({ message: 'Content cannot be empty' });
    if (!req.body.storyId) return res.status(500).send({ message: 'Story cannot be empty' });

    Task.findById(req.body.title).exec((err, task) => {
        if (err) return res.status(500).send({ message: err });

        if (!task)
            return res.status(404).send({ message: 'Task not found' });

        task.title = req.body.title;
        task.content = req.body.content;
        task.storyId = req.body.storyId;
        task.updatedAt = Date.now();

        task.save((err) => {
            if (err) return res.status(500).send({ message: err });

            res.status(200).send({ message: 'Title have been changed' });
        });
    });
};

exports.delete = (req, res) => {
    const _id = req.params.id;

    Task.findById(_id).exec((err, task) => {
        if (err) return res.status(500).send({ message: err });

        if (!task)
            return res.status(404).send({ message: 'Task not found' });

        if (!task.contributors.includes(req.userId))
            return res.status(500).send({ message: 'Only contributors can delete the task' });

        // TODO: delete task id from story
        
        Task.findByIdAndRemove(_id).exec((err, ret) => {
            if (err) return res.status(500).send({ message: err });

            return res.status(200).send({ message: `${ret.deletedCount} task have been deleted` });
        });
    });
};

