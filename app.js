const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const blogRoutes = require('./routes/blogRoutes');
dotenv.config();


//connect to mongo DB
const FoolhardyURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(FoolhardyURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));
// express app

const app = express();

// register view engine

app.set('view engine', 'ejs')

//listen for requests



//middleware & static files

app.use(express.static('public')); //enables css/any static file from the server in the public folder(it's linked in the head partial)
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) => {

    res.redirect('/blogs');
    
});

app.get('/about', (req, res) => {
  
    res.render('about', {title: 'About' });
});

//blog routes
app.use('/blogs', blogRoutes);

//404 page // must go at bottom

app.use((req, res)=>{
  res.status(404).render('404', {title: '404' })
});