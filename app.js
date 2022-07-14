//variables 
const express = require('express');
const app = express();
const router = express.Router();
const data = require('./data.json');
const routes = require('./routes');
const indexRouter = require('./routes/index')


// view engine setup
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//static route to serve static files in public folder
app.use('/static',express.static('public'));
// router.use(cookieParser());
app.use('/',indexRouter);
    
app.use(routes);

//start server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});