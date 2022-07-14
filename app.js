//variables 
const express = require('express');
const app = express();
const router = express.Router();
const data = require('./data.json');
const routes = require('./routes');


// view engine setup
router.set('view engine', 'pug');
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
// router.use(cookieParser());
router.use('/', indexRouter);
    
app.use(routes);

//start server
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});