const express = require('express');
const route = express.Router();
const files = require('../controllers/files');
const middleware = require('../middlewares/middleware');




route.get('/', files.homepage);
  
route.post('/upload', middleware.uploadmiddleware, files.fileupload);




  module.exports = route;
  