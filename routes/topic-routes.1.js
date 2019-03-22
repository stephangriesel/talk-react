const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Topic = require('../models/topic-model');
const Comment = require('../models/comment-model');

// CREATE A NEW TOPIC
router.post('/topics', (req, res, next)=>{
  Topic.create({ //creates new topic collection in db
    title: req.body.title,
    description: req.body.description,
    comments: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET THE TOPICS
router.get('/topics', (req, res, next) => { // get topics collection
  Topic.find().populate('comments') // find all the topics, remember that is what () is for, queries 101, populate comments collection
    .then(allTheTopics => { // we get a promise from our db
      res.json(allTheTopics); // we retrieve it as json object
    })
    .catch(err => { // deals with the errors
      res.json(err);
    })
});

// GET ROUTE TO DETAILED VIEW 
router.get('/topics/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Topic.findById(req.params.id).populate('comments') // get specifified topics by id
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route, UPDATE OBJECT
router.put('/api/topics/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Topic.findByIdAndUpdate(req.params.id, req.body) // update the topic
    .then(() => {
      res.json({ message: `Topic with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE ITEM
router.delete('/topics/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Topics.findByIdAndRemove(req.params.id) // remove the topic
    .then(() => {
      res.json({ message: `Topic with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})


module.exports = router; // export this route, the route required in app.js