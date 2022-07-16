const express = require('express');
const router = express.Router();
const { projects } = require('./../data.json')


//middleware    
    //set routes to home page and pass to index
    router.get('/', (req, res) => {
        res.render('index', { projects });
    });
    //set routes to about page
    router.get('/about', (req, res) => {
        res.render('about');
    });
   //----- SOMETHING WRONG HERE-------
    //dynamic project route to get page with data about projects
    router.get('/projects/:id', (req, res, next) => {
        const dataProject = req.params.id;
        const project = projects[dataProject]
        if (project) {
          res.render('project', { project });
        } else {
            const err = new Error('Not Found');
            err.status = 404;
            err.message = "This web page can't be located"
            res.render('not-found', { error: err })
        }});

module.exports = router;