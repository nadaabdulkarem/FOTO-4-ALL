var express = require('express');
var router = express.Router();

var restaurant = require('../models/restaurent');
var auth = require('../middleware/auth');

router.get('/:id', restaurant.find, renderShow);
router.get('/', restaurant.getAll, renderIndex);

function renderIndex(req, res){
    var mustacheVariables = {
        restaurants: res.locals.restaurents,
        customer: req.session.customer 
    }
    res.render('./restaurants/index', mustacheVariables);
}

function renderShow(req, res){
    var mustacheVariables = {
        restaurant: res.locals.restaurent,
        customer: req.session.customer 
    }
    res.render('./restaurants/show', mustacheVariables);
}

module.exports = router;