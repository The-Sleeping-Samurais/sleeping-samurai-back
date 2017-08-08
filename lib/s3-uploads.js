'use strict'
// uses dotenv to grab data from the env
require('dotenv').config()
// #mystery grabs mongoose wiring
require('app/middleware/mongoose')

// fs requires file reading module for node
const fs = require('fs')
// requires crypto to help generate random string for AWS naming
const crypto = require('crypto')
// requires path to help find the location of the file
const path = require('path')

// requires AWS module to interact with AWS
const AWS = require('aws-sdk')
// the way to use AWS model
const s3 = new AWS.S3()

// requring schema for uploading a file
const models = require('app/models')
const Upload = models.upload

// grabs the type of file
const mime = require('mime')

// generates random string of 16 characters for AWS name
const promisifyRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (error, buf) => {
      if (error) {
        reject(error)
      }
      resolve(buf.toString('hex'))
    })
  })
}

// uploads to AWS
const s3Upload = (params, request) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
      if (error) {
        reject(error)
      }
      resolve(data)
    })
  })
}

// AWS starts the whole process for uploading a file to AWS and mongoDB
const AWSUpload = (options, req) => {
  // checks the type of file
  // checks the extension of the file
  const ext = path.extname(options.ext)

  // gets the mimeType of the file from arguments passed in
  const mimeType = options.mimetype
  // grabs today's date for folder
  const today = new Date().toISOString().split('T')[0]
  // turns image into large string
  // option.file is the file
  const stream = fs.createReadStream(options.file)
  // params is the parameter for uploads to AWS
  const params = {
    ACL: 'public-read',
    Body: stream,
    Bucket: process.env['AWS_S3_BUCKET_NAME'],
    ContentType: mimeType
  }

  return promisifyRandomBytes()
  .then()
    .then((randomString) => {
      // sets name of the file in AWS
      params.Key = `${today}/${randomString}${ext}`
      return params
    })
    // uploads to AWS
    .then(s3Upload)
    // Stores in mongo
    .then((s3Response) => {
      const params = {
        name: options.name,
        url: s3Response.Location,
        // creates _owner param which is set to the request's user id
        _owner: req.user._id,
        tag: req.body.file.tag,
        description: req.body.file.description,
        size: options.size
      }
      return Upload.create(params)
    })
}

module.exports = AWSUpload
