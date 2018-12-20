var express = require('express');
var router = express.Router();
var session = require('../models/session');
var JSAlert = require("js-alert");

router.get('/', renderNew);
router.post('/', session.create, redirectShow);
router.delete('/', session.delete, redirectIndex);

function renderNew(req, res){
  res.render('./login');
}

function redirectShow(req, res){
  if(req.session.customer){
    res.redirect(`/customers/${req.session.customer.username}`)
  }else{
    JSAlert.alert("Not registerd customer!");
    res.redirect('/customers/signup');
  }
}

function redirectIndex(req, res){
  res.redirect('/');
}

module.exports = router;