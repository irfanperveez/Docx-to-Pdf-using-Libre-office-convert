const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const { promisify } = require('util');
const libre = require('libreoffice-convert');

let lib_convert = promisify(libre.convert);

async function convert(name) {
  try {
    let arr = name.split('.');    
    const enterPath = path.join(__dirname, `../../uploads/${name}`);
    const convertedfile = arr[0] + '.pdf';
    const outputPath = path.join(__dirname, '../../converted', convertedfile); // Update output file path
    // Read file
    let data = await fs.readFile(enterPath);
    
    let done = await lib_convert(data, '.pdf', undefined);
    await fs.writeFile(outputPath, done);
    return { success: true, fileName: convertedfile };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

   
  const homepage = (req,res) =>{
    res.sendFile(path.join(__dirname, '../../client/public/index.html'));
    
  };



const fileupload = (req,res) =>{

  // Path to the uploaded file
  const filePath = req.file.path;

  // Call convert function to convert DOCX to PDF
  convert(req.file.filename)
    .then((result) => {
      if (result.success) {
        const downloadPath = path.join(__dirname, '../../converted' , result.fileName); // Update download file path
        res.download(downloadPath, result.fileName, (err) => { // Set file name as 'output.pdf'
          if (err) {
            console.log('Error downloading file:', err);
            res.status(500).send('Error downloading file');
          } else {
            // Cleanup the converted PDF file
            // fs.unlink(downloadPath);
          }
        });
      } else {
        res.status(500).send('Error converting file');
      }
    })
    .catch((error) => {
      console.log('An error occurred:', error);
      res.status(500).send('Error converting file');
    });
};


module.exports = {homepage, fileupload};

