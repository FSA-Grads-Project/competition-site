const connection = require('./db');
const express = require('express');
const path = require('path');
const app = express();

// set spacing for displaying json
app.set('json spaces', 2);

app.use(express.json());
app.use(express.static('public'));

// require routes
app.use('/api', require('./api'));

app.get('/', (req, res) => {
  const html = path.join(__dirname, 'index.html');
  res.sendFile(html);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
