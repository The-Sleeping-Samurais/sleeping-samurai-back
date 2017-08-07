'use strict'

// requiring the wiring for the controller
const controller = require('lib/wiring/controller')
// requiring the models to build/upload object
const models = require('app/models')

// choosing the upload schema
const Upload = models.upload
// requiring multer, which will help turn images and files into strings
const multer = require('multer')

// the function that turns image into string
const multerUpload = multer({dest: 'tmp/'})

// requiring the AWS module that we built that uploads files to AWS
const AWSUpload = require('lib/s3-uploads.js')

// requires token for authentication
const authenticate = require('./concerns/authenticate')

// setting the current user to authenticate
const setUser = require('./concerns/set-current-user')

// pulls in mongoose
const setModel = require('./concerns/set-mongoose-model')

// function to find all uploads
const index = (req, res, next) => {
  Upload.find()
    .then(uploads => res.json({
      uploads: uploads.map((e) =>
      // turn each upload object into JSON, with virtuals and owner
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const useruploads = (req, res, next) => {
  // this will find by _owner
  Upload.find({_owner: req.user._id})
    .then(uploads => res.json({
      uploads: uploads.map((e) =>
      // turn each upload object into JSON, with virtuals and owner
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}
// function to show one upload
const show = (req, res) => {
  res.json({
    upload: req.upload.toJSON({ virtuals: true, user: req.user })
  })
}

// creates a new JSON object out of a file we uploaded to AWS
const create = (req, res, next) => {
//  the values that an upload MUST have
  const upload = {
    file: req.file.path,
    name: req.body.image.title
  }
  // calling the AWSUpload function to upload file... also stores in MongoDB
  AWSUpload(upload, req)
    .then(upload =>
      res.status(201)
      // sends response data of the upload back
        .json({
          // adds vituals for user
          upload: upload.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

// Updates JSON object
const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.upload.update(req.body.upload)
    .then(() => res.sendStatus(204))
    .catch(next)
}

// Removes JSON object
const destroy = (req, res, next) => {
  req.upload.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
  useruploads
}, { before: [
  { method: multerUpload.single('image[file]'), only: ['create'] },
  // sets users/owner....adds useruploads route to setUser
  { method: setUser, only: ['index', 'show', 'useruploads'] },
  // authenticates token
  { method: authenticate, except: ['index', 'show', 'useruploads'] },
  { method: setModel(Upload), only: ['show'] },
  { method: setModel(Upload, { forUser: true }), only: ['update', 'destroy'] }
] })
