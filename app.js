//variables 
const express = require('express');
const app = express();
const router = express.Router();
const data = require('./data.json');
const routes = require('./routes');
const indexRouter = require('./routes/index')
const path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middleware for accessing body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static route to serve static files in public folder
// app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

//route to redirect to the index 
app.get('/', (req, red) =>{
    res.redirect('/index')
});

//use route index 
app.use('/index',indexRouter);
    
// app.use(routes);


//pass an object as a parameter to next
//render error page 404 by sending response to the client, setting up the response status to 404, and render not-found view
app.use ((req,res, next) => {
    // const err = new Error();
    res.status(404).render('not-found');
    err.message = "This web page can't be located";
    // res.render('error', { error: err })
    // next(err);

})

//render global error 
app.use((err, req, res, next) => {
    //setting locals with error property
    res.locals.err = err
    res.render("error", err)
    res.status(err.status);
    if (err === 404){
        res.status(404).render('not-found', { err });
        // next(err)
    } else {
        err.status = 500;
        err.message = "Opps! Something went wrong with the server.";
        res.status(res.status || 500).render('error', {err} )
    }
  });
  module.exports = app;

//start server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
