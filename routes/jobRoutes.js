const express = require('express');
const Job = require('../models/jobModel');
const passport = require('passport');

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

// create job
router.post('/create-job', requireToken, async (req, res, next) => {
  const { job } = req.body

  try {
    const newJob = await Job.create(job)
    res.status(201).json({ newJob })
  } catch(error) {
    console.log(error)
  }
})

// read all jobs of contact
router.get('/get-jobs/:id', requireToken, async (req, res, next) => {
  const { id } = req.params;
  console.log("id: ", id);
  
  try {
    const jobs = await Job.find({ contact_id: id }).exec();
    res.json({ jobs });
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve jobs' });
  }
});

// read single job of contact

// update single job

// delete job

module.exports = router;