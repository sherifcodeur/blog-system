

const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();



router.get('/',(req,res)=>{

    Blog.find()
    .then(result =>{
  
      res.render('index',{title:'all blogs',blogs:result});
  
    })
    .catch(err=>console.log(err));
  
    
  
  });
  
  
  router.post('/',(req,res)=>{
    
     const newBlog = new Blog(req.body);
     newBlog.save()
     .then(res.redirect('/blogs'))
     .catch(err=>{
  
      console.log(err);
     });
  
  //console.log(req.body);
  });


  router.get('/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

  router.get('/:id',(req,res)=>{
  
    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
  
      res.render('details',{title:'the details page',theblog:result})
    })
    .catch(err=>console.log(err));
  
  
  });
  
  router.delete('/:id',(req,res)=>{
  
    const id = req.params.id;
    console.log("we need to delete this",id);
    Blog.findByIdAndDelete(id)
    .then(result=>{
  
      res.json({redirect:'/blogs'});
  
    })
    .catch(err=>console.log(err));
  
  });
  

module.exports = router;