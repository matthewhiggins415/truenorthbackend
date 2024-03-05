const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitorSchema = new Schema({
    ip: {
      type: String, 
      unique: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    origin: {
      type: String 
    },
    openedForm: {
      type: Boolean,
      default: false
    },
    completedForm: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true,
})

module.exports = mongoose.model('Visitor', visitorSchema)