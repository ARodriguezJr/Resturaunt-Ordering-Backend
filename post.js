const querystring = require('querystring');
const https = require('https');

var postData = querystring.stringify({
    'msg' : 'Hello World!'
});

var options = {
  hostname: 'google.com',
  port: 443,
  path: '/',
  method: 'POST',
  headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Content-Length': postData.length
     }
};

var req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

//req.on('error', (e) => {
  //onsole.error(e);
//});

//req.write(postData);
//req.end();