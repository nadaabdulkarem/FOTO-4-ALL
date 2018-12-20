var express = require('express');
var router = express.Router();

var customer = require('../models/customer');
var auth = require('../middleware/auth');

router.get('/signup', renderRegister);
router.get('/edit/:username', customer.find, renderEdit);
router.get('/:username', auth.onlyUser, customer.find, customer.findReservation, renderShow);

router.post('/reservation/:id', auth.restrict, customer.addReservation, redirectShow);
router.post('/', customer.create, renderLogin);
router.put('/edit/:username', customer.update, redirectShow);

function renderLogin(req, res) {
    res.render('./login');
}

function renderShow(req, res){
    var mustacheVariables = {
        customer: res.locals.customer,
        reservations: res.locals.reservations
    }
    res.render('./customers/show', mustacheVariables);
}

function renderRegister(req, res){
    res.render('./customers/signup');
}

function redirectShow(req, res){
    res.redirect(`/customers/${res.locals.customerUsername}`);
}

function renderEdit(req, res) {
    res.render('./customers/edit');
}

module.exports = router;