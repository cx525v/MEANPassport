const express= require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();
const port = 3000;

const users = require('./routes/users');
/*
  https://www.npmjs.com/package/cors

  if not app.use(cors), then :
  app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Orgin, X-Request-Width, Content-Type, Accept");
  });

  for single route
  app.get('/something', cors(), function(req, res, next) {

  })

  const corsOptions = {
     origin: 'http://xxx',
     optionsSuccessStatus: 200
  };

  app.get('/ccc', cors(corsOptions), function(req, res, next) {
       res.json({msg: 'cors enabled'});
  });

  whitelist
  const whitelist =['http://xxx', 'http://yyy'];
  const corsOptions = {
      origin: function(origin, callback) {
          const originIsWhitelisted = whitelist.indexOf(orgin) !==1;
          callback(originIsWhitelisted ? null: 'Bad Request', originIsWhitelisted);
      };
  };
  app.get('/xxx', cors(corsOptions), function(req, res, next) {
      res.json({msg: 'in white list'})
  })
*/
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);

app.get('/', (req, res)=>{
    res.send('hello');
})
app.listen(port , () => {
  console.log("server started on port: " + port);
});
