const express = require('express');
const passport = require('passport');
const Contact = require('../models/contactModel');
const json2csv = require('json2csv').parse;
const { Transform } = require('json2csv');
const { Parser } = require('json2csv');

const requireToken = passport.authenticate('bearer', { session: false });
const router = express.Router();

router.get('/contacts-csv-download', requireToken, async (req, res, next) => {
  try {
    // Fetch contacts from the database
    const contacts = await Contact.find();

    // Define CSV fields
    const fields = [
      'firstname',
      'lastname',
      'email',
      'cell_phone',
      'chimneys',
      'roofType',
      'chimneyType',
      'homeType',
      'address',
      'unit',
      'city',
      'zip',
      'notes'
    ];

    // Convert contacts to CSV format
    const parser = new Parser({ fields });
    const csv = parser.parse(contacts);

    // Set response headers for CSV
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="contact-data.csv"');

    // Send CSV data as response
    res.status(200).send(csv);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error generating CSV file');
  }
});


module.exports = router;