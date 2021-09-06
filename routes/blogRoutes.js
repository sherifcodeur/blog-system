

const express = require('express');
// const Blog = require('../models/blog');
const router = express.Router();

const blogController = require('../controllers/blogController');



router.get('/',blogController.indexBlogs);
  
  
  router.post('/',blogController.createBlogs);


  router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

  router.get('/:id',blogController.detailBlogs);
  
  router.delete('/:id',blogController.deleteBlogs);
  

module.exports = router;