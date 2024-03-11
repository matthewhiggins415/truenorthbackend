const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    companyImage: {
      type: String,
      default: 'image'
    },
    companyName: {
      type: String,
      default: 'company name'
    },
    companyPhone: {
      type: String,
      default: 'company phone number'
    },
    companyEmail: {
      type: String,
      default: 'company email' 
    },
    companyWebsite: {
      type: String,
      default: 'company website' 
    },
    companyAddress: {
      type: String,
      default: 'company street address' 
    },
    companyCity: {
      type: String,
      default: 'company city' 
    },
    companyZip: {
      type: String,
      default: 'company zip code' 
    },
    companyYelp: {
      type: String,
      default: 'company yelp' 
    },
    companyInstagram: {
      type: String,
      default: 'company instagram' 
    },
    companyFacebook: {
      type: String,
      default: 'company facebook' 
    },
    companyTwitter: {
      type: String,
      default: 'company twitter' 
    },
    companyTikTok: {
      type: String,
      default: 'company tik tok' 
    }
  }, {
    timestamps: true,
})

module.exports = mongoose.model('Company', companySchema)