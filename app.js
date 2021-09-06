require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogroutes = require('./routes/blogRoutes');




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

app.use('/blogs',blogroutes);



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
