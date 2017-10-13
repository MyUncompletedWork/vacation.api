// require express and other modules
var express = require('express'),
    app = express();


// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Library to all details of my app"},
      {method: "GET", path: "/api/profile", description: "Basic Profile About Me"},
      {method: "GET", path: "/api/vacation", description: "Places that I would like to visit"} ,// CHANGE ME
      {method: "POST", path: "/api/vacation", description: "Updating new places that I would like to vist"},
      {method: "DELETE", path: "/api/vacation/:id", description: "Updating new places that I would like to vist"}
    ]
  })
});

app.get('/api/profile', function profile(req, res){
  //TODO: Hardcode my personal profile under here:
  res.json({
    name: 'PengFei Ye',
    githubLink: 'https://github.com/pengfeiye',
    githubProfileImage: 'https://avatars2.githubusercontent.com/u/27906150?v=4&s=400&u=292e40b02e259353bfa0082b0bd708eae4d6e47a',
    personalSiteLink: 'https://pengfeiye.github.io/',
    currentCity: 'San Francisco'
  })
})



//get all my hardcoded vacation spots

app.get('/api/vacation', function (req, res){
  db.Vacation.find(function (err, vacaSpots){
    res.json(vacaSpots)
  })
})

app.delete('/api/vacation/:id', function(req, res){
  db.Vacation.findOneAndRemove({_id:req.params.id}, function(err, deleted){
    if(err){console.log("server 87"+ err)}
    res.json(deleted)
  })
})

//add new visiting locations

app.post('/api/vacation', function (req, res){
  var newVacation = new db.Vacation({
    country: req.body.country,
    city: req.body.city,
    cost: req.body.cost,
    image: req.body.image,
  })

  newVacation.save(function(err, yay){
    if(err){return console.log(err)};
    res.json(yay)
  })
})
/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
