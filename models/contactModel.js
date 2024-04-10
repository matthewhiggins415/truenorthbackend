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
  systemType: {
    type: String
  },
  modelNumber: {
    type: String
  },
  serialNumber: {
    type: String
  },
  fuelType: {
    type: String
  },
  systemSize: {
    type: String
  },
  address: {
    type: String
  },
  unit: {
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