var express = require('express')
var fs = require('fs')
var https = require('https')
var path = require('path')
var router = express.Router();
var cors = require('cors')
let app = express()

app.use(cors())

var post = require('./post.js')

/*app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 }); */

const pug = require('pug');

app.use("/js", express.static(__dirname + "/js"));
app.use("/node_modules", express.static(__dirname + "/js"));
app.use("/static", express.static(__dirname + "/static"));

app.set("view engine", "pug");

//app.set("views", path.join(__dirname, "views"));


//app.use(express.static((__dirname, 'public')));

/*app.get('/', function (req, res) {
  res.render("index.html", {title: "Home"});
})
*/

app.get('/', function (req, res) {
  res.render('homepage', {title: 'Homepage'});
});

router.get("/", (req, res) => {
  res.render("homepage");
});

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(8080, function () {
  console.log('App listening on port 8080! Go to https://localhost:8080/')
})
