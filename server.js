var express = require('express')
var fs = require('fs')
var https = require('https')
var path = require('path')
var router = express.Router();
var cors = require('cors')
var url = require('url')
var bodyParser = require('body-parser')   // Maybe not needed
var querystring = require('querystring')  // Maybe not needed
let app = express()

app.use(cors())

//var post = require('./post.js')

/*app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 }); */



const pug = require('pug');

app.use("/js", express.static(__dirname + "/js"));
app.use("/node_modules", express.static(__dirname + "/js"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/orders", express.static(__dirname + "/orders"));

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({    
  extended: true
})); 

app.post('/incomingOrder', function(req, res) {
  var item = req.body.item;
  var quantity = req.body.quantity;
  var price = req.body.price;
  fs.appendFile("orders/adminorders.txt", item + " #" + quantity + " $" + price, (err) => {
    if(err) throw err;

    console.log("Order saved!");
  });

  res.send(item + ' ' + quantity + ' ' + price);
}); 

/*app.get('/incomingOrder', function(req, res) {
  var item = req.param('item');
  var quantity = req.param('quantity');

  res.send(item + ' ' + quantity);
}); */

// Function to handle the root path
/*app.get('/', (req, res) => {
  console.log(req.query)
}) */

/*app.use(function(request, response){
  var queryData = url.parse(request.url, true).query;
  response.writeHead(200, {"Content-Type": "text/plain"});

  if (queryData.name) {
    // user told us their name in the GET request, ex: http://host:8000/?name=Tom
    response.end('Hello ' + queryData.name + '\n');

  } else {
    response.end("Hello World\n");
  }
}); */

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
