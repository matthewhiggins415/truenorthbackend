const express = require('express');
const Contact = require('../models/contactModel');
const passport = require('passport');

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

// create new contact
router.post('/contact', async (req, res, next) => {
  console.log(req.body)

  try {
    let newContact = await Contact.create(req.body)
    res.status(201).json({ contact: newContact })
  } catch(e) {
    res.status(500).json({ msg: 'Error creating contact'})
  }
});

// get all contacts
router.get('/contacts', requireToken, async (req, res, next) => {
  try {
    let contacts = await Contact.find();
    res.json({ contacts: contacts })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

// get a single contact
router.get('/contacts/:id', requireToken, async (req, res, next) => {
  const id = req.params.id;
  try {
    let contact = await Contact.findById(id);
    res.json({ contact: contact })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

// edit a Contact
router.put('/updatecontact/:id', requireToken, async (req, res, next) => {
  let contactID = req.params.id;
  let updatedContact = req.body.contact;

  try {
    let contact = await Contact.findById(contactID);
      
    if (updatedContact.firstname) {
      contact.firstname = updatedContact.firstname;
    }
      
    if (updatedContact.lastname) {
      contact.lastname = updatedContact.lastname;
    }
      
    if (updatedContact.email) {
      contact.email = updatedContact.email;
    }
      
    if (updatedContact.cell_phone) {
      contact.cell_phone = updatedContact.cell_phone
    }
      
    if (updatedContact.homeType) {
      contact.homeType = updatedContact.homeType;
    }
      
    if (updatedContact.roofType) {
      contact.roofType = updatedContact.roofType;
    }

    if (updatedContact.chimneyType) {
        contact.chimneyType = updatedContact.chimneyType;
    }
        
    if (updatedContact.chimneys) {
      contact.chimneys = updatedContact.chimneys;
    }
    
    if (updatedContact.address) {
      contact.address = updatedContact.address;
    }

    if (updatedContact.city) {
      contact.city = updatedContact.city;
    }
    
    if (updatedContact.zip) {
      contact.zip = updatedContact.zip;
    }
      
    if (updatedContact.notes) {
      contact.notes = updatedContact.notes;
    }
    
    let newContact = await contact.save();
        
    res.json({ newContact: newContact });
  } catch(error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
})

// delete a single contact
router.delete('/contacts/:id', requireToken, async (req, res, next) => {
  const id = req.params.id;
  try {
    let contact = await Contact.findByIdAndDelete(id);
    res.status(204).json({ msg: 'contact deleted' })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

module.exports = router;