var bcrypt = require('bcrypt');
var db = require('../db/dbconfig');

var session = {};

session.create = function(req, res, next){
  var username = req.body.username.toLowerCase();
  db.one("SELECT * FROM customers WHERE username=$1;", [username])
    .then(function(result){
      if(bcrypt.compareSync(req.body.password, result.password_digest)){
        req.session.customer = result;
      }
      next();
    })
    .catch(function(error){
      console.log('This session create function: ', error);
      next();
    })
}

session.delete = function(req, res, next){
  req.session.customer = null;
  next();
}


session.adminCreate = function(req, res, next){
  var username = req.body.username.toLowerCase();
  db.one("SELECT * FROM admin WHERE username = $1;", [username])
    .then(function(result){
      if(bcrypt.compareSync(req.body.password, result.password_digest)){
        req.session.admin = result;
      }
      next();
    })
    .catch(function(error){
      console.log('This session adminCreate function: ', error);
      next();
    })
}

session.adminDelete = function(req, res, next){
  req.session.admin = null;
  next();
}

module.exports = session;