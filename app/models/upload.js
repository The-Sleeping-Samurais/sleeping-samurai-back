'use strict'

const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      _owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
    url: {
      type: String,
      required: true
      }
    }, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret, options) {
        const userId = (options.user && options.user._id) || false
        ret.editable = userId && userId.equals(doc._owner)
        return ret
      }
    }
  })

//This will define virtuals
  // uploadSchema.virtual('length').get(function length () {
  //   return this.text.length
  // })

// constructor function for creating uploads
// uses uploadSchema as its schema
const Upload = mongoose.model('Upload', uploadSchema)


module.exports = Upload
