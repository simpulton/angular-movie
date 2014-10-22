var express = require('express'),
  app = express();

app.use(express.static(__dirname + '/../src'));

var server = app.listen(process.env.PORT || '3000', function() {
  console.log('Listening on port %d', server.address().port);
});