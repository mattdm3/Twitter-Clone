const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 31415;

var app = express();

app.use(express.json());

app.use(require('./routes/profile'));
app.use(require('./routes/tweet'));
app.use(require('./routes/feed'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static( 'client/build' ));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); 
  } )

}

app.use('/assets', express.static(path.join(__dirname, 'assets')));



app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



const server = app.listen(PORT, function() {
  console.info('🌍 Listening on port ' + server.address().port);
});
