var path = require('path');
var express = require('express');
var app = express();
var md5 = require('md5');

var routes = require('./routes/index');
var user = require('./routes/userRoutes');
var promotion = require('./routes/promotionRoutes');
var company = require('./routes/companyRoutes');
var participation = require('./routes/participationRoutes');
var stats = require('./routes/statsRoutes');
var winner = require('./routes/winnerRoutes');
var notification = require('./routes/notificationRoutes');

var mongoose = require('mongoose');
//mongoose.connect('mongodb://178.62.114.122:27017/whatspromo');
mongoose.connect('mongodb://whatspromo:hip0p0tam0mongo@whatspromo-shard-00-00-39w6t.mongodb.net:27017,whatspromo-shard-00-01-39w6t.mongodb.net:27017,whatspromo-shard-00-02-39w6t.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=whatspromo-shard-0&authSource=admin');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());


var cors = require('cors');
var whitelist = ['localhost:3001', 'localhost:3002']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS. Origin: ' + origin))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
//CORS enable
//app.use(cors(corsOptions));
app.use(cors());

//app.use('/', routes);
app.use('/user', user);
app.use('/promotion', promotion);
app.use('/company', company);
app.use('/participation', participation);
app.use('/winner', winner);
app.use('/stats', stats);
app.use('/notification', notification);



app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public')));



var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var headers = req.headers;
  console.log(headers);

  var cookies = req.cookies;
  console.log(cookies);

	var secretKey = "secret-key";
	var membership = headers.membership;
	var whatspromoToken = headers.whatspromotoken;


  if (!membership || !secretKey || !whatspromoToken ) {
    return unauthorized(res);
  };

  if (md5(membership+secretKey) == whatspromoToken) {
    return next();
  } else {
    return unauthorized(res);
  };
};

app.use('/auth/user', auth, user);
app.use('/auth/promotion',auth, promotion);
app.use('/auth/participation', auth, participation);
app.use('/auth/stats', auth, stats);



app.listen(process.env.PORT || 3000, function () {
  console.log('WhatsPromo API listening on port '+(process.env.PORT || 3000)+'!');

  console.log(",--.   ,--.,--.               ,--.         ,------.                                 ");
  console.log("|  |   |  ||  ,---.  ,--,--.,-'  '-. ,---. |  .--. ',--.--. ,---. ,--,--,--. ,---.  ");
  console.log("|  |.'.|  ||  .-.  |' ,-.  |'-.  .-'(  .-' |  '--' ||  .--'| .-. ||        || .-. | ");
  console.log("|   ,'.   ||  | |  |\\ '-'  |  |  |  .-'  `)|  | --' |  |   ' '-' '|  |  |  |' '-' ' ");
  console.log("'--'   '--'`--' `--' `--`--'  `--'  `----' `--'     `--'    `---' `--`--`--' `---'  ");
});


