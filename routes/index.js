const express = require('express');
const router = express.Router();
var data = require('../data.json')
const app = express();

//middleware    
    //set routes to home page
    router.get('/', (req, res, next) => {
        res.render("index", {data});
    });
    //set routes to about page
    router.get('/about', (req, res) => {
        res.render('about');
    });
    
    //dynamic project route to get page 
    router.get('/project.id', (req, res, next) => {
        const dataProject = req.params.id;
        if (dataProject) {
          res.render('project', { dataProject });
        } else if ( dataProject === undefined ){
            const err = new Error('Not Found');
            err.status = 404;
            err.message = "This web page can't be located"
            res.render('error', { error: err })
        }});
    //error page 

module.exports = router;