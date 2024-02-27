const express = require('express');
const Blog = require('../models/blogModel');
const passport = require('passport');

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

// create new blog
router.post('/blog', requireToken, async (req, res, next) => {
  console.log(req.body)
  
  try {
    let newBlog = await Blog.create(req.body.blog)
    res.status(201).json({ blog: newBlog })
  } catch(e) {
    res.status(500).json({ msg: 'Error creating blog'})
  }
});

// get all blogs
router.get('/blogs', requireToken, async (req, res, next) => {
  try {
    let blogs = await Blog.find();
    res.json({ blogs: blogs })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

// get a blog
router.get('/blog/:id', requireToken, async (req, res, next) => {
  const id = req.params.id
  try {
    const blog = await Blog.findById(id);
    res.status(200).json({ blog: blog });
  } catch(err) {
    console.log(err);
    res.json({ msg: 'something went wrong'});
  }   
})

// update a blog
router.put('/updateblog/:id', requireToken, async (req, res, next) => {
  let blogID = req.params.id;
  let updateBlog = req.body.blog;
  
  try {
    let blog = await Blog.findById(blogID);
        
    if (updateBlog.title) {
      blog.title = updateBlog.title;
    }
        
    if (updateBlog.metaDescription) {
      blog.metaDescription = updateBlog.metaDescription;
    }
        
    if (updateBlog.metaKeywords) {
      blog.metaKeywords = updateBlog.metaKeywords;
    }
        
    if (updateBlog.date) {
      blog.date = updateBlog.date
    }
        
    if (updateBlog.sectionOneHeader) {
      blog.sectionOneHeader = updateBlog.sectionOneHeader;
    }
        
    if (updateBlog.sectionOneContent) {
      blog.sectionOneContent = updateBlog.sectionOneContent;
    }
  
    if (updateBlog.sectionTwoHeader) {
      blog.sectionTwoHeader = updateBlog.sectionTwoHeader;
    }
          
    if (updateBlog.sectionTwoContent) {
      blog.sectionTwoContent = updateBlog.sectionTwoContent;
    }
      
    if (updateBlog.sectionThreeHeader) {
      blog.sectionThreeHeader = updateBlog.sectionThreeHeader;
    }
  
    if (updateBlog.sectionThreeContent) {
      blog.sectionThreeContent = updateBlog.sectionThreeContent;
    }
      
    if (updateBlog.sectionFourHeader) {
      blog.sectionFourHeader = updateBlog.sectionFourHeader;
    }
        
    if (updateBlog.sectionFourContent) {
      blog.sectionFourContent = updateBlog.sectionFourContent;
    }

    if (updateBlog.sectionFiveHeader) {
      blog.sectionFiveHeader = updateBlog.sectionFiveHeader;
    }

    if (updateBlog.sectionFiveContent) {
      blog.sectionFiveContent = updateBlog.sectionFiveContent;
    }

    if (updateBlog.conclusionHeader) {
      blog.conclusionHeader = updateBlog.conclusionHeader;
    }

    if (updateBlog.conclusionContent) {
      blog.conclusionContent = updateBlog.conclusionContent;
    }
      
    let newBlog = await blog.save();
          
    res.json({ newBlog: newBlog });
  } catch(error) {
    res.status(500).json({ msg: 'something went wrong' });
  }
})

// publish a blog
router.put('/blog/publish/:id', requireToken, async (req, res, next) => {
  const id = req.params.id;

  try {
    let blog = await Blog.findById(id);
    blog.isPublished = true;
    let updatedBlog = await blog.save();

    res.json({ updatedBlog: updatedBlog })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

// unpublish a blog
router.put('/blog/unpublish/:id', requireToken, async (req, res, next) => {
  const id = req.params.id;

  try {
    const blog = await Blog.findById(id);
    blog.isPublished = false;
    let updatedBlog = await blog.save();

    res.json({ updatedBlog: updatedBlog })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})

// delete a blog
router.delete('/blog/:id', requireToken, async (req, res, next) => {
    const id = req.params.id;
    try {
      let blog = await Blog.findByIdAndDelete(id);
      res.status(204).json({ msg: 'blog deleted' })
    } catch(e) {
      res.json({ msg: 'something went wrong'})
    }
})
  

module.exports = router;