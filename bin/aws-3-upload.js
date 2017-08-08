'use strict'

// requring function to upload files to AWS and storing in MongoDB
const AWSUpload = require('../lib/s3-uploads')
// requring wiring for mongoose #mystery
const mongoose = require('app/middleware/mongoose')

const file = process.argv[2]
const name = process.argv[3]

AWSUpload({ file, name })
  .then(console.log)
  .catch(console.error)
  .then(() => mongoose.connection.close())
  // this file is for testing in the command line #fun
