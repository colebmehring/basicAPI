const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const mongoDb = require('./db/db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;
const routes = require('./routes/route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/sparkpost', routes);
app.use(express.json());
app.use(cors());

mongoose.set('runValidators', true);

//handle error
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  err.statusCode? err.statusCode : 500;
  res.status(err.statusCode).send(err.message);
});

//connect DB
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDb Database Connected');
});

//start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});

app.use(express.static(path.join(__dirname,'dist')));