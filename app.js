require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const Blog = require('./models/blog');


// express app
const app = express();




// connect mongo

const urlConnect =process.env.API_URL;

mongoose.connect(urlConnect,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
  
  console.log("connecté");

  // listen for requests
  const port = process.env.PORT;
  app.listen(port);
  console.log("listening on port",port);
})
.catch(err=>{
  console.log(err);
})

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  
 res.redirect("/blogs");
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs',(req,res)=>{

  Blog.find()
  .then(result =>{

    res.render('index',{title:'all blogs',blogs:result});

  })
  .catch(err=>console.log(err));

  

});


app.post('/blogs',(req,res)=>{
  
   const newBlog = new Blog(req.body);
   newBlog.save()
   .then(res.redirect('/blogs'))
   .catch(err=>{

    console.log(err);
   });

//console.log(req.body);
});

app.get('/single/:id',(req,res)=>{

  const id = req.params.id;
  Blog.findById(id)
  .then(result=>{

    res.render('details',{title:'the details page',theblog:result})
  })
  .catch(err=>console.log(err));


});

app.delete('/single/:id',(req,res)=>{

  const id = req.params.id;
  console.log("we need to delete this",id);
  Blog.findByIdAndDelete(id)
  .then(result=>{

    res.json({redirect:'/blogs'});

  })
  .catch(err=>console.log(err));

});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
