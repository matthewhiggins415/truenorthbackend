const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serviceSchema = new Schema({
    img: {
      type: String
    },
    name: {
      type: String
    },
    title: {
      type: String
    },
    paragraphOne: {
      type: String 
    },
    paragraphTwo: {
      type: String 
    },
    paragraphThree: {
      type: String 
    },
    paragraphFour: {
      type: String 
    },
    paragraphFive: {
      type: String 
    }
  }, {
    timestamps: true,
})

module.exports = mongoose.model('Service', serviceSchema)