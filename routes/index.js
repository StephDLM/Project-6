const express = require('express');
const router = express.Router();
const { data } = require('./data.json')
// const app = express();

//middleware    
    //set routes to home page and pass to index
    router.get('/', (req, res) => {
        res.render('index', {data});
    });
    //set routes to about page
    router.get('/about', (req, res) => {
        res.render('about');
    });
   //----- SOMETHING WRONG HERE-------
    //dynamic project route to get page with data about projects
    router.get('/data.id', (req, res, next) => {
        const dataProject = req.params.id;
        const projects = data.find( ({id}) => id === +dataProject);

        if (dataProject) {
          res.render('projects', {data: projects[req.params.id]});
        } else {
            const err = new Error('Not Found');
            err.status = 404;
            err.message = "This web page can't be located"
            res.render('not-found', { error: err })
        }});

module.exports = router;