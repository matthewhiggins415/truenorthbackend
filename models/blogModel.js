const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  img: {
    type: String
  },
  title: {
    type: String
  },
  metaDescription: {
    type: String
  }, 
  metaKeywords: {
    type: String
  },
  date: {
    type: String
  },
  author: {
    type: String
  },
  isPublished: {
    type: Boolean, 
    default: false
  },
  sectionOneHeader: {
    type: String
  },
  sectionOneContent: {
    type: String
  },
  sectionTwoHeader: {
    type: String
  },
  sectionTwoContent: {
    type: String
  },
  sectionThreeHeader: {
    type: String
  },
  sectionThreeContent: {
    type: String
  },
  sectionFourHeader: {
    type: String
  },
  sectionFourContent: {
    type: String
  },
  sectionFiveHeader: {
    type: String
  },
  sectionFiveContent: {
    type: String
  },
  conclusionHeader: {
    type: String
  },
  conclusionContent: {
    type: String
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Blog', blogSchema)