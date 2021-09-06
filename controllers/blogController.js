
const Blog = require('../models/blog.js');



const indexBlogs = (req,res)=>{


    Blog.find()
    .then(result =>{
  
      res.render('index',{title:'all blogs',blogs:result});
  
    })
    .catch(err=>console.log(err));


}



const detailBlogs = (req,res)=>{


    const id = req.params.id;
    Blog.findById(id)
    .then(result=>{
  
      res.render('details',{title:'the details page',theblog:result})
    })
    .catch(err=>console.log(err));


}



const createBlogs = (req,res)=>{


    const newBlog = new Blog(req.body);
    newBlog.save()
    .then(res.redirect('/blogs'))
    .catch(err=>{
 
     console.log(err);
    });


}


const deleteBlogs = (req,res) =>{

    const id = req.params.id;
    console.log("we need to delete this",id);
    Blog.findByIdAndDelete(id)
    .then(result=>{
  
      res.json({redirect:'/blogs'});
  
    })
    .catch(err=>console.log(err));


}


module.exports = {
   

    indexBlogs,
    detailBlogs,
    createBlogs,
    deleteBlogs,


}