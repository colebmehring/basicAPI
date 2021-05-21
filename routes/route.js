const express = require('express');
const app = express();
const routes = express.Router();
const DataSchema = require('../models/model');

//Add or update data in DB
routes.route('/').post((req, res) => {
  DataSchema.findOneAndUpdate({
    name: req.body.name
  }, {
    $set: { 
      age: req.body.age
    }
  }, {
    upsert: true,
    runValidators: true
  }, (err) => {
    if(err){
      return res.status(500).send('BAD_DATA');
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
    //return NOT_FOUND error if there are any issues with the data
    if(err || !data){
      return res.status(404).json('NOT_FOUND');
    }else{
    //if data is good, return it!
      return res.status(200).json({
        'name': data.name,
        'age': data.age
      });
    }
  });
});

module.exports = routes;