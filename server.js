const express = require('express');
const router = require('./src/routes/index');
const path = require('path');

const app = express();

app.use('/', router);
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

