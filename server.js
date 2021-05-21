const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const mongoDb = require('./db/db');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const PORT = 8080;
const routes = require('./routes/route');

app.use('/sparkpost', routes);
app.use(express.json());
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDb Database Connected');
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});

app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.use(express.static(path.join(__dirname,'dist')));