'use strict'

const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // location of the hosted file
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

// constructor function for creating uploads
// uses uploadSchema as its schema
const Upload = mongoose.model('Upload', uploadSchema)

module.exports = Upload
