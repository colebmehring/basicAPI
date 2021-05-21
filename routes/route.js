const express = require('express');
const app = express();
const routes = express.Router();
const DataSchema = require('../models/model');

//Add or update data in DB
routes.route('/').post((req, res) => {
  console.log(req.body);
  DataSchema.findOneAndUpdate({
    name: req.body.name
  }, {
    $set: req.body
  }, {
    upsert: true
  }, (err) => {
    if(err){
      return res.status(500).json('could not post :(');
    }else{
      return res.status(200).json('successful post :)');
    }
  })
});

//Get data in DB by name
routes.route('/:name').get((req, res) => {
  DataSchema.findOne({
    name: req.params.name    
  }, (err, data) => {
    if(err){
      return res.status(404).json('could not update. perhaps name doesn\'t exist in the DB');
    }else{
      return res.status(200).json({
        'name': data.name,
        'age': data.age
      });
    }
  });
});

module.exports = routes;