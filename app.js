//variables 
const express = require('express');
const app = express();
var data = require('data.json');

//middleware
    // view engine setup
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use('/', indexRouter);

//static route to serve static files in public folder
app.use(express.static(path.join(__dirname, 'public')));

//set routes
app.get('/', (req, res) => {
    res.render("index", {data});
});
app.get('/about', (req, res) => {
    res.render("about");
});

//dynamic project route 
app.get('/project.id', (req, res) => {
    const dataProject = data[req.params.id]
    if (dataProject) {
      res.render('project', { dataProject });
    } else if ( dataProject === undefined ){
        const err = new Error('Not Found');
        err.status = 404;
        err.message = "This web page can't be located"
        res.render('error', { error: err })
    }});


//start server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});