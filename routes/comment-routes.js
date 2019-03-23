const express = require('express');
const mongoose = require('mongoose');
const Comment = require('../models/comment-model');
const Topic = require('../models/topic-model');
const router  = express.Router();

// GET route => to retrieve a specific comment
router.get('/topics/:topicId/comments/:commentId', (req, res, next) => {
  Comment.findById(req.params.commentId)
  .then(theComment =>{
      res.json(theComment);
  })
  .catch( err =>{
      res.json(err);
  })
});

// POST route => to create a new comment
router.post('/comments', (req, res, next)=>{
  
  Comment.create({
      title: req.body.title,
      description: req.body.description,  
      topic: req.body.topicID
  })
    .then(response => {
        Topic.findByIdAndUpdate(req.body.topicID, { $push:{ comments: response._id } })
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
      })
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific comment
router.put('/comments/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Comment with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific comment
router.delete('/comments/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Comment.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Comment with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;