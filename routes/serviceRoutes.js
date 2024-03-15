const express = require('express');
const Service = require('../models/serviceModel');
const passport = require('passport');

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

// create new service
router.post('/service', requireToken, async (req, res, next) => {
  console.log(req.body)
    
  try {
    const newService = await Service.create(req.body.service)
    res.status(201).json({ service: newService })
  } catch(e) {
    res.status(500).json({ msg: 'Error creating blog'})
  }
});

// get all services
router.get('/services', async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json({ services: services })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

// get a single service
router.get('/service/:id', async (req, res, next) => {
  const id = req.params.id
  try {
    const service = await Service.findById(id);
    res.status(200).json({ service: service });
  } catch(err) {
    console.log(err);
    res.json({ msg: 'something went wrong'});
  }   
})
  
// update service
router.put('/updateservice/:id', requireToken, async (req, res, next) => {
  let serviceID = req.params.id;
  let updateService = req.body.service;
    
  try {
    let service = await Service.findById(serviceID);
  
    if (updateService.img) {
      service.img = updateService.img;
    }
          
    if (updateService.name) {
      service.name = updateService.name;
    }
          
    if (updateService.title) {
      service.title = updateService.title;
    }
          
    if (updateService.paragraphOne) {
      service.paragraphOne = updateService.paragraphOne;
    }

    if (updateService.paragraphTwo) {
      service.paragraphTwo = updateService.paragraphTwo;
    }
            
    if (updateService.paragraphThree) {
      service.paragraphThree = updateService.paragraphThree;
    }

    if (updateService.paragraphFour) {
      service.paragraphFour = updateService.paragraphFour;
    }
            
    if (updateService.paragraphFive) {
      service.paragraphFive = updateService.paragraphFive;
    }
        
    let newService = await service.save();
            
    res.json({ newService: newService });
  } catch(error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
})

// update a service's image 
router.put('/update-service-image/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    let service = await Service.findById(id);

    let newImg = req.body.image;

    if (newImg) {
      service.img = newImg;
    }
    
    let updatedService = await service.save();

    res.json({ updatedService: updatedService });
  } catch(e) {
    console.log(e)
    res.json({ msg: 'something went wrong'})
  }
})

// delete service
router.delete('/service/:id', requireToken, async (req, res, next) => {
  const id = req.params.id;
  try {
    let service = await Service.findByIdAndDelete(id);
    res.status(204).json({ msg: 'service deleted' })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

module.exports = router;