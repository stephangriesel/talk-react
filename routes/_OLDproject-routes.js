const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();
const Project = require('../models/project-model');
const Task = require('../models/task-model');

// CREATE A NEW PROJECT
router.post('/projects', (req, res, next)=>{
  Project.create({ //creates new project collection in db
    title: req.body.title,
    description: req.body.description,
    tasks: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    })
});

// GET THE PROJECTS
router.get('/projects', (req, res, next) => { // get projects collection
  Project.find().populate('tasks') // find all the projects, remember that is what () is for, queries 101, populate tasks collection
    .then(allTheProjects => { // we get a promise from our db
      res.json(allTheProjects); // we retrieve it as json object
    })
    .catch(err => { // deals with the errors
      res.json(err);
    })
});

// GET ROUTE TO DETAILED VIEW 
router.get('/projects/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Project.findById(req.params.id).populate('tasks') // get specifified project by id
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route, UPDATE OBJECT
router.put('/api/projects/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndUpdate(req.params.id, req.body) // update the project
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE ITEM
router.delete('/projects/:id', (req, res, next)=>{
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Project.findByIdAndRemove(req.params.id) // remove the project
    .then(() => {
      res.json({ message: `Project with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})


module.exports = router; // export this route, the route required in app.js