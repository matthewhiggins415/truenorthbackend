const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
  firstname: {
    type: String, 
    required: true
  },
  lastname: {
    type: String,
    required: true 
  }, 
  email: {
    type: String, 
    required: true,
    unique: true
  },
  cell_phone: {
    type: String
  },
  chimneys: {
    type: Number
  },
  roofType: {
    type: String
  },
  homeType: {
    type: String
  },
  chimneyType: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  zip: {
    type: String
  },
  notes: {
    type: String, 
    required: false
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Contact', contactSchema)