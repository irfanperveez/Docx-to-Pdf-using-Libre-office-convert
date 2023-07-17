
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null, 'uploads')
  },
  filename: function(req,file,cb){
      cb(null, file.originalname);
  }    });


  const upload = multer({storage: storage});
  const uploadmiddleware = (req, res, next) => {
    upload.single('file')(req, res, function (err) {
      if (err) {
        // Handle the error appropriately
        return res.status(400).send('File upload failed.');
      }
      next();
    })};

  module.exports = {uploadmiddleware};




