const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
  contact_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Contact',
    required: true
  },
  dateJobReceived: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  invoiceLink: {
    type: String
  },
  dateJobCompleted: {
    type: String
  },
  paymentType: {
    type: String
  },
  amountDue: {
    type: Number
  },
  amountPaid: {
    type: Number
  },
  datePaidInFull: {
    type: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Job', jobSchema)