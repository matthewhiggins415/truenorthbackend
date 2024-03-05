const express = require('express');
const Visitor = require('../models/visitorModel');
const { startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths, startOfYear } = require('date-fns');

const router = express.Router();

// create a visitor 
router.post('/visitor', async (req, res, next) => {
  const ip = req.socket.remoteAddress;
  const today = new Date().toISOString().slice(0, 10);

  try {
    const response = await Visitor.create({ ip, date: today })
    console.log(response)
    res.status(201).json({ msg: 'Visitor created' })
  } catch(error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// get visitors for the day 
router.get('/visitors/today', async (req, res, next) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const visitors = await Visitor.find({ date: today });
    res.json(visitors.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get visitors for the week
router.get('/visitors/this-week', async (req, res, next) => {
  try {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Assuming Monday is the start of the week
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
    const visitors = await Visitor.find({ date: { $gte: startDate, $lte: endDate } });
  
    res.json(visitors.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get visitors for the month
router.get('/visitors/this-month', async (req, res, next) => {
  try {
    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());
  
    const visitors = await Visitor.find({ date: { $gte: startDate, $lte: endDate } });
  
    res.json(visitors.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get visitors for the quarter
router.get('/visitors/past-three-months', async (req, res, next) => {
  try {
    // Calculate the start date of the earliest month within the past 3 months
    const startDate = startOfMonth(subMonths(new Date(), 2)); // Subtract 2 months to get the start of the earliest month
  
    // Calculate the end date of the current month
    const endDate = endOfMonth(new Date());
  
    // Find all visitors where the date falls within the past 3 months
    const visitors = await Visitor.find({ date: { $gte: startDate, $lte: endDate } });
  
    // Send the visitors array in the response
    res.json(visitors);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// get visitors for the year
router.get('/visitors/this-year', async (req, res, next) => {
  try {
    // Calculate the start date of the current year
    const startDate = startOfYear(new Date());
  
    // Calculate the end date of the current month
    const endDate = endOfMonth(new Date());
  
    // Find all visitors where the date falls within the current year
    const visitors = await Visitor.find({ date: { $gte: startDate, $lte: endDate } });
  
    // Send the visitors array in the response
    res.json(visitors);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// visitors who opened form for the month

// update visitor when opens form

// update visitor when closes form 

// update visitor when submits form

// visitors who completed form for the month

// visitor drop off from form for the month

module.exports = router;