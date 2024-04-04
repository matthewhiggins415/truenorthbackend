const express = require('express');
const Image = require('../models/imageModel');
const passport = require('passport');
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router();

// create image
router.post('/create-image', requireToken, async (req, res, next) => {
  const {image} = req.body;
  
  try {
    await Image.create(image);
    res.status(201).json({ msg: 'image created' });
  } catch(error) {
    res.status(500).json({ msg: 'Error creating image' });
  }
})
  
// get single image
router.get('/images/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    let image = await Image.findById(id);
    res.status(200).json({ image });
  } catch(error) {
    res.status(500).json({ msg: 'Error creating image' });
  }
})

// get all images 
router.get('/images', async (req, res, next) => {
  try {
    let images = await Image.find({});
    res.status(200).json({ images });
  } catch(error) {
    res.status(500).json({ msg: 'Error creating image' });
  }
})

// destroy an image 
router.delete('/images/:id', requireToken, async (req, res, next) => {
  const { id } = req.params;
  
  try {
    await Image.findByIdAndDelete(id);
    res.status(204).json({ msg: 'image deleted' });
  } catch(error) {
    res.status(500).json({ msg: 'Error creating image' });
  }
})

module.exports = router;