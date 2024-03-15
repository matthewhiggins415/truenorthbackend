const express = require('express');
const Company = require('../models/companyModel');
const passport = require('passport');

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

// create company
router.post('/company', requireToken, async (req, res, next) => {    
  try {
    let newCompany = await Company.create(req.body.company)
    res.status(201).json({ company: newCompany })
  } catch(e) {
    res.status(500).json({ msg: 'Error creating company'})
  }
});

// get company
router.get('/company', async (req, res, next) => {
  try {
    let company = await Company.find();
    res.json({ company })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

// update company 
router.put('/update-company/:id', requireToken, async (req, res, next) => {
  let companyID = req.params.id;
  let updateCompany = req.body.company;
    
  try {
    let company = await Company.findById(companyID);
  
    if (updateCompany.companyImage) {
      company.companyImage = updateCompany.companyImage;
    }
          
    if (updateCompany.companyName) {
      company.companyName = updateCompany.companyName;
    }
          
    if (updateCompany.companyPhone) {
      company.companyPhone = updateCompany.companyPhone;
    }
          
    if (updateCompany.companyEmail) {
      company.companyEmail = updateCompany.companyEmail;
    }
          
    if (updateCompany.companyWebsite) {
      company.companyWebsite = updateCompany.companyWebsite
    }
          
    if (updateCompany.companyAddress) {
      company.companyAddress = updateCompany.companyAddress;
    }
          
    if (updateCompany.companyCity) {
      company.companyCity = updateCompany.companyCity;
    }
    
    if (updateCompany.companyZip) {
      company.companyZip = updateCompany.companyZip;
    }
            
    if (updateCompany.companyYelp) {
      company.companyYelp = updateCompany.companyYelp;
    }
        
    if (updateCompany.companyInstagram) {
      company.companyInstagram = updateCompany.companyInstagram;
    }
    
    if (updateCompany.companyFacebook) {
      company.companyFacebook = updateCompany.companyFacebook;
    }
        
    if (updateCompany.companyTwitter) {
      company.companyTwitter = updateCompany.companyTwitter;
    }
          
    if (updateCompany.companyTikTok) {
      company.companyTikTok = updateCompany.companyTikTok;
    }
        
    let newCompany = await company.save();
            
    res.json({ newCompany: newCompany });
  } catch(error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
})

// update a company's image 
router.put('/update-company-image/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    let company = await Company.findById(id);

    let newImg = req.body.image;

    if (newImg) {
      company.companyImage = newImg;
    }
    
    let updatedCompany = await company.save();

    res.json({ updatedCompany: updatedCompany });
  } catch(e) {
    console.log(e)
    res.json({ msg: 'something went wrong'})
  }
})

module.exports = router;