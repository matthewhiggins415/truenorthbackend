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
  
  try {
    const jobs = await Job.find({ contact_id: id }).exec();
    res.json({ jobs });
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve jobs' });
  }
});

// read single job of contact
router.get('/get-job/:id', requireToken, async (req, res, next) => {
  const { id } = req.params;
    
  try {
    const job = await Job.findById(id)
    res.json({ job });
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve jobs' });
  }
});

// update single job
router.put('/update-job/:id', requireToken, async (req, res, next) => {
  const jobID = req.params.id;
  const updatedJob = req.body.job;

  console.log(updatedJob)
  console.log(jobID)
  
  try {
    let job = await Job.findById(jobID);
  
    // Update contact fields if they exist in the updatedContact object
    Object.keys(updatedJob).forEach(key => {
      if (updatedJob[key]) {
        job[key] = updatedJob[key];
      }
    });
  
    const newJob = await job.save();
      
    res.status(201).json({ newJob });
  } catch(error) {
    res.status(500).json({ msg: 'Something went wrong' });
  }
});

// delete job
router.delete('/jobs/:id', requireToken, async (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  try {
    let job = await Job.findByIdAndDelete(id);
    res.status(204).json({ msg: 'job deleted' })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

module.exports = router;