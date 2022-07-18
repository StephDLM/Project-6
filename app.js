//variables 
const express = require('express');
const app = express();
const routes = require('./routes');
const indexRouter = require('./routes/index')

//static route to serve static files in public folder
app.use('/static', express.static('public'));
//view engine setup using pug
app.set('view engine', 'pug');
//use route index 
app.use('/index',indexRouter);

//middleware for accessing body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route to redirect to the index 
app.get('/', (req, res) =>{
    res.redirect('/index')
});

app.use(routes);

//pass an object as a parameter to next
//render error page 404 by sending response to the client, setting up the response status to 404, and render not-found view
app.use ((req,res, next) => {
    const err = new Error('not-found');
    err.status = 404;
    err.message = "This web page can't be located";
    console.log("This web page can't be located", err);
    next(err);
});

//render global error handler
app.use((err, req, res, next) => {
    // setting locals with error property
    if (err){
        if (err.status === 404){
            res.status(404).render('not-found', { err });
                } else {
            err.status = 500;
            err.message = "Oops! Something went wrong with the server.";
            console.log('Global error handler called',err)
            res.status(err.status || 500).render('error', {err} )
        }
    }
  });

//start server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
