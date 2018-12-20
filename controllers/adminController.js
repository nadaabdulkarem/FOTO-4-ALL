var express = require('express');
var router = express.Router();
var session = require('../models/session');

var admin = require('../models/admin');
var auth = require('../middleware/auth');
var restaurant = require('../models/restaurent');

router.get('/signup/1234/4321', renderRegister);
router.get('/restaurent/new', renderNew);
router.get('/restaurents', restaurant.getAll, renderRestaurents);
router.get('/reservations', admin.findReservation, renderReservation);
router.get('/:username/edit', admin.find, renderEdit);
router.get('/:id/restaurent/edit', restaurant.find, renderEditRestaurent);
router.get('/:id/info', restaurant.find, renderRestaurent)
router.get('/:username', auth.onlyAdmin, admin.find, renderShow);
router.get('/', renderLogin);

router.post('/signup', admin.create, redirectShow);
router.post('/login', session.adminCreate, redirectShow);
router.post('/', restaurant.create, redirectRestaurentInfo);
router.put('/', admin.update, redirectShow);

// here
router.delete('/reservation/:id', admin.deleteReservation, redirectReservation);

router.delete('/:id', restaurant.delete, redirectRestaurents);
router.delete('/', session.delete, redirectIndex);

function redirectReservation(req, res) {
    res.redirect('/admin/reservations');
}

function redirectRestaurentInfo(req, res) {
    res.redirect(`/admin/${res.locals.restaurentId}/info`)    
}

function renderRestaurents(req, res) {
    var mustacheVariables = {
        admin: req.session.admin.username,
        restaurants: res.locals.restaurents
    }
    res.render('./administration/restaurent/restaurents', mustacheVariables);
}

function redirectRestaurents(req, res) {
    res.redirect(`/admin/restaurents`);    
}

function renderRestaurent(req, res) {
    var mustacheVariables = {
        restaurant: res.locals.restaurent
    }
    res.render('./administration/restaurent/index', mustacheVariables);
}

function renderLogin(req, res){
    res.render('./administration/login');
}

function redirectIndex(req, res){
    res.redirect('/');
}

function renderEdit(req, res) {
    var mustacheVariables = {
        admin: res.locals.admin
    }
    res.render('./administration/edit', mustacheVariables);
}

function renderShow(req, res){
    var mustacheVariables = {
        admin: res.locals.admin
    }
    res.render('./administration/show', mustacheVariables);
}

function renderRegister(req, res){
    res.render('./administration/singup');
}

function redirectShow(req, res){
    if(req.session.admin){
        res.redirect(`/admin/${res.locals.adminUsername}`);
      }else{
        res.redirect('/admin');
      }
}

function renderNew(req, res) {
    mustacheVariables= {
        admin: req.session.admin.username
    }
    res.render('./administration/restaurent/new', mustacheVariables);  
}

function renderEditRestaurent(req, res) {
    var mustacheVariables = {
        restaurant: res.locals.restaurent
    }
    res.render('./administration/restaurent/edit', mustacheVariables);
}

function renderReservation(req, res) {
    var mustacheVariables = {
        reservations: res.locals.reservations,
        admin: req.session.admin.username
    }
    res.render('./administration/reservations', mustacheVariables);
}
module.exports = router;